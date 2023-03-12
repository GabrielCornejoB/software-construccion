const { Router } = require("express");
const router = Router();
const { Unit, Group, Clasification, getKeys } = require('../models/enums');
const counterModel = require('../models/counter.model');
const primaryModel = require('../models/primary.model');
const supplierModel = require('../models/supplier.model');

router.post('/add-primary', async (req, res) => {
    const { primary, group, clasification, unit } = req.body;

    if (!primary || !primary?.trim()) return res.status(400).send("Missing fields");
    const primaryExists = await primaryModel.findOne({ primary: primary });
    if (primaryExists) return res.status(400).send("Primary '" + primary + "' already exists");
    if (!getKeys(Unit).includes(unit)) return res.status(400).send("Unit '" + unit + "' is not valid");
    if (!getKeys(Group).includes(group)) return res.status(400).send("Group '" + group + "' is not valid");
    if (!getKeys(Clasification).includes(clasification)) return res.status(400).send("Clasification '" + clasification + "' is not valid");
    const primaryCounterExists = await counterModel.findOneAndUpdate({ collectionName: "primaries" }, { $inc: { "counter": 1 }});
    if (!primaryCounterExists) {
        const newCounter = new counterModel({collectionName: "primaries", counter: 1});
        await newCounter.save();
        counter = 1;
    }
    else counter = primaryCounterExists.counter + 1;

    const newPrimary = new primaryModel({ 
        id: counter,
        primary, 
        group, 
        clasification, 
        unit, 
        defaultPrice: 0,
        defaultSupplier: 0
    });
    await newPrimary.save();
    let answerString = "'" + primary + "' added succesfully";
    res.json({ msg: answerString });
});

router.post('/add-supplier-to-primary', async (req, res) => {
    const {primaryId, supplierId, listPrice, iva, discount} = req.body;

    if (!supplierId?.toString().trim() || !listPrice?.toString().trim() || !iva?.toString().trim() || 
        !discount?.toString().trim() || !primaryId?.toString().trim()) {
        return res.status(400).send('Missing fields');
    }    
    const primaryIdExists = await primaryModel.findOne({id: primaryId});
    if (!primaryIdExists) return res.status(400).send("Primary with id: '" + primaryId + "' doesn't exist");
    const supplierIdExists = await supplierModel.findOne({id: supplierId});
    if (!supplierIdExists) return res.status(400).send("Supplier with id: '" + supplierId + "' doesn't exist");
    const suppliersIds = [];
    for (let sup of primaryIdExists.suppliers) suppliersIds.push(sup.supplierId);
    if (suppliersIds.includes(supplierId)) return res.status(400).send("Primary already has this provider");
    const values = {
        supplierId,
        listPrice,
        iva,
        discount,
        unitaryPrice: (listPrice * (1+iva/100)) * (100-discount)/100,
        updateDate: new Date()
    }
    primaryIdExists.suppliers.push(values);
    await primaryIdExists.save();
    return res.status(200).send("Supplier added to " + primaryIdExists.primary);
});

router.put('/update-primary/:id', async (req, res) => {
    const { primary, group, clasification, unit} = req.body;
    if (!primary?.trim()) return res.status(400).send("Missing fields");
    const primaryIdExists = await primaryModel.findOne({id: req.params.id});
    if (!primaryIdExists) return res.status(400).send("Primary doesn't exist");
    const primaryExists = await primaryModel.findOne({ primary: primary });
    if (primaryExists) return res.status(400).send("Primary '" + primary + "' already exists");
    if (!getKeys(Unit).includes(unit)) return res.status(400).send("Unit '" + unit + "' is not valid");
    if (!getKeys(Group).includes(group)) return res.status(400).send("Group '" + group + "' is not valid");
    if (!getKeys(Clasification).includes(clasification)) return res.status(400).send("Clasification '" + clasification + "' is not valid");

    primaryIdExists.primary = primary;
    primaryIdExists.group = group;
    primaryIdExists.clasification = clasification;
    primaryIdExists.unit = unit;
    await primaryIdExists.save();
    return res.status(200).send("Primary updated succesfully");
});

router.patch('/update-supplier-of-primary', async (req, res) => {
    const { primaryId, supplierId, listPrice, iva, discount } = req.body;
    if (!supplierId?.toString().trim() || !listPrice?.toString().trim() || !iva?.toString().trim() || 
        !discount?.toString().trim() || !primaryId?.toString().trim()) {
        return res.status(400).send('Missing fields');
    }   
    const primaryIdExists = await primaryModel.findOne({id: primaryId});
    if (!primaryIdExists) return res.status(400).send("Primary with id: '" + primaryId + "' doesn't exist");
    const suppliersIds = [];
    for (let sup of primaryIdExists.suppliers) suppliersIds.push(sup.supplierId);
    if (!suppliersIds.includes(supplierId)) return res.status(400).send("Primary doesn't has that supplier");
    let index = suppliersIds.indexOf(supplierId);
    primaryIdExists.suppliers[index].listPrice = listPrice;
    primaryIdExists.suppliers[index].iva = iva;
    primaryIdExists.suppliers[index].discount = discount;
    primaryIdExists.suppliers[index].unitaryPrice = (listPrice * (1+iva/100)) * (100-discount)/100;
    primaryIdExists.suppliers[index].updateDate = new Date();
    await primaryIdExists.save();
    return res.status(200).send("Supplier updated succesfully");
});

router.patch('/set-default-supplier-of-primary', async (req, res) => {
    const { primaryId, defaultPrice, defaultSupplier } = req.body;
    if (!primaryId?.toString().trim() || !defaultPrice?.toString().trim() || !defaultSupplier?.toString().trim()) return res.status(400).send("Missing fields");
    const primaryExists = await primaryModel.findOne({id: primaryId});
    if (!primaryExists) return res.status(400).send("Primary doesn't exist");
    primaryExists.defaultPrice = defaultPrice;
    primaryExists.defaultSupplier = defaultSupplier;
    await primaryExists.save();
    return res.status(200).send("Default supplier of primary updated succesfully");
});

router.delete('/delete-primary/:id', async (req, res) => {
    const primaryExists = await primaryModel.findOne({id: req.params.id});
    if (!primaryExists) return res.status(400).send("Primary doesn't exist");
    await primaryModel.deleteOne({ id: req.params.id });
    res.json({msg: "Primary Deleted succesfully"});
});

router.delete('/delete-supplier-of-primary', async (req, res) => {
    const {primaryId, supplierId} = req.body;
    if (!primaryId?.toString().trim() || !supplierId?.toString().trim()) return res.status(400).send("Missing fields");
    const primaryExists = await primaryModel.findOne({id: primaryId});
    if (!primaryExists) return res.status(400).send("Primary doesn't exist");
    const suppliersIds = [];
    for (let sup of primaryExists.suppliers) suppliersIds.push(sup.supplierId);
    if (!suppliersIds.includes(supplierId)) return res.status(400).send("Primary doesn't has that supplier");
    let index = suppliersIds.indexOf(supplierId);
    primaryExists.suppliers.splice(index, 1);
    await primaryExists.save();
    return res.status(200).send("Supplier of primary deleted succesfully");
});

router.get('/get-primaries', async (req, res) => {
    const test = await primaryModel.aggregate([{
        $lookup: 
        {
            from: "suppliers",
            localField: "defaultSupplier",
            foreignField: "id",
            as: "supplierName"
        }
    }]).exec();
    const output = [];
    for (let obj of test) {
        let supplier = "-";
        if (obj.supplierName[0]) {
            supplier = obj.supplierName[0].supplier;
        }
        output.push(
            {
                id: obj.id,
                primary: obj.primary,
                group: obj.group,
                clasification: obj.clasification,
                unit: obj.unit,
                defaultPrice: obj.defaultPrice,
                defaultSupplier: supplier
            }
        )
    }
    return res.status(200).json(output);
});

router.get('/get-primary/:id', async (req, res) => {
    // let primaryId = req.params.id;
    // if (!primaryId?.toString().trim()) return res.status(400).send("Missing param");
    const primaryExists = await primaryModel.findOne({ id: req.params.id });
    if (!primaryExists) return res.status(400).send("Primary doesn't exist");
    primaryId = parseInt(req.params.id);
    const obj = await primaryModel.aggregate([
        { $match: {id: primaryId} },
        { $lookup: 
        {
            from: "suppliers",
            localField: "defaultSupplier",
            foreignField: "id",
            as: "supplierName"
        }
    }]).exec();
    let supplier = "-";
    if (obj[0].supplierName) {
        supplier = obj[0].supplierName[0].supplier;
    }
    const output = {
        id: obj[0].id,
        primary: obj[0].primary,
        group: obj[0].group,
        clasification: obj[0].clasification,
        unit: obj[0].unit,
        defaultPrice: obj[0].defaultPrice,
        defaultSupplier: supplier
    }
    return res.status(200).json(output);
});

router.get('/get-suppliers-of-primary', async (req, res) => {
    let primaryId = req.query.id;
    if (!primaryId?.toString().trim()) return res.status(400).send("Missing param");
    const primaryExists = await primaryModel.findOne({ id: primaryId }).select('suppliers');
    if (!primaryExists) return res.status(400).send("Primary doesn't exist");
    if (primaryExists.suppliers.length == 0) return res.status(200).send("Primary has 0 providers");
    primaryId = parseInt(primaryId);
    const test = await primaryModel.aggregate([
        { $match: { id: primaryId } },
        { $unwind: "$suppliers" },
        { $lookup: {
            from: "suppliers",
            localField: "suppliers.supplierId",
            foreignField: "id",
            as: "suppliers.supplier"
        }}
    ]).exec();
    const output = [];
    for (let obj of test) {
        output.push({
            supplier: obj.suppliers.supplier[0].supplier,
            listPrice: obj.suppliers.listPrice,
            iva: obj.suppliers.iva,
            discount: obj.suppliers.discount,
            unitaryPrice: obj.suppliers.unitaryPrice,
            updateDate: obj.suppliers.updateDate
        })
    }
    return res.status(200).json(output);
});

module.exports = router;

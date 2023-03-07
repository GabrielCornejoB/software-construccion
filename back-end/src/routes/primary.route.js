const { Router } = require("express");
const router = Router();
const { Unit, Group, Clasification, getKeys } = require('../models/enums');
const counterModel = require('../models/counter.model');
const primaryModel = require('../models/primary.model');

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
        defaultSupplier: ""
    });
    await newPrimary.save();
    return res.status(200).send("'" + primary + "' added succesfully");
});

router.post('/add-supplier-to-primary', async (req, res) => {
    const {primaryId, supplierId, listPrice, iva, discount} = req.body;

    if (!supplierId?.toString().trim() || !listPrice?.toString().trim() || !iva?.toString().trim() || 
        !discount?.toString().trim() || !primaryId?.toString().trim()) {
        return res.status(400).send('Missing fields');
    }    
    const values = {
        supplierId,
        listPrice,
        iva,
        discount,
        unitaryPrice: (listPrice * (1+iva/100)) * (100-discount)/100,
        updateDate: new Date()
    }
    const primaryIdExists = await primaryModel.findOne({id: primaryId});
    if (!primaryIdExists) return res.status(400).send("Primary with id: '" + primaryId + "' doesn't exist");
    const suppliersIds = [];
    for (let sup of primaryIdExists.suppliers) suppliersIds.push(sup.supplierId);
    if (suppliersIds.includes(supplierId)) return res.status(400).send("Primary already has this provider");
    primaryIdExists.suppliers.push(values);
    await primaryIdExists.save();
    return res.status(200).send("Supplier added to " + primaryIdExists.primary);
});

// router.put('/update-primary')

// router.patch('/update-supplier-of-primary')

router.delete('/delete-primary', async (req, res) => {
    const { primaryId } = req.body;
    if (!primaryId?.toString().trim()) return res.status(400).send("Missing param");
    const primaryExists = await primaryModel.findOne({id: primaryId});
    if (!primaryExists) return res.status(400).send("Primary doesn't exist");
    await primaryModel.deleteOne({ id: primaryId });
    return res.status(200).send("Primary deleted succesfully");
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
    const primaries = await primaryModel.find().select('id primary group clasification unit defaultPrice defaultSupplier');
    if (!primaries) return res.status(400).send("Empty collection");
    return res.status(200).json(primaries);
});

router.get('/get-suppliers-of-primary', async (req, res) => {
    const { primaryId } = req.body;
    if (!primaryId?.toString().trim()) return res.status(400).send("Missing param");
    const primaryExists = await primaryModel.findOne({ id: primaryId }).select('suppliers');
    if (!primaryExists) return res.status(400).send("Primary doesn't exist");
    if (primaryExists.suppliers.length == 0) return res.status(200).send("Primary has 0 providers");
    return res.status(200).json(primaryExists);
});

module.exports = router;

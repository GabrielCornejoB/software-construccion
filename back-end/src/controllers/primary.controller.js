const Primary = require("../models/primary.model");
const Counter = require("../models/counter.model");
const Supplier = require("../models/supplier.model");

exports.addPrimary = async (req, res) => {
    try {
        const primaryExists = await Primary.findOne({primary: req.body.primary});
        if (primaryExists) return res.status(400).json({msg: "Primary already exists"});
        const primaryCounterExists = await Counter.findOneAndUpdate({ collectionName: "primaries" }, { $inc: { "counter": 1 }});
        let counter = 0;
        if (!primaryCounterExists) {
            const newCounter = new Counter({collectionName: "primaries", counter: 1});
            await newCounter.save();
            counter = 1;
        }
        else counter = primaryCounterExists.counter + 1;
        const primary = new Primary({
            id: counter,
            primary: req.body.primary,
            group: req.body.group,
            clasification: req.body.clasification,
            unit: req.body.unit,
            defaultSupplier: 0,
            defaultPrice: 0,
            suppliers: []
        });
        await primary.save();
        res.send(primary);
        
    } catch (error) {
        console.log(error);
        if (error.errors?.unit) res.status(400).send("Invalid or missing field 'unit'");
        else if (error.errors?.clasification) res.status(400).send("Invalid or missing field 'clasification'");
        else if (error.errors?.group) res.status(400).send("Invalid or missing field 'group'");
        else res.status(500).send("" + error);
    }
}

exports.getPrimaries = async (req, res) => {
    try {
        const primaries = await Primary.aggregate([{
            $lookup: 
            {
                from: "suppliers",
                localField: "defaultSupplier",
                foreignField: "id",
                as: "supplierName"
            }
        }]).exec();
        const output = [];
        for (let obj of primaries) {
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
        res.json(output);
    } catch (error) {
        console.log(error);
    }
}

exports.updatePrimary = async (req, res) => {
    try {
        const { primary, group, clasification, unit } = req.body;
        const primaryIdExists = await Primary.findOne({id: req.params.id});
        const primaryExists = await Primary.findOne({primary: primary});
        if (!primaryIdExists) return res.status(404).json({msg: "Primary doesn't exist"});    
        if (primaryExists) return res.status(400).json({msg: "Primary already exists"});

        primaryIdExists.primary = primary;
        primaryIdExists.group = group;
        primaryIdExists.clasification = clasification;
        primaryIdExists.unit = unit;
        await primaryIdExists.save();
        res.json(primaryIdExists);
    } catch (error) {
        if (error.errors?.unit) return res.status(400).send("Invalid or missing field 'unit'");
        else if (error.errors?.clasification) return res.status(400).send("Invalid or missing field 'clasification'");
        else if (error.errors?.group) return res.status(400).send("Invalid or missing field 'group'");
        else return res.status(500).send("" + error);
    }
}

exports.getPrimary = async (req, res) => {
    try {
        const primaryExists = await Primary.findOne({ id: req.params.id });
        if (!primaryExists) return res.status(404).send("Primary doesn't exist");
        let primaryId = parseInt(req.params.id);
        const obj = await Primary.aggregate([
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
        if (obj[0].supplierName.length > 0) {
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
        res.json(output);
    } catch (error) {
        res.status(500).send("" + error);
    }
}

exports.deletePrimary = async (req, res) => {
    try {
        const primaryExists = await Primary.findOne({ id: req.params.id });
        if (!primaryExists) return res.status(404).send("Primary doesn't exist");
        await Primary.deleteOne({ id: req.params.id });
        res.json({msg: "Primary Deleted succesfully"});
    } catch (error) {
        res.status(500).send("" + error);
    }
}

exports.addSupplierToPrimary = async (req, res) => {
    try {
        const { listPrice, iva, discount } = req.body;
        const primaryExists = await Primary.findOne({id: req.params.id});
        if (!primaryExists) return res.status(404).json({msg: "Primary doesn't exist"});
        const supplierExists = await Supplier.findOne({id: req.params.supplierId});
        if (!supplierExists) return res.status(404).json({msg: "Supplier doesn't exist"});
        const suppliersIds = [];
        for (let sup of primaryExists.suppliers) suppliersIds.push(sup.supplierId);
        console.log(suppliersIds);
        console.log(req.params.supplierId);
        if (suppliersIds.includes(parseInt(req.params.supplierId))) return res.status(400).send("Primary already has this supplier");
        const values = {
            supplierId: req.params.supplierId,
            listPrice,
            iva,
            discount,
            unitaryPrice: (listPrice * (1+iva/100)) * (100-discount)/100
        }
        primaryExists.suppliers.push(values);
        await primaryExists.save();
        res.json(primaryExists);
    } catch (error) {
        res.status(500).send("" + error);
    }
}

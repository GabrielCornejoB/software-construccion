const Supplier = require("../models/supplier.model");
const Counter = require("../models/counter.model");

exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        if (!suppliers) return res.status(404).send("There are 0 suppliers");
        res.json(suppliers);
    } catch (error) {
        res.status(500).send("" + error);
    }
}
exports.addSupplier = async (req, res) => {
    try {
        const supplierExists = await Supplier.findOne({ supplier: req.body.supplier });
        if (supplierExists) return res.status(400).json({msg: "Supplier already exists"});
        const supplierCounterExists = await Counter.findOneAndUpdate({ collectionName: "suppliers" }, { $inc: { "counter": 1 }});
        let counter = 0;
        if (!supplierCounterExists) {
            const newCounter = new Counter({collectionName: "suppliers", counter: 1});
            await newCounter.save();
            counter = 1;
        }
        else counter = supplierCounterExists.counter + 1;

        const newSupplier = new Supplier({id: counter, supplier: req.body.supplier});
        await newSupplier.save();
        return res.json(req.body.supplier);
    }catch (error) {
        res.status(500).send("" + error);
    }
}
exports.updateSupplier = async (req, res) => {
    try {
        const supplierIdExists = await Supplier.findOne({ id: req.params.id });
        if (!supplierIdExists) return res.status(400).send("Supplier id '" + req.params.id + "' doesn't exist");
        const supplierExists = await Supplier.findOne({ supplier: req.body.supplier });
        if (supplierExists) return res.status(400).send("Supplier '" + req.body.supplier + "' already exists");

        supplierIdExists.supplier = req.body.supplier;
        await supplierIdExists.save();
        return res.json(supplierIdExists);
    } catch (error) {
        res.status(500).send("" + error);
    }
}

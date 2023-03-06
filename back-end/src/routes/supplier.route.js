const { Router } = require('express');
const router = Router();
const counterModel = require('../models/counter.model');
const supplierModel = require('../models/supplier.model');

router.post('/add-supplier', async (req, res) => {
    const { supplier } = req.body;

    if (!supplier || !supplier?.trim()) return res.status(400).send("Miising fields");
    const supplierExists = await supplierModel.findOne({ supplier: supplier });
    if (supplierExists) return res.status(400).send("Supplier '" + supplier + "' already exists")
    const supplierCounterExists = await counterModel.findOneAndUpdate({ collectionName: "suppliers" }, { $inc: { "counter": 1 }});
    if (!supplierCounterExists) {
        const newCounter = new counterModel({collectionName: "suppliers", counter: 1});
        await newCounter.save();
        counter = 1;
    }
    else counter = supplierCounterExists.counter + 1;

    const newSupplier = new supplierModel({id: counter, supplier});
    await newSupplier.save();
    return res.status(200).send("'" + supplier + "' added succesfully");
});

module.exports = router;

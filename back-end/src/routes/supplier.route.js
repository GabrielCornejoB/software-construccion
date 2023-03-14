const { Router } = require('express');
const router = Router();
const counterModel = require('../models/counter.model');
const supplierModel = require('../models/supplier.model');
const supplierController = require('../controllers/supplier.controller');

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

// router.get('/get-suppliers', async (req, res) => {
//     const suppliers = await supplierModel.find();
//     if (!suppliers) return res.status(400).send("Empty collection");
//     return res.status(200).json(suppliers);
// });
router.get('/get-suppliers', supplierController.getSuppliers);

router.put('/update-supplier', async (req, res) => {
    const { id, supplier } = req.body;
    if (!id?.toString().trim() || !supplier?.toString().trim()) return res.status(400).send("Missing fields");
    const supplierIdExists = await supplierModel.findOne({ id: id });
    if (!supplierIdExists) return res.status(400).send("Supplier id '" + id + "' doesn't exist");
    const supplierExists = await supplierModel.findOne({ supplier: supplier });
    if (supplierExists) return res.status(400).send("Supplier '" + supplier + "' already exists");

    supplierIdExists.supplier = supplier;
    await supplierIdExists.save();
    return res.status(200).send("Supplier updated");
});

module.exports = router;

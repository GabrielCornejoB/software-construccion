const { Router } = require("express");
const router = Router();
const { Unit, Group, getKeys } = require('../models/enums');
const counterModel = require('../models/counter.model');
const subproductModel = require('../models/subproduct.model');

router.post('/add-subproduct', async (req, res) => {
    const { subproduct, unit, details } = req.body;
    if (!subproduct?.trim() || !unit?.trim() || !details?.trim()) return res.status(400).send("Missing fields");
    const subproductExists = await subproductModel.findOne({ subproduct: subproduct });
    if (subproductExists) return res.status(400).send("Subproduct '" + subproduct + "' already exists");
    if (!getKeys(Unit).includes(unit)) return res.status(400).send("Unit '" + unit + "' is not valid");
    const subproductCounterExists = await counterModel.findOneAndUpdate({ collectionName: "subproducts" }, { $inc: { "counter": 1 }});
    if (!subproductCounterExists) {
        const newCounter = new counterModel({collectionName: "subproducts", counter: 1});
        await newCounter.save();
        counter = 1;
    }
    else counter = subproductCounterExists.counter + 1;
    const newSubproduct = new subproductModel(
        {
            id: counter,
            subproduct: subproduct,
            unit: unit,
            fullPrice: 0,
            details: details
        }
    );
    await newSubproduct.save();
    return res.status(200).send("Subproduct '" + subproduct + "' created succesfully");
});

// router.post('/add-component-to-subproduct');

// router.put('/update-subproduct');

// router.delete('/delete-subproduct');

// router.delete('/delete-component-of-subproduct');

// router.get('/get-subproducts');

// router.get('./get-subproduct-with-components');

module.exports = router;

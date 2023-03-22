const Subproduct = require('../models/subproduct.model');
const Counter = require('../models/counter.model');

exports.addSubproduct = async (req, res) => {
    try {
        const { subproduct, unit } = req.body;
        const subproductExists = await Subproduct.findOne({subproduct: subproduct});
        if (subproductExists) return res.status(400).json({msg: "Subproduct already exists"});
        const subproductCounterExists = await Counter.findOneAndUpdate({collectionName: "subproducts"}, {$inc: {"counter": 1}});
        let counter = 0;
        if (!subproductCounterExists) {
            const newCounter = new Counter({collectionName: "subproducts", counter: 1});
            await newCounter.save();
            counter = 1;
        }
        else counter = subproductCounterExists.counter + 1;
        const newSubproduct = new Subproduct({
            id: counter,
            subproduct: subproduct,
            unit: unit,
            fullPrice: 0,
            details: details,
            components: []
        });
        await newSubproduct.save();
        res.json(newSubproduct);
    } catch (error) {
        if (error.errors?.unit) res.status(400).send("Invalid or missing field 'unit'");
        else res.status(500).send("" + error);
    }
}
exports.getSubproducts = async (req, res) => {
    try {
        const subproducts = await Subproduct.find();
        if (!subproducts) return res.status(404).send("There are 0 subproducts");
        res.json(subproducts);
    } catch (error) {
        res.status(500).send("" + error);
    }
}
exports.updateSubproduct = async (req, res) => {
    try {
        const subproductIdExists = await Subproduct.findOne({id: req.params.id});
        if (!subproductIdExists) return res.status(404).json({msg: "Supplier id doesn't exist"});
        const { subproduct, unit } = req.body;
        const subproductExists = await Subproduct.findOne({subproduct: subproduct});
        if (subproductExists) return res.status(400).json({msg: "Subproduct already exists"});
        subproductIdExists.subproduct = subproduct;
        subproductIdExists.unit = unit;
        await subproductIdExists.save()
        res.json(subproductIdExists);
    } catch (error) {
        if (error.errors?.unit) res.status(400).send("Invalid or missing field 'unit'");
        else res.status(500).send("" + error);
    }
}

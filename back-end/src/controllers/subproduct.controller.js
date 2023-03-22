const Subproduct = require('../models/subproduct.model');
const Primary = require('../models/primary.model');
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
exports.deleteSubproduct = async (req, res) => {
    try {
        const subproductExists = await Subproduct.findOne({id: req.params.id});
        if (!subproductExists) return res.status(404).send("Subproduct with id '" + req.params.id + "' doesn't exist");
        await Subproduct.deleteOne({id: req.params.id});
        res.json({msg: "Subproduct Deleted succesfully"});
    } catch (error) {
        res.status(500).send("" + error);
    }
}
exports.addComponentToSubproduct = async (req, res) => {
    try {
        const { id, group, consumption, waste} = req.body;
        const subproductExists = await Subproduct.findOne({id: req.params.id});
        if (!subproductExists) return res.status(404).json({msg: "Subproduct doesn't exists"});
        if (group == "Subproductos") {
            const otherSubproductExists = await Subproduct.findOne({id: id});
            if (!otherSubproductExists) return res.status(404).json({msg: "Subproduct doesn't exists"});
        }
        else {
            const primaryExists = await Primary.findOne({id: id});
            if (!primaryExists) return res.status(404).json({msg: "Primary doesn't exists"});
        }
        subproductExists.components.push({
            id: id,
            group: group,
            consumption: consumption,
            waste: waste
        });
        await subproductExists.save();
        res.json(subproductExists);
    } catch (error) {
        if (error.errors?.group) res.status(400).send("Invalid or missing field 'group'");
        else res.status(500).send("" + error);
    }
}

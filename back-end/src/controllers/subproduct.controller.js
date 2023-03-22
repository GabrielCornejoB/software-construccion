const Subproduct = require('../models/subproduct.model');
const Counter = require('../models/counter.model');

exports.addSubproduct = async (req, res) => {
    try {
        const { subproduct, unit, details } = req.body;
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
        res.send(newSubproduct);
    } catch (error) {
        if (error.errors?.unit) res.status(400).send("Invalid or missing field 'unit'");
        else res.status(500).send("" + error);
    }
}

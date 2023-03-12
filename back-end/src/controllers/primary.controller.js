const Primary = require("../models/primary.model");
const Counter = require("../models/counter.model");

exports.addPrimary = async (req, res) => {
    try {
        const primaryExists = await Primary.findOne({primary: req.body.primary});
        if (primaryExists) throw new Error("Primary already exists");
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
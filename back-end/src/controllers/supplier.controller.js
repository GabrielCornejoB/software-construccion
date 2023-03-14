const Supplier = require("../models/supplier.model");

exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        if (!suppliers) return res.status(404).send("There are 0 suppliers");
        res.json(suppliers);
    } catch (error) {
        res.status(500).send("" + error);
    }
}

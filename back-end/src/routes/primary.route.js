const { Router } = require("express");
const router = Router();
const { Unit, Group, Clasification, getKeys } = require('../models/enums');
const counterModel = require('../models/counter.model');
const primaryModel = require('../models/primary.model');

router.post('/add-primary', async (req, res) => {
    // Request fields
    const { primary, group, clasification, unit } = req.body;
    // Validations
    if (!primary || !primary?.trim()) return res.status(400).send("Missing fields");
    const primaryExists = await primaryModel.findOne({ primary: primary });
    if (primaryExists) return res.status(400).send("Primary '" + primary + "' already exists");
    if (!getKeys(Unit).includes(unit)) return res.status(400).send("Unit '" + unit + "' is not valid");
    if (!getKeys(Group).includes(group)) return res.status(400).send("Group '" + group + "' is not valid");
    if (!getKeys(Clasification).includes(clasification)) return res.status(400).send("Clasification '" + clasification + "' is not valid");
    const primaryCounterExists = await counterModel.findOneAndUpdate({ collectionName: "primaries" }, { $inc: { "counter": 1 }});
    if (!primaryCounterExists) {
        const newCounter = new counterModel({collectionName: "primaries", counter: 1});
        await newCounter.save();
        counter = 1;
    }
    else counter = primaryCounterExists.counter + 1;
    // Create and Add new primary
    const newPrimary = new primaryModel({ 
        id: counter,
        primary, 
        group, 
        clasification, 
        unit, 
        defaultPrice: 0,
        defaultSupplier: ""
    });
    await newPrimary.save();
    return res.status(200).send("'" + primary + "' added succesfully");
});

router.post('/add-supplier-to-primary', async (req, res) => {
    const {primaryId, supplierId, listPrice, iva, discount, observations} = req.body;

    if (!supplierId?.toString().trim() || !listPrice?.toString().trim() || !iva?.toString().trim() || 
        !discount?.toString().trim() || !primaryId?.toString().trim()) {
        return res.status(400).send('Missing fields');
    }    
    const values = {
        supplierId,
        listPrice,
        iva,
        discount,
        unitaryPrice: (listPrice * (1+iva/100)) * (100-discount)/100,
        updateDate: new Date(),
        observations
    }
    const primaryIdExists = await primaryModel.findOne({id: primaryId});
    if (!primaryIdExists) return res.status(400).send("Primary with id: '" + primaryId + "' doesn't exists");
    // Colocar validación para que proveedores no puedan repetirse
    primaryIdExists.suppliers.push(values);
    await primaryIdExists.save();
    return res.status(200).send("Supplier added to " + primaryIdExists.primary);
});

// router.post('/update-primary')

// router.____('/delete-primary')

// router.get('/get-primarys')

// router.get('/get-provs-of-prim')

module.exports = router;

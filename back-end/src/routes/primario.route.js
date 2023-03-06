const { Router } = require("express");
const router = Router();
const primarioModel = require('../models/primario.model');
const { Unidad, Grupo, Clasificacion, getKeys } = require('../models/enums');
const counterModel = require('../models/counter.model');

router.post('/add-primario', async (req, res) => {
    const { 
        primario, 
        grupo, 
        clasificacion, 
        unidad
    } = req.body;

    const primarioExists = await primarioModel.findOne({ primario: primario });
    if (primarioExists) return res.status(400).send("Primario '" + primario + "' already exists");

    if (!getKeys(Unidad).includes(unidad)) return res.status(400).send("Unidad '" + unidad + "' is not valid");
    if (!getKeys(Grupo).includes(grupo)) return res.status(400).send("Grupo '" + grupo + "' is not valid");
    if (!getKeys(Clasificacion).includes(clasificacion)) return res.status(400).send("Clasificacion '" + clasificacion + "' is not valid");

    const primarioCounterExists = await counterModel.findOneAndUpdate({ collectionName: "primarios" }, { $inc: { "counter": 1 }});
    if (!primarioCounterExists) {
        const newCounter = new counterModel({collectionName: "primarios", counter: 1});
        await newCounter.save();
        counter = 1;
    }
    else {
        counter = primarioCounterExists.counter + 1;
    }

    const newPrimario = new primarioModel({ 
        id: counter,
        primario, 
        grupo, 
        clasificacion, 
        unidad, 
        valorPorDefecto: 0,
        proveedorPorDefecto: ""
    });
    await newPrimario.save();
    return res.status(200).send(primario + " added succesfully");
});

module.exports = router;

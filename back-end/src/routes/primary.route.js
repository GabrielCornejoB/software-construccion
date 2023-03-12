const { Router } = require("express");
const router = Router();
const primaryController = require("../controllers/primary.controller");

router.post('/add-primary', primaryController.addPrimary);

router.get('/get-primaries', primaryController.getPrimaries);

router.get('/get-primary/:id', primaryController.getPrimary);

router.put('/update-primary/:id', primaryController.updatePrimary);

router.delete('/delete-primary/:id', primaryController.deletePrimary);

router.post('/add-supplier-to-primary/:id/:supplierId', primaryController.addSupplierToPrimary);

router.get('/get-suppliers-of-primary/:id', primaryController.getSuppliersOfPrimary);

router.patch('/update-supplier-of-primary/:id/:supplierId', primaryController.updateSupplierOfPrimary);

router.patch('/set-default-supplier-of-primary/:id', primaryController.setDefaultSupplierOfPrimary);

router.delete('/delete-supplier-of-primary/:id/:supplierId', primaryController.deleteSupplierOfPrimary);

// router.delete('/delete-supplier-of-primary', async (req, res) => {
//     const {primaryId, supplierId} = req.body;
//     if (!primaryId?.toString().trim() || !supplierId?.toString().trim()) return res.status(400).send("Missing fields");
//     const primaryExists = await primaryModel.findOne({id: primaryId});
//     if (!primaryExists) return res.status(400).send("Primary doesn't exist");
//     const suppliersIds = [];
//     for (let sup of primaryExists.suppliers) suppliersIds.push(sup.supplierId);
//     if (!suppliersIds.includes(supplierId)) return res.status(400).send("Primary doesn't has that supplier");
//     let index = suppliersIds.indexOf(supplierId);
//     primaryExists.suppliers.splice(index, 1);
//     await primaryExists.save();
//     return res.status(200).send("Supplier of primary deleted succesfully");
// });

module.exports = router;

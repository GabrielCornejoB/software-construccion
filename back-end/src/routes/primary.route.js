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

// router.patch('/update-supplier-of-primary', async (req, res) => {
//     const { primaryId, supplierId, listPrice, iva, discount } = req.body;
//     if (!supplierId?.toString().trim() || !listPrice?.toString().trim() || !iva?.toString().trim() || 
//         !discount?.toString().trim() || !primaryId?.toString().trim()) {
//         return res.status(400).send('Missing fields');
//     }   
//     const primaryIdExists = await primaryModel.findOne({id: primaryId});
//     if (!primaryIdExists) return res.status(400).send("Primary with id: '" + primaryId + "' doesn't exist");
//     const suppliersIds = [];
//     for (let sup of primaryIdExists.suppliers) suppliersIds.push(sup.supplierId);
//     if (!suppliersIds.includes(supplierId)) return res.status(400).send("Primary doesn't has that supplier");
//     let index = suppliersIds.indexOf(supplierId);
//     primaryIdExists.suppliers[index].listPrice = listPrice;
//     primaryIdExists.suppliers[index].iva = iva;
//     primaryIdExists.suppliers[index].discount = discount;
//     primaryIdExists.suppliers[index].unitaryPrice = (listPrice * (1+iva/100)) * (100-discount)/100;
//     primaryIdExists.suppliers[index].updateDate = new Date();
//     await primaryIdExists.save();
//     return res.status(200).send("Supplier updated succesfully");
// });

// router.patch('/set-default-supplier-of-primary', async (req, res) => {
//     const { primaryId, defaultPrice, defaultSupplier } = req.body;
//     if (!primaryId?.toString().trim() || !defaultPrice?.toString().trim() || !defaultSupplier?.toString().trim()) return res.status(400).send("Missing fields");
//     const primaryExists = await primaryModel.findOne({id: primaryId});
//     if (!primaryExists) return res.status(400).send("Primary doesn't exist");
//     primaryExists.defaultPrice = defaultPrice;
//     primaryExists.defaultSupplier = defaultSupplier;
//     await primaryExists.save();
//     return res.status(200).send("Default supplier of primary updated succesfully");
// });

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

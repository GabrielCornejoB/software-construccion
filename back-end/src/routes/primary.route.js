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

module.exports = router;

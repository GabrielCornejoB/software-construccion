const { Router } = require('express');
const router = Router();
const supplierController = require('../controllers/supplier.controller');

router.post('/add-supplier', supplierController.addSupplier);

router.get('/get-suppliers', supplierController.getSuppliers);

router.put('/update-supplier/:id', supplierController.updateSupplier);

module.exports = router;

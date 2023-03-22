const { Router } = require("express");
const router = Router();
const subproductController = require('../controllers/subproduct.controller');

router.post('/add-subproduct', subproductController.addSubproduct);

// router.post('/add-component-to-subproduct');

// router.put('/update-subproduct');

// router.delete('/delete-subproduct');

// router.delete('/delete-component-of-subproduct');

router.get('/get-subproducts', subproductController.getSubproducts);

// router.get('./get-subproduct-with-components');

module.exports = router;

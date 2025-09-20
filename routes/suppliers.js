const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { isLoggedIn } = require('../middleware/auth');

// Xem danh sách supplier
router.get('/', supplierController.index);

// CRUD supplier chỉ cho login
router.get('/new', isLoggedIn, supplierController.newForm);
router.post('/', isLoggedIn, supplierController.create);
router.get('/:id/edit', isLoggedIn, supplierController.editForm);
router.put('/:id', isLoggedIn, supplierController.update);
router.delete('/:id', isLoggedIn, supplierController.delete);

module.exports = router;

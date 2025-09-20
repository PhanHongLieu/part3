const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isLoggedIn } = require('../middleware/auth');

// Xem tất cả sản phẩm (ai cũng xem được)
router.get('/', productController.index);

// Thêm sản phẩm (chỉ login)
router.get('/new', isLoggedIn, productController.newForm);
router.post('/', isLoggedIn, productController.create);

// Sửa sản phẩm (chỉ login)
router.get('/:id/edit', isLoggedIn, productController.editForm);
router.put('/:id', isLoggedIn, productController.update);

// Xóa sản phẩm (chỉ login)
router.delete('/:id', isLoggedIn, productController.delete);

module.exports = router;

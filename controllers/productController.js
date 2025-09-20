// controllers/productController.js
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.index = async (req, res) => {
  const { q, supplier } = req.query;
  const filter = {};
  if (q) filter.name = new RegExp(q, 'i');
  if (supplier) filter.supplier = supplier;
  const products = await Product.find(filter).populate('supplier');
  const suppliers = await Supplier.find();
  res.render('products/index', { products, suppliers, q, selectedSupplier: supplier });
};

exports.newForm = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('products/form', { product: {}, suppliers });
};

exports.create = async (req, res) => {
  const { name, price, quantity, supplier } = req.body;
  await Product.create({ name, price, quantity, supplier });
  res.redirect('/products');
};

exports.editForm = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const suppliers = await Supplier.find();
  res.render('products/form', { product, suppliers });
};

exports.update = async (req, res) => {
  const { name, price, quantity, supplier } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplier });
  res.redirect('/products');
};

exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
};

// controllers/supplierController.js
const Supplier = require('../models/Supplier');

exports.index = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('suppliers/index', { suppliers });
};

exports.newForm = (req, res) => res.render('suppliers/form', { supplier: {} });

exports.create = async (req, res) => {
  const { name, address, phone } = req.body;
  await Supplier.create({ name, address, phone });
  res.redirect('/suppliers');
};

exports.editForm = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  res.render('suppliers/form', { supplier });
};

exports.update = async (req, res) => {
  const { name, address, phone } = req.body;
  await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
  res.redirect('/suppliers');
};

exports.delete = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.redirect('/suppliers');
};

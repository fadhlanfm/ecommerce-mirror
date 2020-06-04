const { Product } = require('../models');
const createError = require('../helpers/createError');

class ProductController {
  static async getAll (req, res, next) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  };
  static async editStock (req, res, next) {
    try {
      const { stock } = req.body;
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        throw createError(400, 'Params must be an integer');
      }
      const product = await Product.findOne({ where: { id } });
      if (!product) {
        throw createError(404, 'Error not Found');
      }
      if (stock > product.stock) {
        throw createError(400, 'Out of stock');
      }
      if (stock < 0) {
        throw createError(400, 'Please enter the stock number');
      }
      const newStock = Number(product.stock) - Number(stock);
      await Product.update({ stock: newStock }, { where: { id } });
      res.status(200).json({
        msg: 'Success'
      })
    } catch (err) {
      next(err);
    }
  }
  static async createData (req, res, next) {
    try {
      const { name, image_url, price, stock } = req.body;
      if (stock < 0) {
        throw createError(400, 'Please enter the stock number');
      }
      const obj = { name, image_url, price, stock };
      const newProduct = await Product.create(obj);
      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  }
  static async editData (req, res, next) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        throw createError(400, 'Params must be an integer');
      }
      const { name, image_url, price, stock } = req.body;
      if (stock < 0) {
        throw createError(400, 'Please enter the stock number');
      }
      const obj = { name, image_url, price, stock };
      await Product.update(obj, { where: { id } });
      res.status(201).json({
        msg: 'Success'
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteData (req, res, next) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        throw createError(400, 'Params must be an integer');
      }
      const product = await Product.findOne({ where: { id } });
      if (!product) {
        throw createError(404, 'Error Not Found');
      }
      await Product.destroy({ where: { id } });
      res.status(200).json({
        msg: 'Success'
      })
    } catch (err) {
      next(err);
    }
  }
};

module.exports = ProductController;
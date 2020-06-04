const { User, Product, Cart } = require('../models');
const createError = require('../helpers/createError');

class CartController {
  static async getAll (req, res, next) {
    try {
      const id = Number(req.UserData.id);
      const user = await User.findOne({ where: { id }, include: [{ model: Product }] });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
  static async addCart (req, res, next) {
    try {
      const { stock, ProductId } = req.body;
      const UserId = Number(req.UserData.id);
      const productData = await Product.findOne({ where: { id: ProductId } });
      if (!productData) {
        throw createError(404, 'Error Not Found');
      }
      if (stock > productData.stock) {
        throw createError(400, 'You cannot buy more than the stock available');
      }
      if (stock < 1) {
        throw createError(400, 'Please enter the stock number');
      }
      const cart = await Cart.findOne({ where: { ProductId, UserId }, attributes: ['id', 'stock'] });
      let obj = { stock, ProductId, UserId };
      let result;
      if (!cart) {
        result = await Cart.create(obj);
      } else {
        const newStock = cart.dataValues.stock += Number(stock);
        if (newStock > productData.stock) {
          throw createError(400, 'You cannot buy more than the stock available, check your cart');
        }
        obj.stock = newStock;
        result = await Cart.update(obj, { where: { id: cart.dataValues.id } });  
      }
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async deleteCart (req, res, next) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        throw createError(400, 'Params must be an integer');
      }
      const cart = await Cart.findOne({ where: { id } });
      if (!cart) {
        throw createError(404, 'Error Not Found');
      }
      await Cart.destroy({ where: { id } });
      res.status(200).json({
        msg: 'Success'
      });
    } catch (err) {
      next(err);
    }
  }
  static async updateCart (req, res, next) {
    try {
      const id = Number(req.params.id);
      const { stock } = req.body;
      if (!Number.isInteger(id)) {
        throw createError(400, 'Params must be an integer');
      }
      const cart = await Cart.findOne({ where: { id } });
      if (!cart) {
        throw createError(404, 'Error Not Found');
      }
      const product = await Product.findOne({ where: { id: cart.ProductId } });
      if (!product) {
        throw createError(400, 'Your product is out of stock');
      }
      if (Number(stock) > product.stock) {
        throw createError(400, 'You cannot buy more than the stock available');
      } else if (Number(stock) < 1) {
        throw createError(400, 'Just delete the Cart, mate');
      }
      await Cart.update({ stock }, { where: { id } });
      res.status(200).json({
        msg: 'Success'
      })
    } catch (err) {
      next(err);
    }
  }
  static async checkOut (req, res, next) {
    try {
      const id = Number(req.UserData.id);
      const user = await User.findOne({ where: { id }, include: [{ model: Product }] });
      let query = [];
      user.Products.forEach(x => {
        const newStock = x.stock - x.Cart.stock;
        if (newStock < 0) {
          throw createError(400, `Sorry, ${x.name} has already Sold Out`);
        }
        query.push(Cart.destroy({ where: { id: x.Cart.id } }));
        query.push(Product.update({ stock: newStock }, { where: { id: x.id } }));
      });
      await Promise.all(query)
      res.status(200).json({
        msg: 'Success'
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = CartController;
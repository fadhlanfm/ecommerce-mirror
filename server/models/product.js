'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Name cannot be empty'
          }
        }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Price cannot be empty'
          },
          isInt: {
            args: true,
            msg: 'Price must be a number'
          }
        }
    },
    stock: {
      type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Stock cannot be empty'
          },
          isInt: {
            args: true,
            msg: 'Stock must be a number'
          }
        }
    }
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.User, { through: 'Cart' });
  };
  return Product;
};
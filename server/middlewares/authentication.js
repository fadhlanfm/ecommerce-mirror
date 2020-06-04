const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');
const createError = require('../helpers/createError');

const authentication = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const decoded = verifyToken(token);
    const user = User.findOne({ where: { id: decoded.id } });
    if (!user) {
      throw createError(401, 'You have to login first');
    }
    req.UserData = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
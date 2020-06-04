const { User } = require('../models');
const createError = require('../helpers/createError');

const authorization = async (req, res, next) => {
  try {
    const id = Number(req.UserData.id);
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw createError(401, 'You have to login first');
    }
    if (user.role !== 'Admin') {
      throw createError(403, 'You are forbidden to do that');
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;
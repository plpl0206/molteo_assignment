const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

const models = require('../../models');

const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createUserSchemaValidator = validator.body(createUserSchema);

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  const emailExisted = await models.User.emailExisted(email);
  if (emailExisted) {
    res.json({
      msg: 'email already registed',
    });
    return;
  }
  const user = await models.User.createUserByEmail(email, username, password);

  if (user.isError) {
    res.json({
      msg: user.original ? user.original.code : 'fail to create user',
    });
    return;
  }
  req.logIn(user, { session: false });
  next();
};

module.exports = {
  createUserSchemaValidator,
  createUser,
};

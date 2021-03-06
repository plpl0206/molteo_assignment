const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../../models');
const config = require('../../config');
const { redis } = require('../../connections/redis');
const responseHelper = require('../../helpers/common/response');

passport.use(new LocalStrategy({
  usernameField: 'email',
}, signInVerify));

async function signInVerify(email, password, done) {
  try {
    const user = await models.User.authenticate(email, password);
    done(null, user);
  } catch (err) {
    if (err.message === 'user not exist') {
      done(null, false, {
        code: responseHelper.RESPONSE_CODE.BAD_REQUEST,
        message: responseHelper.RESPONSE_MSG.SIGN_IN_USER_NOT_EXIST,
      });
      return;
    }

    if (err.message === 'password error') {
      done(null, false, {
        code: responseHelper.RESPONSE_CODE.UNAUTHORIZED,
        message: responseHelper.RESPONSE_MSG.SIGN_IN_PASSWORD_ERROR,
      });
      return;
    }
    done(null, false, { message: err.message, statuse: responseHelper.RESPONSE_CODE.BAD_REQUEST });
  }
}

const genAuthorization = async (req, res, next) => {
  const { userId } = req.user;
  const expire = config.auth.parameter.user_token_expire_sec;
  const payload = { user_id: userId };
  const secret = config.auth.parameter.jwt_secret;
  const jwtToken = jwt.sign(payload, secret);

  await redis.master.set(`token:${userId}`, jwtToken, 'EX', expire);
  res.response = {
    data: {
      user_id: userId,
      user_token: jwtToken,
    },
  };
  return next();
};

const removeAuthorization = async (req, res, next) => {
  const { userId } = req.user;
  await redis.master.del(`token:${userId}`);
  return next();
};

module.exports = {
  genAuthorization,
  removeAuthorization,
};

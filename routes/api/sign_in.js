const express = require('express');
const passport = require('passport');
const { handleResponse } = require('../../services/common/response');
const passportErrorHandle = require('../../middlewares/passport/common');

const {
  genAuthorization,
} = require('../../services/api/sign_in');

const router = express.Router();

router.post(
  '',
  passport.authenticate('local', {
    session: false,
    failWithError: true,
  }),
  passportErrorHandle,
  genAuthorization,
  handleResponse,
);

module.exports = router;

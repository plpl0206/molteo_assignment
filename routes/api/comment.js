const express = require('express');
const { handleResponse } = require('../../services/common/response');
const { ensureAuthenticated } = require('../../middlewares/user');
const joiErrorHandle = require('../../middlewares/joi_error_handle');
const commentMiddleware = require('../../middlewares/api/comment');
const { movieServices } = require('../../services/api/movie');

const {
  createCommentSchemaValidator,
  commentServices,
} = require('../../services/api/comment');

const router = express.Router();

router.get(
  '/',
  commentMiddleware.checkMovieExisted,
  commentServices.getCommentListByMovieId,
  handleResponse,
);

router.post(
  '',
  ensureAuthenticated,
  createCommentSchemaValidator,
  joiErrorHandle,
  commentMiddleware.checkMovieExisted,
  commentServices.createComment,
  movieServices.updateMovieRating,
  handleResponse,
);

router.put(
  '/:commentId',
  ensureAuthenticated,
  commentMiddleware.checkCommentUpdateData,
  commentServices.updateCommentById,
  movieServices.updateMovieRating,
  handleResponse,
);

router.delete(
  '/:commentId',
  ensureAuthenticated,
  commentServices.removeCommentById,
  movieServices.updateMovieRating,
  handleResponse,
);

module.exports = router;

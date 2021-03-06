const models = require('../../models');

const responseHelper = {
  RESPONSE_CODE: {
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
  },

  RESPONSE_MSG: {
    // User
    SIGN_UP_EMAIL_EXISTED: 'EMAIL EXISTED',
    SIGN_IN_USER_NOT_EXIST: 'USER NOT EXIST',
    SIGN_IN_PASSWORD_ERROR: 'PASSWORD ERROR',
    CREATE_USER_FAILURE: 'CREATE USER FAILURE',
    UPDATE_USER_FAILURE: 'UPDATE USER FAILURE',
    DELETE_USER_SUCCESS: 'DELETE USER SUCCESS',
    DELETE_USER_FAILURE: 'DELETE USER FAILURE',

    // Movie
    CREATE_MOVIE_FAILURE: 'CREATE MOVIE FAILURE',
    GET_MOVIE_LIST_FAILURE: 'GET MOVIE LIST FAILURE',
    GET_MOVIE_FAILURE: 'GET MOVIE FAILURE',
    UODATE_MOVIE_FAILURE: 'UPDATE MOVIE FAILURE',
    DELETE_MOVIE_SUCCESS: 'DELETE MOVIE SUCCESS',
    DELETE_MOVIE_FAILURE: 'DELETE MOVIE FAILURE',

    // Comment
    CREATE_COMMENT_FAILURE: 'CREATE COMMENT FAILURE',
    GET_COMMENT_LIST_FAILURE: 'GET COMMENT LIST FAILURE',
    UPDATE_COMMENT_FAILURE: 'UPDATE COMMENT FAILURE',
    DELETE_COMMENT_SUCCESS: 'DELETE COMMENT SUCCESS',
    DELETE_COMMENT_FAILURE: 'DELETE COMMENT FAILURE',
    MOVIE_NOT_EXIST: 'MOVIE NOT EXIST',
    MOVIEID_FIELD_NOT_EXIST: 'MOVIEID FIELD NOT EXIST',
  },
};

module.exports = responseHelper;

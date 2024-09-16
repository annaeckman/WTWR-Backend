const { Joi, celebrate } = require("celebrate");
const validator = require("validator");
const mongoose = require("mongoose");

// validation for avatar and item image URLs
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

module.exports.validateRegisterBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'the "avatar" field must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// IDs must be a hexadecimal value length of 24 characters:
// read joi and celebrate documentation
// there's no built in fn, better to use a validator from mongoose library,
// mongoose.types.objectid.isvalid (google for correct capitalization) will tell me
//if it's hex value 24 characters all object ids are hex 24,
module.exports.validateIdBody = celebrate({
  body: Joi.object().keys({
    _id: mongoose.isValidObjectId(),
  }),
});

// module.exports.validateIdParams = celebrate({
//   params: Joi.object().keys({}),
// });

// On top of validating the request body, celebrate also **allows you to
// validate headers, parameters, or req.query. Use parameters to extract
// and validate the item and user IDs
// const validateId = celebrate({
//   params: Joi.object().keys({
//     // ...
//   }),
// });

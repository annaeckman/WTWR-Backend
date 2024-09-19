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

// validation for object id using built in mongoose method
// const validateObjectId = (value, helpers) => {
//   if (!mongoose.isValidObjectId(value)) {
//     return helpers.error("any.invalid");
//   }
//   return value;
// };

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
    weather: Joi.string().valid("hot", "cold", "warm").required().messages({
      "string.empty": "The 'weather' field must be filled in",
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

module.exports.validateUpdateBody = celebrate({
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
  }),
});

// IDs must be a hexadecimal value length of 24 characters:
// there's no built in fn, better to use a validator from mongoose library,
// mongoose.types.objectid.isvalid (google for correct capitalization) will tell me
//if it's hex value 24 characters all object ids are hex 24,
// module.exports.validateIdBody = celebrate({
//   body: Joi.object().keys({
//     _id: mongoose.isValidObjectId(),
//   }),
// });

module.exports.validateIdParams = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required().messages({
      "string.hex": "Invalid item ID format",
      "string.length": "Invalid item ID length",
      "any.required": "Item ID is required",
    }),
  }),
});

// module.exports.validateIdParams = celebrate({
//   [Segments.PARAMS]: Joi.object().keys({
//     itemId: Joi.string().custom(validateObjectId, 'ObjectId Validation').required().messages({
//       'any.invalid': 'Invalid item ID format',
//       'any.required': 'Item ID is required',
//     }),
//   }),
// });

// On top of validating the request body, celebrate also **allows you to
// validate headers, parameters, or req.query. Use parameters to extract
// and validate the item and user IDs
// const validateId = celebrate({
//   params: Joi.object().keys({
//     // ...
//   }),
// });

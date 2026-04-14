// src/middleware/validation.js
import { errorResponse } from '../utils/response.js';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const message = error.details.map(detail => detail.message).join(', ');
      return errorResponse(res, 400, message);
    }
    
    next();
  };
};
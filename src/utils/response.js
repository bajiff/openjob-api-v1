// src/utils/response.js
export const successResponse = (res, statusCode, message, data = null) => {
  const response = {
    status: 'success',
    message,
  };
  if (data) {
    // Jika data adalah array, bungkus dengan nama yang sesuai
    if (Array.isArray(data)) {
      // Nanti kita handle di controller untuk penamaan spesifik (companies, jobs, dll)
      response.data = data;
    } else {
      response.data = data;
    }
  }
  return res.status(statusCode).json(response);
};

export const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: 'failed',
    message,
  });
};
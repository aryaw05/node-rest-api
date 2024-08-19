import { ResponseError } from "../eroor/response-error.js";
const errorMiddleware = (err, req, res, next) => {
  // untuk middleware yang menangani error secara global dalam aplikasi.
  if (!err) {
    next();
    return;
  }
  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        errors: {
          message: err.message,
        },
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        errors: {
          message: err.message,
        },
      })
      .end();
  }
};

export { errorMiddleware };

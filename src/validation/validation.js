import { ResponseError } from "../eroor/response-error.js";

const validate = (schema, request) => {
  // validate menggunakan joi
  const result = schema.validate(request, {
    abortEarly: false,
    allowUknown: false,
  });
  if (result.error) {
    throw new ResponseError(400, result.error.message);
    // throw result.error;
  } else {
    return result.value;
  }
};

export { validate };

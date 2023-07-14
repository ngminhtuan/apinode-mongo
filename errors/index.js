import { CustomAPIError } from "./customError.js";
import { BadRequest } from "./badRequest.js";
import { Unauthenticated } from "./unauthenticated.js";

const CustomUnauthenticated = (msg) => {
    return new Unauthenticated(msg);
}

const CustomBadRequest = (msg) => {
    return new BadRequest(msg);
}

const CustomNotFound = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
}

export { CustomAPIError, CustomBadRequest, CustomUnauthenticated, CustomNotFound }


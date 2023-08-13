import { CustomAPIError } from "./customError.js";
import { BadRequest } from "./badRequest.js";
import { Unauthenticated } from "./unauthenticated.js";
import { StatusCodes } from "http-status-codes";

const CustomUnauthenticated = (res, msg) => {
    res.status(StatusCodes.UNAUTHORIZED).json({msg: msg})
}

const CustomBadRequest = (res, msg) => {
    res.status(StatusCodes.BAD_REQUEST).json({msg: msg})
}

const CustomNotFound = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
}

export { CustomAPIError, CustomBadRequest, CustomUnauthenticated, CustomNotFound }


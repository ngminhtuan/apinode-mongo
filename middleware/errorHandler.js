import { CustomAPIError } from "../errors/index.js"
import { StatusCodes } from "http-status-codes"

export const errorHandlerMiddleware = (err, req, res, next) => {

let customError = {
    statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Somethings went wrong"
}
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: customError.msg })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: customError.msg })
}

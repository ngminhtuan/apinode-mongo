import { CustomAPIError } from "./customError.js";
import { StatusCodes } from "http-status-codes";


class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }

}

export { BadRequest }

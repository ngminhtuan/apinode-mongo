// import { createCustomError, CustomAPIError } from "../errors/customError.js";
import { CustomUnauthenticated, CustomBadRequest } from "../errors/index.js";
import jwt from "jsonwebtoken";

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new next(CustomUnauthenticated("No token provided"))
    }
    const token = authHeader.split(' ')[1]
    try {
        const decode = jwt.verify(token, 'jwtSecret')
        const { id, username } = decode
        req.user = { id, username }
        next()
    } catch (error) {
        throw new next(CustomUnauthenticated("You are not authorized to access this resource"))
    }
}

const loginMiddleware = async (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw new next(CustomBadRequest('Please provide Username and Password'))
    }
    try {
        req.user = { username }
        next()
    } catch (error) {
        throw new next(CustomBadRequest('Please provide Username and Password'))
    }
}

export { authenticationMiddleware, loginMiddleware }


import express from "express";
import { login, dashboard } from "../controller/controllerJWT.js";
import { authenticationMiddleware, loginMiddleware } from "../middleware/auth.js";

const routerJWT = express.Router()

routerJWT.route('/dashboard').get(authenticationMiddleware, dashboard)
routerJWT.route('/login').post(loginMiddleware, login)

export default routerJWT
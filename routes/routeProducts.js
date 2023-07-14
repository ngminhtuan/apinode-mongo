import express from "express";
import { getAllProduct, getAllProductStatic } from "../controller/controllerProducts.js";

const routerProduct = express.Router();

routerProduct.route('/').get(getAllProduct)
routerProduct.route('/static').get(getAllProductStatic);

export default routerProduct;

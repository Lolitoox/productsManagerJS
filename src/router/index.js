import { Router } from "express";
import productsRouters from "./products.routers.js";
import cartsRouters from "./carts.routers.js";
import sessionRouters from "./session.routers.js";
import { isLogin } from "../middlewares/isLogin.middleware.js";
const router = Router();

router.use("/products", isLogin, productsRouters);
router.use("/carts", cartsRouters);
router.use("/session", sessionRouters);

export default router;
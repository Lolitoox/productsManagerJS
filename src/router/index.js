import { Router } from "express";
import productsRouters from "./products.routers.js"
import cartsRouters from "./carts.routers.js"
import sessionRouters from "./session.routers.js";

const router = Router();

router.use ("/products", productsRouters);
router.use ("/carts", cartsRouters);
router.use ("/session", sessionRouters);

export default router;
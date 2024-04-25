const { Router } = require("express");
import productsRouters from "./products.routers.js"
import cartsRouters from "./carts.routers.js"

const router = Router();

router.use ("/products", productsRouters);
router.use ("/carts", cartsRouters);

export default router;
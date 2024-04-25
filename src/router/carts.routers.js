const { Router } = require("express");
import cartsManager from "../managers/cartsManager";

const router = Router();

router.post ("/", async (req, res) => {
    try {
        const cart = await cartsManager.createCart();

        res.status(201).json (cart);

    } catch (error) {
        console.log (error);
    }
})

router.post ("/:cid/product/:pid", async (req, res) => {
    try {
        const {cid, pid} = req.params;
        const cart = await cartsManager.addProductToCart(cid, pid);

        res.status(201).json (cart);

    } catch (error) {
        console.log (error);
    }
})

router.get ("/:cid", async (req, res) => {
    try {
        const {cid} = req.params;
        const cart = await cartsManager.getCartById(cid);

        res.status(200).json(cart);

    } catch (error) {
        console.log (error);
    }
})

export default router;
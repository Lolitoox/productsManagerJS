const { Router } = require("express");
import ProductManager from "../managers/productsManager.js";

const router = Router();

// Instancia de ProductManager
const manager = new ProductManager('../JavaScriptD2/src/data/products.json');
manager.initialize();

// Ruta para obtener todos los productos (con soporte para query param 'limit')
router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = manager.getProducts(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Ruta para obtener un producto por su id
router.get('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const product = manager.getProductById(pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

router.post("/", async (req, res) => {
    
    try {
        const product = req.body;

        const newProduct = await ProductManager.addProduct(product);

        res.status (201).json(newProduct);
    } catch (error) {
        console.log(error);
    }
})

router.put("/:pid", async (req, res) => {
    
    try {
        const {pid} = req.params;

        const product = req.body;

        const updateProduct = await ProductManager.updateProduct(pid, product);

        res.status (201).json(updateProduct);
    } catch (error) {
        console.log(error);
    }
})

router.delete("/:pid", async (req, res) => {
    
    try {
        const {pid} = req.params;

        await ProductManager.deleteProduct(pid);

        res.status (201).json({message: "Producto eliminado con éxito"});
    } catch (error) {
        console.log(error);
    }
})

export default router;
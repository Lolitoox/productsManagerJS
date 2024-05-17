import { Router } from "express";
import productDao from "../dao/mongoDao/product.dao.js";

const router = Router();

// Instancia de ProductManager
//const manager = new ProductManager('../JavaScriptD2/src/dao/fsManager/data/products.json');
//manager.initialize();

router.get('/', async (req, res) => {
    try {
        //const limit = req.query.limit;
        //const products = manager.getProducts(limit);
        const products = await productDao.getAll();
        res.status(200).json({status: "succes", payload: products});

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Ruta para obtener un producto por su id
router.get('/:pid', async (req, res) => {
    try {
        //const pid = parseInt(req.params.pid);
        //const product = manager.getProductById(pid);
        //if (product) {
            //res.json(product);
        //} else {
            //res.status(404).json({ error: 'Producto no encontrado' });
        //}
        const { pid } = req.params;
        const product = await productDao.getById(pid);
        if(!product) return res.status (404).json({status: "Error", msg: `Producto con id ${pid} no encontrado`})
        
            res.status(200).json({status: "succes", payload: product});

    } catch (error) {
        console.log(error);
    }
});

router.post("/", async (req, res) => {
    
    try {
        const product = req.body;
        const newProduct = await productDao.create(product);
        res.status(201).json({status: "succes", payload: newProduct});

    } catch (error) {
        console.log(error);
    }
})

router.put("/:pid", async (req, res) => {
    
    try {
        const {pid} = req.params;
        const productData = req.body;

        const updateProduct = await productDao.update(pid, productData);
        if(!updateProduct) return res.status (404).json({status: "Error", msg: `Producto con id ${pid} no encontrado`})

        res.status(200).json({status: "succes", payload: updateProduct});
    } catch (error) {
        console.log(error);
    }
})

router.delete("/:pid", async (req, res) => {
    
    try {
        const {pid} = req.params;

        const product = await productDao.deleteOne (pid);
        if(!product) return res.status (404).json({status: "Error", msg: `Producto con id ${pid} no encontrado`})

        res.status(200).json({status: "succes", payload: "Producto eliminado"});
    } catch (error) {
        console.log(error);
    }
})

export default router;
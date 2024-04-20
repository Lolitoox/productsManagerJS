const express = require('express');
const ProductManager = require('../JavaScriptD2/src/index');
const app = express();
const PORT = 8080;

// Instancia de ProductManager
const manager = new ProductManager('../JavaScriptD2/src/products.json');
manager.initialize();

// Ruta para obtener todos los productos (con soporte para query param 'limit')
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = manager.getProducts(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Ruta para obtener un producto por su id
app.get('/products/:pid', async (req, res) => {
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
  // Endpoint para obtener productos por categoría (No funcional aún)
  app.get('/productos/categoria/:categoria', (req, res) => {
    const categoria = req.params.categoria;
  
    fs.readFile('productos.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al leer el archivo de productos' });
        return;
      }
  
      const productos = JSON.parse(data);
      const productosPorCategoria = productos.filter(producto => producto.categoria === categoria);
  
      if (productosPorCategoria.length === 0) {
        res.status(404).json({ error: 'No hay productos en la categoría especificada' });
      } else {
        res.json(productosPorCategoria);
      }
    });
  });

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
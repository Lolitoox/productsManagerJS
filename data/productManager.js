const fs = require('fs');

//Variable path, array de products y id de productos
class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.id = 0;
    }

    //Función para agregar productos
    addProduct(product) {
        product.id = ++this.id;
        this.products.push(product);
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    //Función para buscar todos los productos cargados
    getProducts() {
        this.products = JSON.parse(fs.readFileSync(this.path));
        return this.products;
    }

    //Función para buscar productos por su id
    getProductById(id) {
        this.products = JSON.parse(fs.readFileSync(this.path));
        return this.products.find(product => product.id === id);
    }

    //Función para actualizar algun cambio realizado en un producto
    updateProduct(id, updatedProduct) {
        this.products = this.products.map(product => {
            if (product.id === id) {
                return { ...product, ...updatedProduct, id };
            }
            return product;
        });
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    //Función para borrar un producto
    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }
}

// Ejemplo de uso:
let manager = new ProductManager('products.json');

// Agregar un producto
manager.addProduct({
    title: 'Producto 1',
    description: 'Descripción del Producto 1',
    price: 100,
    thumbnail: '/ruta/a/imagen.jpg',
    code: 'prod1',
    stock: 10
});

// Obtener todos los productos
let products = manager.getProducts();
console.log(products);

// Obtener un producto por su id
let product = manager.getProductById(1);
console.log(product);

// Actualizar un producto
manager.updateProduct(1, {
    title: 'Producto 1 actualizado',
    price: 120
});

// Eliminar un producto
manager.deleteProduct(1);

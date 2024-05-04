import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.id = 0;
    this.status = true;
  }
  //Función para iniciar el pruductData
  async initialize() {
    try {
      const productsData = await fs.readFile(this.path, "utf-8");
      this.products = JSON.parse(productsData);
      this.id =
        this.products.length > 0
          ? this.products[this.products.length - 1].id
          : 0;
    } catch (error) {
      console.error("Error al inicializar ProductManager:", error);
    }
  }
  //Función para agregar productos
  async addProduct(product) {
    try {
      product.id = ++this.id;
      this.products.push(product);
      await this.saveProductsToFile();
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  }
  //Función para pedir productos con un limite
  async getProducts(limit) {
    try {
      const productsData = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(productsData);
      const limitedProducts = limit
        ? products.slice(0, parseInt(limit))
        : products;
      return limitedProducts;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      return [];
    }
  }
  //Función para buscar productos por id
  async getProductById(id) {
    try {
      const productsData = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(productsData);
      return products.find((product) => product.id === id);
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
      return null;
    }
  }
  //Función para actualizar productos
  async updateProduct(id, updatedProduct) {
    try {
      const index = this.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        this.products[index] = { ...updatedProduct, id };
        await this.saveProductsToFile();
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  }
  //Función para borrar un producto
  async deleteProduct(id) {
    try {
      this.products = this.products.filter((product) => product.id !== id);
      await this.saveProductsToFile();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }

  //Función para guardar los productos
  async saveProductsToFile() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products));
    } catch (error) {
      console.error("Error al guardar los productos en el archivo:", error);
    }
  }
}

module.exports = ProductManager;

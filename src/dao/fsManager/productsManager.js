import fs from "fs";


class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.id = 0;
    this.status = true;
  }

  async initialize() {
    try {
      const productsData = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(productsData);
      this.id = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
    } catch (error) {
      this.handleError("Error al inicializar ProductManager:", error);
    }
  }

  async addProduct(product) {
    try {
      product.id = ++this.id;
      this.products.push(product);
      await this.saveProductsToFile();
    } catch (error) {
      this.handleError("Error al agregar el producto:", error);
    }
  }

  async getProducts(limit) {
    try {
      const limitedProducts = limit ? this.products.slice(0, parseInt(limit)) : this.products;
      return limitedProducts;
    } catch (error) {
      this.handleError("Error al obtener los productos:", error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const product = this.products.find((p) => p.id === id);
      return product;
    } catch (error) {
      this.handleError("Error al obtener el producto por ID:", error);
      return null;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const index = this.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        this.products[index] = { ...updatedProduct, id };
        await this.saveProductsToFile();
      }
    } catch (error) {
      this.handleError("Error al actualizar el producto:", error);
    }
  }

  async deleteProduct(id) {
    try {
      this.products = this.products.filter((product) => product.id !== id);
      await this.saveProductsToFile();
    } catch (error) {
      this.handleError("Error al eliminar el producto:", error);
    }
  }

  async saveProductsToFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    } catch (error) {
      this.handleError("Error al guardar los productos en el archivo:", error);
    }
  }

  handleError(message, error) {
    console.error(message, error);
  }
}

export default ProductManager;

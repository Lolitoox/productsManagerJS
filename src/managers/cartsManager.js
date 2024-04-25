import fs from "fs";

let carts = [];
const pathFile = "./data/carts.json"

const getCarts = async () => {
    const cartsJson = await fs.promises.readFile (pathFile);
    carts = JSON.parse(cartsJson) || [];

    return carts;
}
//Función para crear carrito
const createCart = async () => {
    await getCarts();

    const newCart = {
        id: carts.length + 1,
        products: []
    };

    carts.push(newCart);

    await fs.promises.writeFile(pathFile, JSON.stringify(carts));
    return newCart;
}
//Función para buscar por id/cid
const getCartById = async (cid) => {
    await getCarts();

    const cart = carts.find (c => c.id === id);

    if(!cart) return `No se encuentra el carrito con id: ${cid}`

    return cart.products;
}
//Función para el carrito de productos
const addProductToCart = async (cid, pid) => {
    await getProducts(); 
    const index = carts.findIndex(c => c.id === cid);
    if(index === -1) return `No se encontró carrito con el ID: ${cid}`;

    // Busca si el producto ya existe en el carrito
    const productIndex = carts[index].products.findIndex(p => p.product === pid);

    if(productIndex !== -1) {
        // Si el producto ya está en el carrito, se incrementa la cantidad
        carts[index].products[productIndex].quantity++;
    } else {
        // Si el producto no está en el carrito, se agrega
        carts[index].products.push({
            product: pid,
            quantity: 1
        });
    }
    return carts[index];
}

export default {
    getCarts,
    createCart,
    getCartById,
    addProductToCart
}
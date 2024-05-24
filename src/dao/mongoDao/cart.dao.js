import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

const getById = async (id) => {
    const cart = await cartModel.findById(id);
    return cart;
}
//Función para crear carrito
const create = async (data) => {
    const cart = await cartModel.create(data);
    return cart;
}
//Función para agregar producto al carrito
const addProductToCart = async (cid, pid) => {
    const product = await productModel.findById(pid);
    if (!product) return { product: false };
    const cart = await cartModel.findById(cid);
    if (!cart) return { cart: false };

    const productInCart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, {$inc: {"products.$.quantity": 1}});

    if (!productInCart){
        await cartModel.updateOne({ _id: cid }, { $push: { products: { product: pid, quantity: 1 }}});
    }

    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate;
};
//Función para borrar un producto dentro del carrito (de 1 en 1)
const deleteProductInCart = async (cid, pid) => {
    const product = await productModel.findById(pid);
    if (!product) return { product: false };
    const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, {$inc: {"products.$.quantity": -1}});
    if (!cart) return { cart: false };
    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate;
};
//Función actualizar
const update = async (cid, data) => {
    await cartModel.updateOne({ _id: cid }, { $set: { products: data }});
    const cart = await cartModel.findById(cid);
    return cart;
};
//Función para actualizar la cantidad del producto dentro del carrito
const updateQuantityProductInCart = async (cid, pid, quantity) => {
    const product = await productModel.findById(pid);
    if (!product) return { product: false };

    const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, {$set: {"products.$.quantity": quantity}});
    if (!cart) return { cart: false };
    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate;
};
//Función para borrar todos los productos dentro del carrito
const deleteAllProductsInCart = async (cid) => {
    const cart = await cartModel.findByIdAndUpdate(cid, { $set: { products: []} });
    
    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate;
};

export default{
    getById,
    create,
    addProductToCart,
    deleteProductInCart,
    update,
    updateQuantityProductInCart,
    deleteAllProductsInCart,
};
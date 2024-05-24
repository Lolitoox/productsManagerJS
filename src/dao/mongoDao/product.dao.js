import { productModel } from "../models/product.model.js";
//Funciones para traer todos los productos, para traer por id, crear si no existe el producto, actualizarlo y borrarlo
const getAll = async () => {
    const products = await productModel.find();
    return products;
}

const getById = async (id) => {
    const product = await productModel.findById(id);
    return product;
}

const create = async (data) => {
    const product = await productModel.create(data);
    return product;
}

const update = async (id, data) => {
    await productModel.findByIdAndUpdate(id, data);
    const product = await productModel.findById(id);
    return product;
}

const deleteOne = async (id) => {
    const product = await productModel.deleteOne({_id: id});
    if(product.deletedCount === 0) return false;
    return true;
}

export default{
    getAll,
    getById,
    create,
    update,
    deleteOne
}
import mongoose from "mongoose";

const urlDB = "mongodb+srv://guidobasano:guido123456@e-commerce.d8yxr8i.mongodb.net/ecommerce";

//Conexión a la base de datos
export const connectMongoDB = async () => {
    try {
        mongoose.connect (urlDB);
        console.log ("Mongo DB conectado");
    } catch (error) {
        console.log (error);
    }
}
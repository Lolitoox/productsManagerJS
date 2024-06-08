import router from './src/router/index.js';
import express from 'express';
import { connectMongoDB } from './src/config/mongoDB.config.js';
import session from "express-session";
import MongoStore from 'connect-mongo';

connectMongoDB();

const app = express();
const PORT = 8080;

app.use ("/api", router);
app.use (session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://guidobasano:guido123456@e-commerce.d8yxr8i.mongodb.net/ecommerce",
        ttl: 15
    }),
    secret: "CodigoSecreto",
    resave: true
}));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
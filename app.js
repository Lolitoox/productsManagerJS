import router from './src/router/index.js';
import express from 'express';
import { connectMongoDB } from './src/config/mongoDB.config.js';

connectMongoDB();
const app = express();
const PORT = 8080;

app.use ("/api", router);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
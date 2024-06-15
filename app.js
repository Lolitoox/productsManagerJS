import express from "express";
import router from "./src/router/index.js";
import { connectMongoDB } from "./src/config/mongoDB.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./src/config/passport.config.js";
import cookieParser from "cookie-parser";

connectMongoDB();

const app = express();
initializePassport();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secreto"));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://guidobasano:guido123456@e-commerce.d8yxr8i.mongodb.net/ecommerce",
      ttl: 15,
    }),
    secret: "CodigoSecreto",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Autenticación exitosa, redirigir.
        res.redirect('/');
    });


app.use("/api", router);

app.listen(8080, () => {
  console.log("Escuchando el servidor en el puerto 8080");
});


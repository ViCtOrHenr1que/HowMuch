import express from "express";
import gastos from "./gastosRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send({message:"pagina inicial"});
    });

    app.use(
        express.json(),
        gastos
    );
};

export default routes;
import express from "express";

import GastoController from "../controllers/gastosController.js";

const router = express.Router();

router
    .get("/app/categorias", GastoController.listarGastos)
    .post("/app/gastos/registrar", GastoController.registarGasto)
    .delete("/app/gastos/eliminar/:id", GastoController.deletarGasto)



export default router;
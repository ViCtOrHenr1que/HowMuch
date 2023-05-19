import gastos from "../models/Gasto.js";

class GastoController {
    static listarGastos = async (req, res) => {
        try {
            const gastosResultado = await gastos.find();

            res.status(200).json(gastosResultado);
        } catch (err) {
            res.status(500).send({message: `Falha ao listar gastos - ${err.message}`});
        }
    }
    static registarGasto = async (req, res) =>{
        try {
            const gasto = new gastos(req.body);
            await gasto.save();

            res.status(201).json(gasto);
        } catch (err) {
            res.status(500).send({message: `Não foi possivel registrar novo gasto - ${err.message}`});
        }
    }
    static deletarGasto = async (req, res) => {
        try {
            const { id } = req.params;
            await gastos.findByIdAndDelete(id);

            res.status(200).send({message:"Registro deletado com sucesso"})
        } catch (err) {
            res.status(500).send({message: `Não foi possivel deletar o gasto - ${err.message}`});

            
        }
    }
}

export default GastoController;
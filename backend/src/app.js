import  express  from "express";
import DB from "./config/dbConnect.js";
import routes from "./routes/index.js";
import cors from "cors";


DB.on("error", console.log.bind(console, "Erro de conexão"));
DB.once("open", () => {
    console.log("Banco de dados conectado");
});

const app = express();
app.use(cors());
app.use(express.json());

routes(app);

export default app;
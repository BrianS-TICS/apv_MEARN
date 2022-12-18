import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv"
import veterinarioRoutes  from "./routes/veterinarioRoutes.js";
import pacientesRoutes from "./routes/pacientesRoutes.js"
const app = express()
app.use(express.json());

dotenv.config()
conectarDB()

app.use( "/api/veterinarios", veterinarioRoutes)
app.use( "/api/pacientes",  pacientesRoutes)



const PORT = process.env.PORT || 4000

app.listen(4000, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
});
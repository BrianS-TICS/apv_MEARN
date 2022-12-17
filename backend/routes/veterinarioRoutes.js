import express from "express"
import {
    registrar,
    perfil,
    confirmar,
    autenticar
} from '../controllers/veterinarioController.js'
const router = express.Router()

router.post('/', registrar);

router.get('/perfil', perfil) 

router.post('/login', autenticar) 

router.get('/confirmar/:token', confirmar)

export default router
import express from "express"
import {
    registrar,
    perfil,
    confirmar,
    autenticar
} from '../controllers/veterinarioController.js'
import checkAuth from "../middleware/authMiddleware.js";


const router = express.Router()

// Public routes
router.post('/', registrar);
router.post('/login', autenticar) 
router.get('/confirmar/:token', confirmar)

// Private routes
router.get('/perfil', checkAuth, perfil) 



export default router
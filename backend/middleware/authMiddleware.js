import jwt from 'jsonwebtoken'
import Veterinario from '../models/Veterinario.js';

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Se separa el bearer del jwt
            token = req.headers.authorization.split(' ')[1]
            const decored = jwt.verify(token, process.env.JWT_SECRET)

            // Al agregarlo al request se express crea una sesion con sus datos
            req.veterinario = await Veterinario.findById(decored.id).select("-password -token -confirmado")

            return next()
        } catch (e) {
            const error = new Error('Token no valido')
            res.status(403).json({ msg: error.message })
        }
    }

    if (!token) {
        const error = new Error("El token no es valido o esta expirado")
        return res.status(401).json({ msg : error.message })
    }

    return next()
}

export default checkAuth
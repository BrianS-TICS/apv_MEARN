import Veterinario from "../models/Veterinario.js"
import { generarJWT } from "../helpers/generarJWT.js"

const registrar = async (req, res) => {

    const { email } = req.body

    // Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({ email })

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({ msg: error.message })
    }

    try {
        //Guarda nuevo veterinario
        const veterinario = new Veterinario(req.body)
        const veterinarioGuardado = await veterinario.save()
        res.json(veterinarioGuardado)
    } catch (error) {
        console.log(error)
    }

}

const perfil = (req, res) => {
    res.json({
        msg: "Mostrando perfil"
    })
}

const confirmar = async (req, res) => {
    const token = req.params.token

    const usuarioConfirmar = await Veterinario.findOne({ token })

    if (!usuarioConfirmar) {
        const error = new Error('Token no valido')
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.token = null
        usuarioConfirmar.confirmado = true
        await usuarioConfirmar.save()
        res.json({ msg: 'Usuario confirmado correctamente' })
    } catch (error) {
        console.log(error)
    }

}

const autenticar = async (req, res) => {
    const { email, password } = req.body

    const usuario = await Veterinario.findOne({ email })

    if (!usuario) {
        const error = new Error("No existe una cuenta con este correo")
        return res.status(404).json({ msg: error.message })
    }

    if (!usuario.confirmado) {
        const error = new Error("La cuenta no ha sido confirmada")
        return res.status(403).json({ msg: error.message })
    }

    // Logeo correcto
    if (await usuario.comprobarPassword(password)) {
        // Autentificacion
        return res.status(200).json({ token : generarJWT(usuario.id) })

    } else {
        const error = new Error("La contraseña es incorrecta")
        return res.status(404).json({ msg: error.message })
    }

}

export {
    registrar,
    perfil,
    confirmar,
    autenticar
}
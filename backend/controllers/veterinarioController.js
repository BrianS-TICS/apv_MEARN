import Veterinario from "../models/Veterinario.js"
import { generarJWT } from "../helpers/generarJWT.js"
import emailRegistro from "../helpers/emailRegistro.js"
import generadId from "../helpers/generarId.js"
import emailOlvidepassword from "../helpers/emailOlvidepassword.js"

const registrar = async (req, res) => {

    const { email, nombre } = req.body

    // Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({ email })

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({ msg: error.message })
    }

    try {
        // Guarda nuevo veterinario
        const veterinario = new Veterinario(req.body)
        const veterinarioGuardado = await veterinario.save()

        // Envio de email
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        })

        res.json(veterinarioGuardado)


    } catch (error) {
        console.log(error)
    }

}

const actualizarPerfil = async (req, res) => {

    const veterinario = await Veterinario.findById(req.params.id)

    if (!veterinario) {
        const error = new Error('Hubo un error')
        return res.status(400).json({ msg: error.message })
    }

    if (veterinario.email !== req.body.email) {
        const existeEmail = veterinario.findOne(req.body.email)
        if (existeEmail) {
            const error = new Error('Ya existe una cuenta registrada con ese email')
            return res.status(400).json({ msg: error.message })
        }
    }

    try {
        veterinario.nombre = req.body.nombre || veterinario.nombre
        veterinario.email = req.body.email || veterinario.email
        veterinario.web = req.body.web || veterinario.web
        veterinario.telefono = req.body.telefono || veterinario.telefono

        const veterinarioActualizado = await veterinario.save()
        res.json(veterinarioActualizado)
    } catch (error) {
        console.log(error)
    }

}

const olvidePassword = async (req, res) => {
    const { email } = req.body

    const veterinario = await Veterinario.findOne({ email: email })

    if (!veterinario) {
        const error = new Error("El correo no esta registrado")
        return res.status(400).json({ msg: error.message })
    }

    try {
        veterinario.token = generadId()
        await veterinario.save()

        emailOlvidepassword({
            email,
            nombre: veterinario.nombre,
            token: veterinario.token
        })


        return res.json({ msg: "Se ha enviado un token a tu correo" })
    } catch (error) {
        console.log(error)
    }
}

const actualizarPassword = async (req, res) => {


    const { id } = req.veterinario
    const { pwd_actual, pwd_nuevo } = req.body
    const veterinarioEncontrado = await Veterinario.findById(id)

    if (!veterinarioEncontrado) {
        const error = new Error("El correo no esta registrado")
        return res.status(400).json({ msg: error.message })
    }

    if (await veterinarioEncontrado.comprobarPassword(pwd_actual, pwd_nuevo)) {
        veterinarioEncontrado.password = pwd_nuevo
        await veterinarioEncontrado.save()
        res.json({msg : "Password almacenado correctamente"})
    } else {
        const error = new Error("La contraseña es incorrecta")
        return res.status(400).json({ msg: error.message })
    }
}

const comprobarToken = async (req, res) => {
    const token = req.params.token
    const tokenValido = await Veterinario.findOne({ token })

    if (tokenValido) {
        res.status(200).json({ msg: "Token valido" })
    } else {
        const error = new Error("El token no es valido")
        res.status(400).json({ msg: error.message })
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const veterinario = await Veterinario.findOne({ token })

    if (!veterinario) {
        const error = new Error("Token no valido");
        res.status(400).json({ msg: error });
    }

    try {
        veterinario.token = null
        veterinario.password = password

        await veterinario.save()
        res.status(200).json({ msg: "Password modificado correctamente" })
    } catch (error) {
        console.log(error)
    }
}

const perfil = (req, res) => {
    const { veterinario } = req
    res.json(veterinario)
}

const confirmar = async (req, res) => {
    const { token } = req.params;

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
        usuario.token = generarJWT(usuario.id)

        return res.status(200).json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token
        })

    } else {
        const error = new Error("La contraseña es incorrecta")
        return res.status(404).json({ msg: error.message })
    }

}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword
}
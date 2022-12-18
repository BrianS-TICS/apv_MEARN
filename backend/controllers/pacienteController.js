import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body)
    paciente.veterinario = req.veterinario._id
    try {
        const pacienteAlmacenado = await paciente.save()
        res.status(200).json({ pacienteAlmacenado })
    } catch (error) {
        console.log(error)
    }
}

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario._id)
    res.json({ pacientes })
}

const obtenerPaciente = async (req, res) => {
    const id = req.params.id
    const paciente = await Paciente.findById(id)

    if (!paciente) {
        res.status(404).json({ msg: "No encontrado" })
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(401).json({ msg: error.message })
    }

    if (paciente) {
        return res.json({ paciente })
    }
}

const editarPaciente = async (req, res) => {

    const id = req.params.id
    const paciente = await Paciente.findById(id)

    if (!paciente) {
        res.status(404).json({ msg: "No encontrado" })
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        const error = new Error("Accion no valida")
        res.status(401).json({ msg: error.msg })
    }

    if (paciente) {
        try {
            // Si no esta presente en el request se conservan los datos
            paciente.nombre = req.body.nombre || paciente.nombre
            paciente.email = req.body.email || paciente.email
            paciente.propietario = req.body.propietario || paciente.propietario
            paciente.fecha = req.body.fecha || paciente.fecha
            paciente.sintomas = req.body.sintomas || paciente.sintomas

            await paciente.save()
            res.status(200).json({ paciente })
        } catch (e) {
            console.log(e)
            const error = new Error("Error al actualizar")
            res.status(404).json({ msg : error.message})
        }

    }

}

const deletePaciente = async (req, res) => {
    const id = req.params.id
    const paciente = await Paciente.findById(id)

    if (!paciente) {
        const error = new Error("Paciente no encontrado")
        return res.status(404).json({ msg: error.message })
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(401).json({ msg: error.message })
    }

    try {
        await paciente.deleteOne()
        res.json({msg : "Eliminado correctamente"})
    } catch (e) {
        console.log(e)
        const error = new Error("Error al eliminar")
        res.status(400).json(error.message)
    }
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    editarPaciente,
    deletePaciente
}
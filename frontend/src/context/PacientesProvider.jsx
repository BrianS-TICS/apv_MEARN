import { createContext, useState, useEffect } from 'react'
import clienteAxios from '../../config/axios'
import useAuth from '../../hooks/useAuth'

const PacientesContext = createContext()

const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const [cargando, setCargando] = useState(true)
    const { auth } = useAuth() 

    useEffect(() => {
        const obtenerPacientes = async () => {
            setPacientes([])
            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config)
                setCargando(false)
                const { pacientes } = data
                setPacientes(pacientes)

            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    }, [auth])

    const guardarPacientes = async (paciente) => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/pacientes', paciente, config)
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data.pacienteAlmacenado
            setPacientes([pacienteAlmacenado, ...pacientes])
        } catch (error) {
            console.log(error)
        }
    }

    const editarPacientes = async (paciente) => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)

            const pacientesActualizados = pacientes.map(pacienteState => {
                return pacienteState._id === data.paciente._id ? data.paciente : pacienteState
            })

            setPacientes(pacientesActualizados)

        } catch (error) {
            console.log(error)
        }
    }

    const eliminarPaciente = async (id) => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            await clienteAxios.delete(`/pacientes/${id}`, config)

            const nuevaLista = pacientes.filter( pacienteState => {
                return pacienteState._id !== id
            })

            setPacientes(nuevaLista)

        } catch (error) {
            console.log(error)
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    return (
        <PacientesContext.Provider
            value={{
                cargando,
                pacientes,
                guardarPacientes,
                setEdicion,
                paciente,
                editarPacientes,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext
export {
    PacientesProvider
}
import { useState, useEffect } from 'react'
import usePacientes from '../hooks/usePacientes'
import Alerta from './Alerta'

const Formulario = () => {

    const { paciente, guardarPacientes, editarPacientes } = usePacientes()

    const [nombre, setNombre] = useState("")
    const [propietario, setPropietario] = useState("")
    const [email, setEmail] = useState("")
    const [fecha, setFecha] = useState("")
    const [sintomas, setSintomas] = useState("")
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})
    const [intento, setIntento] = useState(false)

    useEffect(() => {
        if (paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])

    const handleSubmit = (e) => {
        e.preventDefault()

        const campos = [
            nombre,
            propietario,
            email,
            fecha,
            sintomas
        ]

        if (campos.includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return
        }

        if (id) {
            editarPacientes({
                id,
                nombre,
                propietario,
                email,
                fecha,
                sintomas
            })
            setId(null)

            setAlerta({
                msg: "Editado correctamente"
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);

        } else {
            guardarPacientes({
                nombre,
                propietario,
                email,
                fecha,
                sintomas
            })

            setAlerta({
                msg: "Agregado correctamente"
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);

        }

        setNombre("")
        setPropietario("")
        setEmail("")
        setFecha("")
        setSintomas("")
        setId(null)
        setIntento(false)

    }

    return (

        <>
            <h2 className='font-extrabold mt-5 text-center text-3xl text-gray-600 mx-5'>Administrador de pacientes</h2>
            <p className='text-lg text-center mt-3 mb-4 font-bold  text-gray-600'>Añade a tus pacientes y{" "} <span className='text-indigo-600 font-bold'>Administra tus pacientes</span></p>
            <form action="" onSubmit={(e) => { handleSubmit(e) }} className='p-5 bg-white shadow-md'>
                <div className='block mb-5'>
                    <label
                        className='text-gray-700 uppercase font-bold'
                        htmlFor="nombre"
                    >Nombre de mascota</label>
                    <input
                        value={nombre}
                        onChange={(e) => { setNombre(e.target.value) }}
                        className={`border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400 ${nombre === "" && intento ? "border-red-600" : null}`}
                        id='nombre'
                        type="text"
                        placeholder='Nombre de la mascota'
                    />
                </div>
                <div className='block mb-5'>
                    <label
                        className='text-gray-700 uppercase font-bold'
                        htmlFor="propietario"
                    >Nombre de propietario</label>
                    <input
                        value={propietario}
                        onChange={(e) => { setPropietario(e.target.value) }}
                        className={`border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400 ${propietario === "" && intento ? "border-red-600" : null}`}
                        id='propietario'
                        type="text"
                        placeholder='Nombre de el propietario'
                    />
                </div>
                <div className='block mb-5'>
                    <label
                        className='text-gray-700 uppercase font-bold'
                        htmlFor="email"
                    >Email</label>
                    <input
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        className={`border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400 ${email === "" && intento ? "border-red-600" : null}`}
                        id='email'
                        type="text"
                        placeholder='Email del propietario'
                    />
                </div>
                <div className='block mb-5'>
                    <label
                        className='text-gray-700 uppercase font-bold'
                        htmlFor="fecha"
                    >Fecha de alta</label>
                    <input
                        value={fecha}
                        onChange={(e) => { setFecha(e.target.value) }}
                        className={`border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400 ${fecha === "" && intento ? "border-red-600" : null}`}
                        id='fecha'
                        type="date"
                        placeholder='Fecha de alta'
                    />
                </div>
                <div className='block mb-5'>
                    <label
                        className='text-gray-700 uppercase font-bold'
                        htmlFor="sintomas"
                    >Sintomas</label>
                    <textarea
                        value={sintomas}
                        onChange={(e) => { setSintomas(e.target.value) }}
                        id='sintomas'
                        placeholder='Describe los sintomas'
                        className={`border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400 ${sintomas === "" && intento ? "border-red-600" : null}`}
                    />
                </div>
                {
                    alerta.msg &&
                    <div className='mb-5'>
                        <Alerta alerta={alerta} />
                    </div>
                }
                <input
                    onClick={() => setIntento(true)}
                    type="submit"
                    value={id ? "Editar paciente" : "Agregar paciente"}
                    className='block w-full py-2 px-2 bg-indigo-600 hover:bg-indigo-800 transition-colors text-white font-bold rounded-md uppercase hover:cursor-pointer'
                />
            </form>
        </>
    )
}

export default Formulario
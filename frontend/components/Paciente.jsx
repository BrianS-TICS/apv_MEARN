import React from 'react'
import usePacientes from '../hooks/usePacientes'
const Paciente = ({ paciente }) => {

    const { setEdicion, eliminarPaciente } = usePacientes()
    const { nombre, propietario, _id, email, fecha, sintomas } = paciente

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(nuevaFecha)
    }

    return (
        <div className='my-2 mx-auto bg-white rounded-md p-5 shadow-md'>
            <h3><span className='font-bold text-gray-500'>Nombre : </span>{nombre}</h3>
            <h5><span className='font-bold text-gray-500'>Propietario : </span>{propietario}</h5>
            <h5><span className='font-bold text-gray-500'>Email : </span>{email}</h5>
            <h5><span className='font-bold text-gray-500'>Sintomas : </span>{sintomas}</h5>
            <h5><span className='font-bold text-gray-500'>Fecha de alta: </span>{formatearFecha(fecha)}</h5>
            <div className='flex justify-between my-5 gap-5'>
                <button onClick={() => setEdicion(paciente)} type='button' className='w-full py-2 px-6 bg-indigo-600 hover:bg-indigo-700 font-medium text-white border-1 rounded-md'>
                    Editar
                </button>
                <button onClick={() => eliminarPaciente(_id)} type='button' className='w-full py-2 px-6 bg-red-600 hover:bg-red-700 font-medium text-white border-1 rounded-md'>
                    Eliminar
                </button>
            </div>
        </div>

    )
}

export default Paciente
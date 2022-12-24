import React, { useState } from 'react'
import ListadoPacientes from '../components/ListadoPacientes'
import Formulario from '../components/Formulario'


const AdministracionPacientes = () => {
    const [mostarFormulario, setMostrarFormulario] = useState(false)
    const handleMostrarFormulario = () => {
        setMostrarFormulario(!mostarFormulario)
    }
    return (
        <>
            <div className='flex flex-col md:flex-row gap-5 mt-5'>
                <button onClick={handleMostrarFormulario} type='button' className='py-2 px-2 bg-indigo-600 hover:bg-indigo-800 transition-colors md:hidden text-white font-bold rounded-md uppercase hover:cursor-pointer mx-5 mt-5'>
                    {!mostarFormulario ? 'Mostrar formulario' : "Ocultar formulario"}
                </button>
                <div className={`${mostarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
                    <Formulario />
                </div>
                <div className='md:w-1/2 lg:w-3/5'>
                    <ListadoPacientes />
                </div>
            </div>
        </>
    )
}

export default AdministracionPacientes
import React from 'react'
import ListadoPacientes from '../components/ListadoPacientes'
import Formulario from '../components/Formulario'

const AdministracionPacientes = () => {
    return (
        <>
            <div className='flex flex-col md:flex-row gap-5 mt-5'>
                <div className='md:w-1/2 lg:w-2/5'>
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
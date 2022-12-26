import React from 'react'
import usePacientes from '../hooks/usePacientes'
import Paciente from './Paciente'
import SpinnerFullScreen from './SpinnerFullScreen'

const ListadoPacientes = () => {
    const { pacientes, cargando } = usePacientes()

    if (cargando) {
        return (
            <SpinnerFullScreen />
        )

    }

    return (
        <>
            {
                pacientes.length ? (
                    <>
                        <h2 className='font-extrabold mt-5 text-center text-3xl text-gray-600 mx-5'>Listado de pacientes y citas</h2>
                        <p className='text-center mt-2 mb-5 text-gray-600 text-lg font-bold'>Comienza agregando pacientes y <span className='text-indigo-600'> aparecerán en este lugar</span></p>
                      
                        {
                            pacientes.map(paciente => <Paciente key={paciente._id} paciente={paciente} />)
                        }
                    </>
                ) :
                    (
                        <h2 className='font-extrabold mt-5 text-center text-3xl text-gray-600 mx-5'>Aún no hay pacientes</h2>
                    )
            }
        </>
    )
}

export default ListadoPacientes
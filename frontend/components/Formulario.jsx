import React from 'react'

const Formulario = () => {
    return (
        <>
            <p className='text-lg text-center mb-10 mt-5 font-bold text-gray-700'>Añade a tus pacientes y{" "} <span className='text-indigo-600 font-bold'>Administra tus pacientes</span></p>
            <form action="" className='p-5 bg-white shadow-md'>
                <div className='block mb-5'>
                    <label
                        className='text-gray-700 uppercase font-bold'
                        htmlFor="mascota"
                    >Nombre de mascota</label>
                    <input
                        className='border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400'
                        id='mascota'
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
                        className='border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400'
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
                        className='border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400'
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
                        className='border-2 w-full p-2 mt-2 rounded-md'
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
                        id='sintomas'
                        placeholder='Describe los sintomas'
                        className='block w-full p-2 border-2'
                    />
                </div>
                <input
                    type="submit"
                    value="Agregar paciente"
                    className='block w-full py-2 px-2 bg-indigo-600 hover:bg-indigo-800 transition-colors text-white font-bold rounded-md uppercase hover:cursor-pointer'
                />
            </form>
        </>
    )
}

export default Formulario
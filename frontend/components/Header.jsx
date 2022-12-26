import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
const Header = () => {

    const { setAuth, cerrarSesion} = useAuth()

    return (
        <header className='py-10 bg-indigo-600'>
            <div className='container mx-auto md:flex justify-between items-center'>
                <h1 className='text-yellow-200 text-2xl text-center font-black uppercase p-1 hover:cursor-default'>Administrador de pacientes{" "}
                    <span className='text-white font-extrabold'>de veterinaria</span>
                </h1>
                <nav className='flex flex-col items-center md:flex-row gap-4  justify-center mt-5 md:mt-0 p-3 md:p-0'>
                    <Link className='text-white text-sm hover:text-gray-300 uppercase font-bold' to={'/admin'}>Pacientes</Link>
                    <Link className='text-white text-sm hover:text-gray-300 uppercase font-bold' to={'/perfil'}>Perfil</Link>
                    <button
                        onClick={cerrarSesion}
                        type='button'
                        className='text-white text-sm hover:text-gray-300 uppercase font-bold'>
                        Cerrar sesión
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header
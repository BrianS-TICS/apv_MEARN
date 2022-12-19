import React from 'react'
import { Link } from 'react-router-dom'

const OlvidePassword = () => {
  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-4xl md:text-6xl'>
          Recupera el acceso a tu {""}
          <span className='text-black'>cuenta</span>
        </h1>
      </div>
      <div className='mb-10 md:mt-0 shadow-lg py-10 px-5 rounded-md bg-white'>
        <form action="">
          <div className='my-5'>
            <label
              htmlFor="email"
              className='uppercase text-gray-600 block text-sm  md:text-xl font-bold mt-5'
            >
              Email
            </label>
            <input
              autoComplete='off'
              name='email'
              type="email"
              className='w-full p-3 rounded-md border mt-3 bg-gray-50'
              placeholder='Email de registro'
            />
          </div>
          <input
            type="submit"
            value="Enviar instrucciones"
            className='bg-indigo-700 w-full md:w-auto py-3 md:px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800'
          />
        </form>

        <nav className='mt-5 grid grid-cols-2 justify-between'>
          <Link className='text-gray-800 hover:text-gray-600 text-center md:text-left underline  block' to='/'>
            ¿Ya tienes una cuenta?
          </Link>
          <Link className='text-gray-800 hover:text-gray-600 text-center md:text-left  block' to='/registrar'>
            ¿No tienes una cuenta? <span className='underline'> Regístrate aqui</span>
          </Link>
        </nav>

      </div>
    </>
  )
}

export default OlvidePassword

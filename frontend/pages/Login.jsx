import React, { useEffect, useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'
import SpinnerFullScreen from '../components/SpinnerFullScreen'

const Login = () => {

    const { setAuth, auth, cargando } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alerta, setAlerta] = useState({})

    const navegate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()


        if (email === "") {
            setAlerta({
                msg: "El email no puede estar vacio",
                error: true
            })
            return
        }

        if (password === "") {
            setAlerta({
                msg: "La contraseña no puede estar vacia",
                error: true
            })
            return
        }

        try {
            const url = "veterinarios/login"

            const request = {
                email,
                password
            }

            const { data } = await clienteAxios.post(url, request)
            localStorage.setItem('token', data.token)

            navegate('/admin')

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    if (cargando) {
        return <SpinnerFullScreen />
    }
    
    if (auth?._id) {
        return <Navigate to={'/admin'} />
    }

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-4xl md:text-6xl'>Inicia Sesión Y Administra Tus {""}
                    <span className='text-black'>Pacientes</span>
                </h1>
            </div>
            <div className='mt-5 md:mt-0 shadow-lg py-10 px-5 rounded-md bg-white'>
                {alerta.msg && <Alerta alerta={alerta} />}
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <div className='my-5'>
                        <label
                            htmlFor="email"
                            className='uppercase text-gray-600 block text-sm  md:text-xl font-bold mt-5'
                        >
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete='off'
                            name='email'
                            type="email"
                            className='w-full p-3 rounded-md border mt-3 bg-gray-50'
                            placeholder='Email de registro'
                        />
                    </div>
                    <div className='my-5'>
                        <label
                            htmlFor="password"
                            className='uppercase text-gray-600 block text-sm  md:text-xl font-bold mt-5'
                        >
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete='off'
                            name='password'
                            type="password"
                            className='w-full p-3 rounded-md border mt-3 bg-gray-50'
                            placeholder='Escribe tu password'
                        />
                    </div>
                    <input
                        type="submit"
                        placeholder='Iniciar sesión'
                        value="Iniciar sesión"
                        className='bg-indigo-700 w-full md:w-auto py-3 md:px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800'
                    />
                </form>

                <nav className='mt-5'>
                    <Link className='text-gray-800 hover:text-gray-600 text-center md:text-left  block' to='/registrar'>
                        ¿No tienes una cuenta? <span className='underline'> Regístrate aqui</span>
                    </Link>
                    <Link className='text-gray-800 text-center md:text-left hover:text-gray-600 block mt-2 underline' to='/olvide-password'>
                        Olvidé mi password
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default Login
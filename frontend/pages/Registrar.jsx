import { useState } from 'react'
import { Link } from "react-router-dom"
import Alerta from '../components/Alerta'
import '../styles/RegistrarPacientes.css'
import axios from "axios"

const Registrar = () => {

    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [alerta, setAlerta] = useState({})


    const handleSubmit = async e => {

        e.preventDefault()

        if ([nombre, email, password, confirmPassword].includes('')) {
            setAlerta({ error: true, msg: "Todos los campos son obligatorios" })
            return
        }

        if (password !== confirmPassword) {
            setAlerta({ error: true, msg: "Las contraseñas no son iguales" })
            return
        }

        if (password.length < 6) {
            setAlerta({ error: true, msg: "Las contaseña debe tener minimo 6 caracteres" })
            return
        }

        setAlerta({})

        try {
            const veterinario = {
                nombre,
                email,
                password,
                confirmPassword
            }

            const url = "http://localhost:4000/api/veterinarios";
            await axios.post(url, veterinario)
            setAlerta({msg : "!Creado correctamente!, Revisa tu email" , error : false })

        } catch (error) {
            setAlerta({ error : true , msg : error.response.data.msg })
        }

    }

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-4xl md:text-6xl'>
                    Crea tu cuenta y administra {""}
                    <span className='text-black'>tus pacientes</span>
                </h1>
            </div>
            <div className='mb-10 mt-5 md:mt-0 shadow-lg py-3 md:py-10 px-5 rounded-md bg-white container-form-register'>
                <form action="" onSubmit={(e) => { handleSubmit(e) }}>

                    {/* Si existe un mensaje de error se imprime alerta */}
                    {alerta.msg && <Alerta alerta={alerta} />}

                    <div className='my-5'>
                        <label
                            htmlFor="nombre"
                            className='uppercase text-gray-600 block text-sm  md:text-xl font-bold mt-5'
                        >
                            Nombre
                        </label>
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            autoComplete='off'
                            name='nombre'
                            type="text"
                            className='w-full p-3 rounded-md border mt-3 bg-gray-50'
                            placeholder='Escribe tu nombre'
                        />
                    </div>
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
                    <div className='my-5'>
                        <label
                            htmlFor="password"
                            className='uppercase text-gray-600 block text-sm  md:text-xl font-bold mt-5'
                        >
                            Repetir password
                        </label>
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete='off'
                            name='password'
                            type="password"
                            className='w-full p-3 rounded-md border mt-3 bg-gray-50'
                            placeholder='Repite tu password'
                        />
                    </div>
                    <input
                        type="submit"
                        value="Crear cuenta"
                        className='bg-indigo-700 w-full md:w-auto py-3 md:px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800'
                    />
                </form>

                <nav className='mt-5 grid grid-cols-2 justify-between'>
                    <Link className='text-gray-800 hover:text-gray-600 text-center md:text-left underline  block' to='/'>
                        ¿Ya tienes una cuenta?
                    </Link>
                    <Link className='text-gray-800 text-center md:text-end hover:text-gray-600 block underline' to='/olvide-password'>
                        Olvidé mi password
                    </Link>
                </nav>

            </div>
        </>
    )
}

export default Registrar
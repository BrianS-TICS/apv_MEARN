import React, { useState, useEffect } from 'react'
import Alerta from '../components/Alerta'
import { useParams, Link } from 'react-router-dom'
import clienteAxios from '../config/axios'

const NuevoPassword = () => {

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [tokenValido, setTokenValido] = useState(false)
    const [finalizado, setFinalizado] = useState(false)

    const { token } = useParams()

    // ? GET
    useEffect(() => {

        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`)
                setAlerta({
                    msg: "Coloca tu nuevo password",
                })
                setTokenValido(true)

            } catch (error) {
                setAlerta({
                    msg: "Hubo un error con el enlace",
                    error: true
                })
                setTokenValido(false)
            }
        }
        comprobarToken()

    }, [])

    // ? POST
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password.length < 6) {
            setAlerta({
                msg: 'La contraseña es muy corta',
                error: true
            })
            return
        }

        if (repeatPassword.length < 6) {
            setAlerta({
                msg: "La contraseña repetida es muy corta",
                error: true
            })
            return
        }

        if (repeatPassword !== password) {
            setAlerta({
                msg: "La contraseñas no coinciden",
                error: true
            })
            return
        }

        try {
            const url = `/veterinarios/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, { password })
            setAlerta({
                msg: data.msg
            })
            setFinalizado(true)

        } catch (error) {
            console.log(error);
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-4xl md:text-6xl'>Reestablece tu contraseña{" "}
                    <span className='text-black'>aqui</span>
                </h1>
            </div>
            <div className='mb-10 mt-5 md:mt-0 shadow-lg py-3 md:py-10 px-5 rounded-md bg-white container-form-register'>
                {/* Si existe un mensaje de error se imprime alerta */}
                {alerta.msg && <Alerta alerta={alerta} />}

                {tokenValido &&
                    (
                        <>
                            <form onSubmit={(e) => handleSubmit(e)}>

                                <div className='my-5'>
                                    <label
                                        htmlFor="password"
                                        className='uppercase text-gray-600 block text-sm  md:text-xl font-bold mt-5'
                                    >
                                        Nueva contraseña
                                    </label>
                                    <input
                                        disabled={finalizado}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete='off'
                                        name='password'
                                        type="password"
                                        className='w-full p-3 rounded-md border mt-3 bg-gray-50'
                                        placeholder='Escribe tu nueva contraseña'
                                    />
                                </div>
                                <div className='my-5'>
                                    <label
                                        htmlFor="email"
                                        className='uppercase text-gray-600 block text-sm  md:text-xl font-bold mt-5'
                                    >
                                        Repetir nueva contraseña
                                    </label>
                                    <input
                                        disabled={finalizado}
                                        value={repeatPassword}
                                        onChange={(e) => {
                                            setRepeatPassword(e.target.value)
                                        }}
                                        autoComplete='off'
                                        name='repeatPassword'
                                        type="password"
                                        className='w-full p-3 rounded-md border mt-3 bg-gray-50'
                                        placeholder='Escribe tu nueva contraseña de nuevo'
                                    />
                                </div>
                                <input
                                    disabled={finalizado}
                                    type="submit"
                                    value="Guardar nueva contraseña"
                                    className={`bg-indigo-700 w-full md:w-auto py-3 md:px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 ${finalizado ? "bg-gray-200 hover:cursor-not-allowed hover:bg-gray-200" : null}`}
                                />
                            </form>

                            {
                                finalizado && (
                                    <Link className='inline-block mt-5 underline animate-pulse text-gray-900' to={"/"}>Iniciar sesión</Link>
                                )
                            }

                        </>
                    )
                }
            </div>
        </>
    )
}

export default NuevoPassword
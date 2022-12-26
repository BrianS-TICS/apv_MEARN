import React, { useState } from 'react'
import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'

const CambiarPassword = () => {

    const { guardarPassword } = useAuth()
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    })
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault()
        if (Object.values(password).some(campo => campo === '')) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return
        }

        if (password.pwd_nuevo < 6) {
            setAlerta({
                msg: "El nuevo password debe tener minimo 6 carateres",
                error: true
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return
        }
        const respuesta = await guardarPassword(password)
        setAlerta(respuesta)
        setPassword({
            pwd_actual : "",
            pwd_nuevo : ""
        })

        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

    return (
        <>
            <AdminNav />
            <h2 className='font-black text-center text-3xl mt-5'>Cambiar Password</h2>
            <p className='text-xl mt-5 mb-10 text-center'>Modifica tu <span className='font-bold text-indigo-600'> password aqui</span></p>

            <div className='flex justify-center'>
                <div className='w-full sm:w-1/2 md:w:1/2 bg-white shadow-md rounded-md p-5'>
                    <form onSubmit={(e) => { handleSubmit(e) }} >

                        <div className='my-3'>
                            <label className="uppercase font-bold text-gray-600">Password actual</label>
                            <input
                                type="password"
                                className='border bg-gray-50 w-full p-2 mt-2 rounded-md'
                                placeholder='Escribe tu contraseña actual'
                                name='pwd_actual'
                                value={password.pwd_actual || ''}
                                onChange={e => {
                                    setPassword({
                                        ...password,
                                        [e.target.name]: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className='my-3'>
                            <label className="uppercase font-bold text-gray-600">Nueva password</label>
                            <input
                                type="password"
                                className='border bg-gray-50 w-full p-2 mt-2 rounded-md'
                                placeholder='Escribe tu nueva contraseña'
                                name='pwd_nuevo'
                                value={password.pwd_nuevo || ''}
                                onChange={e => {
                                    setPassword({
                                        ...password,
                                        [e.target.name]: e.target.value
                                    })
                                }}
                            />
                        </div>

                        {alerta.msg && (
                            <div className='mt-5 mb-2'>
                                <Alerta alerta={alerta} />
                            </div>
                        )}
                        <input
                            type="submit"
                            className='border bg-indigo-600 w-full p-2 mt-2 rounded-md hover:bg-indigo-700 text-white hover:cursor-pointer font-bold'
                            value={"Actualizar contraseña"}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default CambiarPassword
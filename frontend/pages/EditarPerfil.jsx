import React, { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'

const EditarPerfil = () => {


    const { auth, actualizarPerfil } = useAuth()
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault()
        const { nombre, email } = perfil

        if ([nombre, email].includes('')) {
            setAlerta({
                msg: "Los campos Email y Nombre Son obligatorios",
                error: true
            })
            return
        }

        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado)

        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

    return (
        <>
            <AdminNav />
            <h2 className='font-black text-center text-3xl mt-5'>Editar perfil</h2>
            <p className='text-xl mt-5 mb-10 text-center'>Modifica tu <span className='font-bold text-indigo-600'> informacion aqui</span></p>

            <div className='flex justify-center'>
                <div className='w-full sm:w-1/2 md:w:1/2 bg-white shadow-md rounded-md p-5'>
                    <form onSubmit={(e) => { handleSubmit(e) }} >
                        <div className='my-3'>
                            <label className="uppercase font-bold text-gray-600">Nombre</label>
                            <input
                                type="text"
                                className='border bg-gray-50 w-full p-2 mt-2 rounded-md'
                                placeholder='Escribe tu nombre aqui'
                                name='nombre'
                                value={perfil.nombre || ''}
                                onChange={e => {
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className='my-3'>
                            <label className="uppercase font-bold text-gray-600">Sitio web</label>
                            <input
                                type="text"
                                className='border bg-gray-50 w-full p-2 mt-2 rounded-md'
                                placeholder='Escribe tu sitio web aqui'
                                name='web'
                                value={perfil.web || ""}
                                onChange={e => {
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className='my-3'>
                            <label className="uppercase font-bold text-gray-600">Teléfono</label>
                            <input
                                type="tel"
                                className='border bg-gray-50 w-full p-2 mt-2 rounded-md'
                                placeholder='Escribe tu telefono aqui'
                                name='telefono'
                                value={perfil.telefono || ""}
                                onChange={e => {
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className='my-3'>
                            <label className="uppercase font-bold text-gray-600">Email</label>
                            <input
                                type="email"
                                className='border bg-gray-50 w-full p-2 mt-2 rounded-md'
                                placeholder='Escribe tu email aqui'
                                name='email'
                                value={perfil.email || ''}
                                onChange={e => {
                                    setPerfil({
                                        ...perfil,
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
                            value={"Guardar cambios"}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPerfil
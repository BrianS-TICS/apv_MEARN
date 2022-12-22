import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Alerta from '../components/Alerta'
import axios from "axios"

const ConfirmarCuenta = () => {

    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})

    const params = useParams()
    const { id } = params

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `http://localhost:4000/api/veterinarios/confirmar/${id}`
                const { data } = await axios.get(url)
                setCuentaConfirmada(true)
                setAlerta({
                    msg : data.msg
                })
               
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
            setCargando(false)
        }

        confirmarCuenta()
    }, [])

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-4xl md:text-6xl'>
                    Confirma tu cuenta {""}
                    <span className='text-black'>para que comiences a administrar tus pacientes</span>
                </h1>
            </div>
            <div className='mb-10 mt-5 md:mt-0 shadow-lg py-3 md:py-10 px-5 rounded-md bg-white'>
                {!cargando && <Alerta alerta={alerta}/>}
                {cuentaConfirmada && (
                    <Link className='text-gray-800 hover:text-gray-600 text-center underline block mt-5' to='/'>
                    Iniciar sesion
                </Link>
                )}
            </div>
        </>
    )
}
export default ConfirmarCuenta

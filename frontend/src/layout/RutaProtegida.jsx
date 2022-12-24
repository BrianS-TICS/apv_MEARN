import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import SpinnerFullScreen from '../../components/SpinnerFullScreen'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const RutaProtegida = () => {

    const { auth, cargando } = useAuth()

    if (cargando) {
        return <SpinnerFullScreen />
    }

    return (
        <>
            <Header />
            {
                auth?._id && cargando == false
                    ?
                    (
                        <main className='container mx-auto'>
                            <Outlet />
                        </main>
                    )
                    : <Navigate to='/' />
            }
            <Footer />

        </>
    )
}

export default RutaProtegida
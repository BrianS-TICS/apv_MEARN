import React from 'react'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
    return (
        <>
            <h1>Desde authlayout</h1>
            <h2>Formulario</h2>
            <Outlet />
        </>
    )
}

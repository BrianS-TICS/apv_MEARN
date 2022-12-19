import React from 'react'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
    return (
        <>
            <main className='container mx-auto md:grid md:grid-cols-2 items-center pt-10 md:pt-20 gap-5 px-5'>
                <Outlet />
            </main>
        </>
    )
}

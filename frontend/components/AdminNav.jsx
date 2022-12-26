import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
    <nav className='mt-5 flex justify-center text-center items-center p-5 md:p-0  md:justify-end gap-5'>
        <Link className='font-bold uppercase text-gray-700 hover:text-gray-600' to={"/admin/perfil"}>Perfil</Link>
        <Link className='font-bold uppercase text-gray-700 hover:text-gray-600' to={"/admin/cambiar-password"}>Cambiar password</Link>
    </nav>
  )
}

export default AdminNav
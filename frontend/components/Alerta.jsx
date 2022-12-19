import React from 'react'

const Alerta = ({ alerta }) => {
    return (
        <>
            <h4
                className={
                    alerta.error ?
                        "from-red-400 to-red-600 text-white p-3 rounded-md font-bold text-center bg-gradient-to-r"
                        : "from-green-500 to-green-600 text-white p-3 rounded-md font-bold text-center bg-gradient-to-r"}
            >{alerta.msg}</h4>
        </>
    )
}

export default Alerta
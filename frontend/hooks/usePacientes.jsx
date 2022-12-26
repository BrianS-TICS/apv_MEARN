import {useContext} from 'react'
import PacientesContext from '../src/context/PacientesProvider'

const usePacientes = () => {
    return useContext(PacientesContext)
}

export default usePacientes
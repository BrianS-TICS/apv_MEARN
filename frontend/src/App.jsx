import { BrowserRouter, Routes, Route } from "react-router-dom"

// layouts
import { AuthLayout } from "./layout/AuthLayout"
import RutaProtegida from "./layout/RutaProtegida"

// Pages
import Login from "../pages/Login"
import ConfirmarCuenta from "../pages/ConfirmarCuenta"
import OlvidePassword from "../pages/OlvidePassword"
import Registrar from "../pages/Registrar"
import NuevoPassword from "../pages/NuevoPassword"
import AdministracionPacientes from "../pages/AdministracionPacientes"

// Contexts
import { AuthProvider } from "./context/AuthProvider"

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
          </Route>

          <Route path="/admin" element={<RutaProtegida />}>
            <Route index element={<AdministracionPacientes />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContexto = createContext(null)

export function ProveedorAuth({ children }) {
  const [usuario, setUsuario] = useState(null) // {nombre, email}

  // (Opcional) restaurar sesión simple desde localStorage
  useEffect(() => {
    const guardado = localStorage.getItem('usuario')
    if (guardado) setUsuario(JSON.parse(guardado))
  }, [])

  const iniciarSesion = ({ nombre, email }) => {
    const u = { nombre, email }
    setUsuario(u)
    localStorage.setItem('usuario', JSON.stringify(u))
  }

  const cerrarSesion = () => {
    setUsuario(null)
    localStorage.removeItem('usuario')
  }

  return (
    <AuthContexto.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContexto.Provider>
  )
}

export function usarAuth() {
  return useContext(AuthContexto)
}

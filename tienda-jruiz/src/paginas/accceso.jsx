import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { usarAuth } from '../contexto/contextoAuth.jsx'

export default function Acceso() {
  const { iniciarSesion } = usarAuth()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const navegar = useNavigate()
  const { state } = useLocation()

  const manejarSubmit = (e) => {
    e.preventDefault()
    if (!nombre.trim() || !email.trim()) {
      setError('Completá nombre y email.')
      return
    }
    iniciarSesion({ nombre: nombre.trim(), email: email.trim() })
    navegar(state?.desde || '/checkout', { replace: true })
  }

  return (
    <section className="caja">
      <h2>Acceso</h2>
      <form className="formulario" onSubmit={manejarSubmit}>
        <label>
          <span>Nombre</span>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label>
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        {error && <p className="panel-error" style={{marginTop:'.5rem'}}>{error}</p>}
        <button className="btn" type="submit">Ingresar</button>
      </form>
      <p className="aviso" style={{marginTop:'.5rem'}}>Acceso ficticio solo para demo.</p>
    </section>
  )
}

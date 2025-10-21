import { Link } from 'react-router-dom'

export default function NoEncontrado() {
  return (
    <section className="caja">
      <h2>Página no encontrada</h2>
      <p className="aviso">La ruta solicitada no existe.</p>
      <Link className="btn" to="/">Volver al inicio</Link>
    </section>
  )
}

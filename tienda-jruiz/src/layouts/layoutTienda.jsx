import { NavLink, Link } from 'react-router-dom'
import { usarAuth } from '../contexto/contextoAuth.jsx'

export default function LayoutTienda({ children, totalItems, totalPrecio, onVaciar }) {
  const { usuario, cerrarSesion } = usarAuth()

  return (
    <>
      <header className="barra">
        <h1 className="marca"><Link to="/" className="link-producto">Mi Tienda Simple</Link></h1>

        <nav className="nav">
          <NavLink to="/" className="nav-link">Inicio</NavLink>
          <NavLink to="/productos" className="nav-link">Productos</NavLink>
          {/* rutas dinámicas de ejemplo */}
          <NavLink to="/categoria/men's%20clothing" className="nav-link">Men</NavLink>
          <NavLink to="/categoria/jewelery" className="nav-link">Joyería</NavLink>

          <NavLink to="/carrito" className="nav-link">Carrito ({totalItems})</NavLink>
          <NavLink to="/checkout" className="nav-link">Finalizar</NavLink>
        </nav>

        <div className="resumen-carrito">
          <span>Total: ${totalPrecio.toFixed(2)}</span>
          <button className="btn btn-secundario" onClick={onVaciar} disabled={totalItems === 0}>
            Vaciar
          </button>

          {usuario ? (
            <div className="usuario">
              <span className="aviso">Hola, {usuario.nombre}</span>
              <button className="btn btn-secundario" onClick={cerrarSesion}>Salir</button>
            </div>
          ) : (
            <NavLink to="/acceso" className="nav-link">Ingresar</NavLink>
          )}
        </div>
      </header>

      <main className="principal">{children}</main>

      <footer className="pie">
        <small>© {new Date().getFullYear()} Mi Tienda Simple</small>
      </footer>
    </>
  )
}

import { Link } from 'react-router-dom'

export default function ListaProductos({ productos, onAgregar }) {
  return (
    <ul className="lista-productos">
      {productos.map((prod) => (
        <li key={prod.id} className="item-producto">
          <div className="info">
            <strong>
              <Link to={`/productos/${prod.id}`} className="link-producto">
                {prod.nombre}
              </Link>
            </strong>
            <span className="precio">${prod.precio.toFixed(2)}</span>
          </div>
          <button className="btn" onClick={() => onAgregar(prod)}>
            Agregar al carrito
          </button>
        </li>
      ))}
    </ul>
  )
}

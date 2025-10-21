import TarjetaCarga from '../componentes/tarjetaCarga.jsx'
import ListaProductos from '../componentes/listaProductos.jsx'

export default function Productos({ productos, cargando, error, onReintentar, onAgregar }) {
  return (
    <section className="caja">
      <h2>Productos</h2>

      {cargando && <TarjetaCarga texto="Cargando productos..." />}

      {error && (
        <div className="panel-error">
          <p>{error}</p>
          <button className="btn btn-secundario" onClick={onReintentar}>Reintentar</button>
        </div>
      )}

      {!cargando && !error && (
        <ListaProductos productos={productos} onAgregar={onAgregar} />
      )}
    </section>
  )
}

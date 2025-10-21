export default function Carrito({ items, onSumar, onRestar, onEliminar }) {
  return (
    <section className="caja">
      <h2>Carrito</h2>
      {items.length === 0 ? (
        <p className="aviso">Aún no hay productos en el carrito.</p>
      ) : (
        <ul className="lista-carrito">
          {items.map((item) => (
            <li key={item.id} className="item-carrito">
              <div className="info">
                <strong>{item.nombre}</strong>
                <span>Cant.: {item.cantidad}</span>
              </div>
              <div className="grupo-botones">
                <button className="btn-circulo" onClick={() => onRestar(item.id)}>-</button>
                <button className="btn-circulo" onClick={() => onSumar(item.id)}>+</button>
                <button className="btn btn-secundario" onClick={() => onEliminar(item.id)}>
                  Eliminar
                </button>
              </div>
              <span className="subtotal">
                Subtotal: ${(item.precio * item.cantidad).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

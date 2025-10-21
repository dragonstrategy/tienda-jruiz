import Carrito from '../componentes/Carrito.jsx'

export default function VerCarrito({ items, onSumar, onRestar, onEliminar }) {
  return (
    <section className="caja">
      <h2>Tu carrito</h2>
      <Carrito items={items} onSumar={onSumar} onRestar={onRestar} onEliminar={onEliminar} />
    </section>
  )
}

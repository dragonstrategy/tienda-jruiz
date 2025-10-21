import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { obtenerProductoPorId } from '../servicios/apiProductos.jsx'
import TarjetaCarga from '../componentes/tarjetaCarga.jsx'

export default function DetalleProducto({ onAgregar }) {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let vivo = true
    async function cargar() {
      try {
        setCargando(true)
        setError(null)
        const p = await obtenerProductoPorId(id)
        if (vivo) setProducto(p)
      } catch {
        if (vivo) setError('No pudimos cargar el producto.')
      } finally {
        if (vivo) setCargando(false)
      }
    }
    cargar()
    return () => { vivo = false }
  }, [id])

  if (cargando) return <section className="caja"><TarjetaCarga /></section>
  if (error) return (
    <section className="caja">
      <div className="panel-error"><p>{error}</p></div>
    </section>
  )

  return (
    <section className="caja">
      <h2>{producto.nombre}</h2>
      <p className="aviso">#{producto.id}</p>
      {producto.descripcion && <p>{producto.descripcion}</p>}
      <p><strong>Precio:</strong> ${producto.precio.toFixed(2)}</p>
      <button className="btn" onClick={() => onAgregar(producto)}>Agregar al carrito</button>
    </section>
  )
}

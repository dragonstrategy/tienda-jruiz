import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LayoutTienda from './layouts/layoutTienda.jsx'
import { obtenerProductos } from './servicios/apiProductos.jsx'
import Inicio from './paginas/inicio.jsx'
import Productos from './paginas/productos.jsx'
import DetalleProducto from './paginas/detalleProducto.jsx'
import VerCarrito from './paginas/verCarrito.jsx'
import NoEncontrado from './paginas/noEncontrado.jsx'
import Acceso from './paginas/accceso.jsx'
import Checkout from './paginas/checkout.jsx'
import Categoria from './paginas/categorias.jsx'
import RutaProtegida from './componentes/rutaProtegida.jsx'
import { ProveedorAuth } from './contexto/contextoAuth.jsx'

export default function App() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [carrito, setCarrito] = useState([])

  useEffect(() => {
    let vivo = true
    async function cargar() {
      try {
        setCargando(true)
        setError(null)
        const lista = await obtenerProductos()
        if (vivo) setProductos(lista)
      } catch (e) {
        if (vivo) setError('No pudimos cargar los productos.')
      } finally {
        if (vivo) setCargando(false)
      }
    }
    cargar()
    return () => { vivo = false }
  }, [])

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id)
      if (existe) return prev.map((p) => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p)
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }
  const sumarCantidad   = (id) => setCarrito((s) => s.map((p) => p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p))
  const restarCantidad  = (id) => setCarrito((s) => s.map((p) => p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p).filter(p => p.cantidad > 0))
  const eliminarItem    = (id) => setCarrito((s) => s.filter((p) => p.id !== id))
  const vaciarCarrito   = () => setCarrito([])

  const totalItems  = carrito.reduce((a, p) => a + p.cantidad, 0)
  const totalPrecio = carrito.reduce((a, p) => a + p.precio * p.cantidad, 0)

  const reintentarProductos = async () => {
    try {
      setCargando(true)
      setError(null)
      const lista = await obtenerProductos()
      setProductos(lista)
    } catch {
      setError('No pudimos cargar los productos.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <ProveedorAuth>
      <LayoutTienda totalItems={totalItems} totalPrecio={totalPrecio} onVaciar={vaciarCarrito}>
        <Routes>
          <Route path="/" element={<Inicio />} />

          <Route
            path="/productos"
            element={
              <Productos
                productos={productos}
                cargando={cargando}
                error={error}
                onReintentar={reintentarProductos}
                onAgregar={agregarAlCarrito}
              />
            }
          />

          {/* Rutas dinámicas */}
          <Route path="/productos/:id" element={<DetalleProducto onAgregar={agregarAlCarrito} />} />
          <Route path="/categoria/:categoria" element={<Categoria productos={productos} />} />

          {/* Carrito visible siempre */}
          <Route
            path="/carrito"
            element={
              <VerCarrito
                items={carrito}
                onSumar={sumarCantidad}
                onRestar={restarCantidad}
                onEliminar={eliminarItem}
              />
            }
          />

          {/* Acceso y ruta protegida */}
          <Route path="/acceso" element={<Acceso />} />
          <Route
            path="/checkout"
            element={
              <RutaProtegida>
                <Checkout />
              </RutaProtegida>
            }
          />

          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </LayoutTienda>
    </ProveedorAuth>
  )
}

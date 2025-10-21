const URL_API = 'https://fakestoreapi.com/products?limit=8'

export async function obtenerProductos() {
  try {
    const res = await fetch(URL_API)
    if (!res.ok) throw new Error('Error al cargar productos')
    const data = await res.json()
    return data.map((p) => ({
      id: p.id,
      nombre: p.title,
      precio: Number(p.price),
      categoria: p.category, // añadimos categoría
    }))
  } catch {
    return [
      { id: 101, nombre: 'Camiseta (respaldo)', precio: 15.99, categoria: 'ropa' },
      { id: 102, nombre: 'Pantalón (respaldo)', precio: 29.5,  categoria: 'ropa' },
      { id: 103, nombre: 'Zapatillas (respaldo)', precio: 65.0,  categoria: 'calzado' },
      { id: 104, nombre: 'Buzo (respaldo)', precio: 38.75,  categoria: 'ropa' },
    ]
  }
}

export async function obtenerProductoPorId(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    if (!res.ok) throw new Error('Error al cargar el producto')
    const p = await res.json()
    return {
      id: p.id,
      nombre: p.title,
      precio: Number(p.price),
      descripcion: p.description,
      categoria: p.category,
    }
  } catch {
    return { id, nombre: 'Producto (respaldo)', precio: 9.99, descripcion: 'Sin descripción.', categoria: 'varios' }
  }
}

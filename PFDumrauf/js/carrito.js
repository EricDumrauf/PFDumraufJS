document.addEventListener('DOMContentLoaded', () => {
    const productos = document.querySelectorAll('.producto');
    const carritoLista = document.getElementById('carrito-lista');
    const total = document.getElementById('total');
    let carrito = [];
    console.log(productos);
    
    // Agregar productos al carrito
    productos.forEach((producto, index) => {
      const agregarBoton = producto.querySelector('.add-btn');
      agregarBoton.addEventListener('click', () => {
        const nombre = producto.querySelector('h2').textContent;
        const precio = parseFloat(producto.querySelector('p').textContent.replace('Precio: $', ''));
        
        carrito.push({ nombre, precio });
        console.log(carrito);
        actualizarCarrito();
      });
    });
    
    // Actualizar el contenido del carrito
    function actualizarCarrito() {
      carritoLista.innerHTML = '';
      let precioTotal = 0;
      
      carrito.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
        carritoLista.appendChild(listItem);
        precioTotal += item.precio;
      });
      
      total.textContent = precioTotal.toFixed(2);
    }
  });
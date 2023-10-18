document.addEventListener('DOMContentLoaded', () => {
  const username = sessionStorage.getItem("username");
  const password = sessionStorage.getItem("password");
  //const btn_page_productos = document.querySelectorAll('.btn-prod');
  let elementSelector;

  if (document.querySelector('#inner-productos')) {
    elementSelector = '#inner-productos';
  }
  else if (document.querySelector('#padre-products')) {
    elementSelector = '#padre-products';
  }
  username && password && elementSelector ? llamadaProductos(elementSelector) : userLoggin(elementSelector);

  /*btn_page_productos.forEach((btn) => {
    btn.addEventListener('click', function() {
      console.log('Botón clickeado: ');
    });
  });*/

  const carrito = [];
  const carritoLista = document.getElementById('carrito-lista');
  const total = document.getElementById('total');
  const productos = document.querySelectorAll('.producto');

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

  productos.forEach((producto, index) => {
    const agregarBoton = producto.querySelector('.add-btn');
    agregarBoton.addEventListener('click', () => {
      const nombre = producto.querySelector('h2').textContent;
      const precio = parseFloat(producto.querySelector('.p-price').textContent.replace('$', ''));
      
      carrito.push({ nombre, precio });
      console.log(carrito);
      actualizarCarrito();
    });
  });
});

function userLoggin(elementSelector){
  let new_div = document.createElement("div")
  new_div.classList.add("pop-up-session")
  let pop_up_element = `
  <div class='pop-up-content card'>
      <h2>Debe iniciar sesión</h2>
      <div class="mt-3">
        <input type="text" id="user" placeholder="Usuario">
      </div>
      <div class="mt-3">
        <input type="password" id="password" placeholder="Contraseña">
      </div> 
      <div class="container text-center">
        <button class="disabled" id="btn-log">Login</button>
      </div>
  </div>
  `
  document.body.appendChild(new_div).innerHTML = pop_up_element
  const user = document.getElementById("user");
  const passw = document.getElementById("password");
  user.addEventListener("input", validarCampos);
  passw.addEventListener("input", validarCampos);
  const button_loggin = document.getElementById('btn-log');
  button_loggin.classList.add("disabled");
  button_loggin.setAttribute("disabled", true);
  
  function validarCampos() {

    user.value && passw.value
    ? (button_loggin.classList.remove("disabled"), button_loggin.removeAttribute("disabled"))
    : (button_loggin.classList.add("disabled"), button_loggin.setAttribute("disabled", true));

    button_loggin.addEventListener('click', () => {
      sessionStorage.setItem('username', user.value);
      sessionStorage.setItem('password', passw.value);
      document.querySelector('.pop-up-session').classList.add('d-none')
      llamadaProductos(elementSelector);
    })    
  }
}

function llamadaProductos(elementSelector) {
  let cantidad
  if (elementSelector == '#inner-productos'){
    cantidad = 4
    fetch('data/productos.json')
    .then((response) => response.json())
    .then((data) => {
      cargarProductos(elementSelector, data, cantidad)
    })
    .catch((error) => {
      console.log(error);
    });
  }
  else if (elementSelector == '#padre-products'){
    cantidad = false
    fetch('../data/productos.json')
    .then((response) => response.json())
    .then((data) => {
      cargarProductos(elementSelector, data, cantidad)
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

function cargarProductos(selector, productos, cantidad){
  const productos_selector = document.querySelector(selector);
  if (cantidad == false){
    cantidad = productos.length
    console.log(cantidad)
    console.log('cantidad length')
  }
  let html_content = ""
  for (let i = 0; i < cantidad && i < productos.length; i++) {
    const producto = productos[i];
    let imgSrc = cantidad == productos.length ? `../img/${producto.img}`  : `img/${producto.img}`;
    html_content += `
      <div class="card shadow producto">
        <img class="card-img" src="${imgSrc}" alt="">
        <h2>${producto.name}</h2>
        <p>${producto.description}</p>
        <p class="p-price">$${producto.price}</p>
        <button class="font-pers add-btn">Agregar al carrito</button>
      </div>
    `;
  }
  productos_selector.innerHTML = html_content
}




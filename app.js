//Creamos el array(objeto) con los productos y sus caracteristicas...
const stockProductos = [
  {
    id: 1,
    nombre: "Crash Bandicoot",
    cantidad: 1,
    desc: "Juego plataformero, niveles dificiles",
    precio: 1200,
    img: "img/Crash.jpg",
  },
  {
    id: 2,
    nombre: "Mortal Kombat X",
    cantidad: 1,
    desc: "Luchas con los mejores graficos",
    precio: 1500,
    img: "img/mortal.jpg",
  },
  {
    id: 3,
    nombre: "Pac Man",
    cantidad: 1,
    desc: "Juego plataformero, niveles basicos",
    precio: 1570,
    img: "img/pacman.jpg",
  },
  {
    id: 4,
    nombre: "Dragon Ball Xenoverse",
    cantidad: 1,
    desc: "Vive la experiencia dragon ball",
    precio: 1000,
    img: "img/dragonball.jpg",
  },
  {
    id: 5,
    nombre: "Naruto Ninja Storm 4",
    cantidad: 1,
    desc: "La historia de Naruto",
    precio: 1200,
    img: "img/naruto.jpg",
  },
  {
    id: 6,
    nombre: "Shingeki Final Attack",
    cantidad: 1,
    desc: "Eren Jeager vuelve en formato gamer...",
    precio: 1200,
    img: "img/shingeki.jpg",
  },
  {
    id: 7,
    nombre: "League of Legends",
    cantidad: 1,
    desc: "No compres esto por tu bien",
    precio: 1400,
    img: "img/league.jpg",
  },
  {
    id: 8,
    nombre: "Call Of Duty Warzone",
    cantidad: 1,
    desc: "Dispara como nunca",
    precio: 1200,
    img: "img/callduty.jpg",
  },
  {
    id: 9,
    nombre: "Fifa 2019",
    cantidad: 1,
    desc: "Juego de futbol",
    precio: 1400,
    img: "img/fifa.jpg",
  },
  {
    id: 10,
    nombre: "Fornite",
    cantidad: 1,
    desc: "Battle Royale",
    precio: 1200,
    img: "img/fornite.jpg",
  },
];
let carrito = [] // Array para guardar elementos agregados al carrito...

//Pasando elementos HTML a JS, para manipularlos...
const contenedor = document.querySelector("#contenedor") //Traemos el contenedor del html....
const carritoContenedor = document.querySelector("#carritoContenedor") //Cuerpo del carrito (Modal)
const clearCart = document.querySelector("#vaciarCarrito") ////Object from where index.html - boton vaciar...
const precioTotal = document.querySelector("#precioTotal")  //Precio total en carrito index.html
const procesarCompra = document.querySelector("#procesarCompra") //Object from where index.html, (boton "Continuar compra")
const activarFuncion = document.querySelector("#activarFuncion") //Object from where compras.html
const totalProceso = document.querySelector("#totalProceso"); //Object from where compras.html
const formulario = document.querySelector("#procesar-pago") //Object from where compras.html

if (activarFuncion) { //Validamos en que documento nos encontramos...y que su funcion concuerde con el html
  activarFuncion.addEventListener("click", procesarPedido) //Onclick al boton "click" en compras.html, para pintar items en carrito...
}

if (formulario) {
  formulario.addEventListener("submit", enviarPedido) //Funcion que se ejecuta cuando se envia el formulario
}

document.addEventListener("DOMContentLoaded", () => { //Funcion que se ejecuta cuando se carga el documento
  carrito = JSON.parse(localStorage.getItem("carrito")) || [] // encargada de almacenar los datos "carrito", en el local...

  showElementsCart()//Actualiza el carrito cada vez que se actualiza,modifica o elimina un item...

  if (activarFuncion) { //Validamos en que documento nos encontramos...
    document.querySelector("#activarFuncion").click(procesarPedido); ////Object from where compras.html , le hace click cada ves que el documento carga...
  }
});

if (clearCart) { //Validamos en que documento nos encontramos...
  //Funcion anonima para vaciar el carrito...
  clearCart.addEventListener("click", () => {
    carrito = [] // Cuando le den click el carrito se le asigna un valor vacio...
    showElementsCart(); //Cada vez que se agregue o elimine un item al llamar esta funcion "pinta" o actuliza los items
  })
}

if (procesarCompra) { //Validamos en que documento nos encontramos...
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) { //Si el carrito esta vacio muestra esta alerta(modal) insertada con bootstrap...
      Swal.fire({ //Alerta de error
        title: "Tu carrito esta vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar"
      })
    } else {
      location.href = "compra.html"
    }
  })
}

//Con el metodo forEach extraemos los datos del arreglo de manera individual, para posteriormente imprimirlos en el html del "contenedor"...
stockProductos.forEach(prod => { //Esta funcion se ejecuta sin ser llamada...es decir, cuando carga el document...
  const { id, nombre, precio, desc, img, cantidad } = prod  //Manera practica de extraer los datos que necesitamos del arreglo...(desestructuracion)

  if (contenedor) { //Si contenedor existe, osea si estamos en su html, le insertamos los datos a mostrar....
    //card traida de bootstrap...con el operador += le vamos insetando cada item en cada iteracion...
    contenedor.innerHTML += `
    <div class="card" style="width: 18rem;">
  <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">Precio: ${precio}</p>
    <p class="card-text">Descripción: ${desc}</p>
    <p class="card-text">Cantidad: ${cantidad}</p>
    <a class="btn btn-primary" onclick="addProduct(${id})">Agregar al carrito</a>
  </div>
</div>
    `
    //Se agrega onclick "Agregar carrito" para ejecutar funcion agregarProducto(), enviando como parametro su id correspondiente...
  }
})

function addProduct(idEntrance) { //Funcion para agregar los elementos al carrito,Recibe como parametro el "id" anterior...

  //Comprobamos si un item ya esta agregado para aumentarle solo la cantidad y no lo duplique...
  const alreadyExists = carrito.some(item => item.id === idEntrance) //El metodo some busca y retorna si un item existe o no...

  if (alreadyExists) { //SI esta agregadp en el array "carrito":
    const prod = carrito.map(item => { //Mapeamos el array "carrito", para transformar un nuevo valor "cantidad"
      if (item.id === idEntrance) { //Relacionamos los ids
        item.cantidad++ //Le incrementamos la cantidad...
      }
    })
  } else { //SINO esta almacenado en el array "carrito"
    const item = stockProductos.find(prod => prod.id === idEntrance) //Metodo find busca SI el id empareja...Extrae todo el objeto...
    carrito.push(item) // Si coinciden los Ids, se le agrega el "item" al carrito, que en si, inserta TODO los datos correspondientes al id...
    console.log("Items en el carrito: ", carrito) //Imprimiendo los elementos que contenga el array "carrito, asi este vacio"
    console.log("Item agregado: ", item) //Imprimiendo el item(COMPLETO), que haya sido agregado...
  }
  showElementsCart() // Cada vez que se agregue un item, lo guarda en el arreglo "carrito", para posteriormente imprimirlo...
}

const showElementsCart = () => { // Funcion para "Pintar" los items en el modal del carrito...
  const modalBody = document.querySelector(".modal .modal-body"); //Donde insertaremos los item al carrito (Modal)
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log("aqui insertaremos los items: ", modalBody);
      modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="deleteProduct(${id})">Eliminar producto</button>
          </div>
        </div>
        `
      //Se agrega funcion deleteProduct al boton al hacer click...
    })
  }

  if (carrito.length === 0) {
    console.log("Ningun elemento en el carrito...");
    modalBody.innerHTML = `<p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>`
  } else {
    console.log("Hay elementos en el 'carrito'...");
  }

  carritoContenedor.textContent = carrito.length; //Aqui cambia el numero de elementos añadidos...

  if (precioTotal) { //Funcion para realizar el calculo del precio total...
    precioTotal.innerText = carrito.reduce( //El metodo reduce toma todos los valores de un array los reduce a uno...
      (acumulador, item) => acumulador + item.cantidad * item.precio,
      0)
  }
  saveStorage(); //llamado a la funcion que almacena los datos en cache....
}

function deleteProduct(idEntrance) { //Funcion para eliminar item, que recibe el parametro "id", enviado desde el boton "Eliminar producto"
  console.log("Eliminando item: ", idEntrance)
  const itemID = idEntrance
  console.log("Elemento con ID a eliminar: ", itemID)
  carrito = carrito.filter((item) => item.id !== itemID) // Con el metodo filter le estamos diciendo que me retorne los items que sean diferente a "itemID"
  console.log("Carrito actualizado: ", carrito)
  showElementsCart(); //Cada vez que se agregue o elimine un item al llamar esta funcion "pinta" o actuliza los items
}

function saveStorage() { // Funcion para almacenar los datos en el localhost, y no se pierdan en el recargo de la pagina...
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

function procesarPedido() {
  console.log("Se ejecuto procesarPedido")
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce( //Aqui se imprime el total a pagar los item en carrito...
    (acum, prod) => acum + prod.cantidad * prod.precio,
    0
  );

}

function enviarPedido(e) { //Recibe el evento del form, lo cancelamos con prevent...
  e.preventDefault() // Para cancelar el recargo de la pagina al enviar el formulario...
  console.log("Se ejecuto enviarPedido...")
  const cliente = document.querySelector("#cliente").value
  const correo = document.querySelector("#correo").value

  if (correo == "" || cliente == "") {
    Swal.fire({ //Alerta de error
      title: "Debes completar tu email y nombre!",
      text: "Rellena el formulario",
      icon: "error",
      confirmButtonText: "Aceptar"
    })
  } else {
    console.log(`Bienvenido ${cliente}, gracias por su compra!`)

    const spinner = document.querySelector("#spinner")

    //Cuando realiza la compra muestra el spinner
    spinner.classList.add("d-flex") //Se agrega display flex....
    spinner.classList.remove("d-none") //Se le quita display none...

    //Con esta funcion elimina el spinner y resetea el form...
    setTimeout(() => {
      spinner.classList.remove("d-flex")
      spinner.classList.add("d-none")
      formulario.reset()
    }, 3000)

    const alertExito = document.createElement("p")
    alertExito.classList.add("alert", "alerta", "d-block", "text-center", "col-md-12", "mt-2", "alert-success") //Clases de bootstrap
    alertExito.textContent = "Compra realizada correctamente"
    formulario.appendChild(alertExito)

    setTimeout(() => { // Para que pasados 3seg, elimine "alertExito"
      alertExito.remove()
    }, 3000)

  } //Fin else
} //Fin function

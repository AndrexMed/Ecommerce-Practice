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

const contenedor = document.querySelector("#contenedor") //Traemos el contenedor del html....
const carritoContenedor = document.querySelector("#carritoContenedor")
const clearCart = document.querySelector("#vaciarCarrito") //Llamado al boton "vaciarCarrito"

//Funcion que se ejecuta cuando se carga el documento, encargada de almacenar los datos en el local...
document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || []
  showElementsCart()//Cada vez que se agregue o elimine un item al llamar esta funcion "pinta" o actuliza los items
})

//Con el metodo forEach extraemos los datos del arreglo de manera individual, para posteriormente imprimirlos en el html del "contenedor"...
stockProductos.forEach(prod => {
    const { id, nombre, precio, desc, img, cantidad } = prod  //Manera practica de extraer los datos que necesitamos del arreglo...(desestructuracion)

    //card traida de bootstrap...
    contenedor.innerHTML += `
    <div class="card" style="width: 18rem;">
  <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">Precio: ${precio}</p>
    <p class="card-text">Descripción: ${desc}</p>
    <p class="card-text">Cantidad: ${cantidad}</p>
    <a class="btn btn-primary" onclick="agregarProducto(${id})">Agregar al carrito</a>
  </div>
</div>
    `
    //Se agrega onclick "Agregar carrito" para ejecutar funcion agregarProducto(), enviando como parametro su id correspondiente...
})

//Funcion anonima para vaciar el carrito...
clearCart.addEventListener("click", () => {
  carrito = [] // Cuando le den click el carrito se le asigna un valor vacio...
  showElementsCart(); //Cada vez que se agregue o elimine un item al llamar esta funcion "pinta" o actuliza los items
})

let carrito = [] // Array para guardar elementos agregados al carrito...

function agregarProducto(idEntrante) { //Funcion para agregar los elementos al carrito,Recibe como parametro el "id" anterior...
    const item = stockProductos.find(prod => prod.id === idEntrante) //Metodo find busca SI el id empareja...Extrae todo el objeto...
    carrito.push(item) // Si coinciden los Ids, se le agrega el "item" al carrito, que en si, inserta TODO los datos correspondientes al id...
    console.log("Items en el carrito: ", carrito) //Imprimiendo los elementos que contenga el array "carrito, asi este vacio"
    console.log("Item agregado: ", item) //Imprimiendo el item(COMPLETO), que haya sido agregado...
    showElementsCart() // Cada vez que se agregue un item, lo guarda en el arreglo "carrito", para posteriormente imprimirlo...
}

const showElementsCart = () => { // Funcion para "Pintar" los items en el modal del carrito...
    const modalBody = document.querySelector(".modal .modal-body"); //Donde insertaremos los item al carrito (Modal)
    if (modalBody) {
      modalBody.innerHTML = "";
      carrito.forEach((prod) => {
        const { id, nombre, precio, desc, img, cantidad } = prod;
        console.log("aqui insertaremos los items: ",modalBody);
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
      })
    }
  
    if (carrito.length === 0) {
      console.log("Ningun elemento en el carrito...");
      modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
      `;
    } else {
      console.log("Algo se añadio...");
    }
    carritoContenedor.textContent = carrito.length; //Aqui cambia el numero de elementos añadidos...
  
    if (precioTotal) {
      precioTotal.innerText = carrito.reduce( //El metodo reduce toma todos los valores de un array los reduce a 1...
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
      );
    }
    saveStorage(); //llamado a la funcion que almacena los datos en cache....
  };

function deleteProduct(idEntrance) { //Funcion para eliminar item, que recibe el parametro "id", enviado desde el boton "Eliminar producto"
    console.log("Eliminando item: ", idEntrance)
    const itemID = idEntrance
    console.log("Elemento con ID a eliminar: ", itemID)
    carrito = carrito.filter((item) => item.id !== itemID) // Con el metodo filter le estamos diciendo que me retorne los items que sean diferente a "itemID"
    console.log("Carrito actualizado: ", carrito)
    showElementsCart(); //Cada vez que se agregue o elimine un item al llamar esta funcion "pinta" o actuliza los items
}

function saveStorage(){ // Funcion para almacenar los datos en el localhost, y no se pierdan en el recargo de la pagina...
  localStorage.setItem("carrito", JSON.stringify(carrito))
}


//Creamos el array con los productos y sus caracteristicas...
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

//Con el metodo forEach extraemos los datos del arreglo de manera individual, para posteriormente imprimirlos en el html del "contenedor"...
stockProductos.forEach(prod => {
    const {id,nombre,precio,desc,img,cantidad} = prod  //Manera practica de extraer los datos que necesitamos del arreglo...

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
})

function agregarProducto(id){ //Recibe como parametro el "id" anterior...
    console.log(id)
}
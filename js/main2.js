const section = document.querySelector(".section-productos");
const navCarrito = document.querySelector(".carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productos = [
    {
        art: 0001,
     nombre: "SOMBRERO",
     importe: 1500
    },
     {
         art: 0002,
        nombre: "ANTEOJOS DE SOL",
        importe: 2000
     },
     {
        art: 0003,
        nombre: "AROS",
        importe: 700
     },
     {
        art: 0004,
        nombre: "COLLAR",
        importe: 1200
     },
     {
        art: 0005,
        nombre: "PULSERA",
        importe: 1200
     },
     {
        art: 0006,
        nombre: "CINTURON",
        importe: 2000
     },
     {
        art: 0006,
        nombre: "CINTURON",
        importe: 2000,
     },
     {
    
        art: 0007,
        nombre: "LLAVERO",
        importe: 900,
     },
     {
        art: 0012,
        nombre: "CARTERA",
        importe: 3000
     },
     {
        art: 0013,
        nombre: "BILLETERA",
        importe: 1200
     },
     {
        art: 0010,
        nombre: "MOCHILA",
        importe: 3100
     },
        {
            art: 0011,
            nombre: "ACC. DE PELO",
            importe: 500
        }

]

function cards(){
    productos.forEach((prod) => {
        section.innerHTML += `<div>
                              <h3>${prod.nombre}</h3>
                              <p>$${prod.importe}</p>
                              <button id="btn-agregar${prod.art}">Agregar</button>
                             </div>`
    })
    buttonFn();
}

function buttonFn(){
    productos.forEach((prod) => {
        document.querySelector(`#btn-agregar${prod.art}`).addEventListener("click", ()=>{
            addCarrito(prod);
        })
    })
}

function addCarrito(prod){
    let exist = carrito.some((prodSome) => prodSome.art === prod.art);
    if(exist === false){
        prod.cantidad = 1;
        carrito.push(prod);
    }else{
        let find = carrito.find((prodFind) => prodFind.art === prod.art);
        find.cantidad++ 
    }
    renderCarrito()
}



function renderCarrito(){
    navCarrito.innerHTML = "";
    pay();
    carrito.forEach((prod) => {
        navCarrito.innerHTML += `<div style = "background-color: pink">
                                 <h3>${prod.nombre}</h3>
                                 <p>$${prod.importe}</p>
                                 <p>Cantidad: ${prod.cantidad}</p>
                                 <button class="btnCarrito" id="btn-borrar${prod.art}">Borrar</button>
                                </div>`
    })
    localStorage.setItem("carrito", JSON.stringify(carrito));
    deleteProd();
}

function deleteProd(){
    carrito.forEach((prod) => {
        document.querySelector(`#btn-borrar${prod.art}`).addEventListener("click", ()=>{
            carrito = carrito.filter(prodFilter => prodFilter.art !== prod.art);
            renderCarrito();
        })
    })
}

function pay(){
    let total = carrito.reduce((acc, prod) => acc + prod.importe, 0);
    navCarrito.innerHTML += `<h1>Total: $${total}</h1>`;

    let addProd = carrito.some((prodSome) => prodSome.importe === producto.importe);
    if(addProd === false){
        prod.cantidad = 1;
        carrito.push(prod);
        return cantidad;
    }else{
        let sumarProd = carrito.find((prodFind) => prodFind.importe === producto.importe);
         sumarProd.importe * prod.cantidad;
    }
}

cards();
renderCarrito();
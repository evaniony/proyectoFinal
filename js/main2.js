const section = document.querySelector(".section-productos");
const navCarrito = document.querySelector(".carrito");
let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const contenido = async () =>{
    await fetch("js/productos.json")
    .then((response) => response.json())
    .then((data) => {
        productos = data;
        cards();
    })
    //.catch((error) => "aun no esta definido")
}
contenido();

function cards(){
    productos.forEach((prod) => {
        section.innerHTML += `<div class="card">
                              <img class="images" src="${prod.img}">
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
            Toastify({
                text: "Agregaste un producto!",
                duration: 2000,
                gravity: 'top',
                position: 'right',
                style: {
                    background: 'green'
                }
            }).showToast();
        })
    })
}



function addCarrito(prod){
    let exist = carrito.some((prodSome) => prodSome.art === prod.art);
    if(exist === false){
        prod.cantidad = 1;
        carrito.push(prod)
    }else{
        let find = carrito.find((prodFind) => prodFind.art === prod.art);
        find.cantidad++
    }
    renderCarrito()
}



function renderCarrito(){
    navCarrito.innerHTML = "";
    pay()
    carrito.forEach((prod) => {
        navCarrito.innerHTML += `<div style = "background-color: red">
                                 <img class="images aside" src="${prod.img}">
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
    //debugger
    carrito.forEach((prod) => {
        document.querySelector(`#btn-borrar${prod.art}`).addEventListener("click", ()=>{
            carrito = carrito.filter(item => item.cantidad !== 1);
            if(prod.cantidad > 1){
                prod.cantidad--
            }
            Toastify({
                text: "Eliminaste un producto!",
                duration: 2000,
                gravity: 'top',
                position: 'left',
                style: {
                    background: 'red'
                }
            }).showToast();
            renderCarrito();
            
        })
    })
}

function pay(){
    let total = carrito.reduce((acc, prod) => acc + (prod.importe * prod.cantidad), 0);
    navCarrito.innerHTML += `<h1>Total: $${total}</h1>`;
}


cards();
renderCarrito();


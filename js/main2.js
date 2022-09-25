const section = document.querySelector(".section-productos");
const navCarrito = document.querySelector(".carrito");
const carritoTotal = document.querySelector(".total-carrito")
const form = document.querySelector(".form-buy");
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
        section.innerHTML += `<div class="card rounded-md p-3 grid justify-items ...">
                              <img class="images" src="${prod.img}">
                              <h3>${prod.nombre}</h3>
                              <p>$${prod.importe}</p>
                              <button id="btn-agregar${prod.art}"><i class="fa-solid fa-cart-shopping"></i></button>
                             </div>`
    })
    buttonFn();
}

function buttonFn(){
    productos.forEach((prod) => {
        document.querySelector(`#btn-agregar${prod.art}`).addEventListener("click", ()=>{
            addCarrito(prod);
            mostrar();
            Toastify({
                text: "Agregaste un producto!",
                duration: 2000,
                gravity: 'top',
                position: 'right',
                style: {
                    background: 'black',
                    color: 'white'
                }
            }).showToast();
        })
    })
}

function minus(){
    document.querySelector(".img-closed").addEventListener("click", ()=>{
        ocultar();
    })
}

function ocultar() {
    document.querySelector(".carrito").style.display = "none";
}

 function mostrar(){
    document.querySelector(".carrito").style.display = "block";
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
    navCarrito.innerHTML = ""
    pay()
    carrito.forEach((prod) => {
        navCarrito.innerHTML += `<div class="card-in">
                                 <img class="images-aside" src="${prod.img}">
                                 <h3>${prod.nombre}</h3>
                                 <p>$${prod.importe}</p>
                                 <p>Cantidad: ${prod.cantidad}</p>
                                 <button class="btnCarrito" id="btn-borrar${prod.art}">delete</button>
                                </div>`
    })
    getBuy();
    if (carrito == 0){ ocultar();}
    localStorage.setItem("carrito", JSON.stringify(carrito));
    deleteProd();
    minus();
    clickBtn();

}

function getBuy(){
    let btn = document.createElement("button");
    btn.className = "btn-buy";
    btn.innerText = "REALIZAR COMPRA";
    navCarrito.append(btn);
    
}

function clickBtn(){
    document.querySelector(".btn-buy").addEventListener("click", ()=>{
        formBtn(),
        mostrarForm()
    })
}

function formBtn(){;
    form.innerHTML = `<h2>Completa el siguiente formulario para continuar tu compra.</h2>
                      <p>Una vez realizado el pago, enviaremos tus productos. De lo contrario, la compra se cancela.</p>
                      <input type="text" value="John Doe">
                      <input type="email" value="johnDoe@example.com">
                      <p>Recibirás un mail para efectuar tu compra.</p>
                      <button class="btn-form">COMPRAR</button>`
    ocultarForm();
    finishBuy();
}

function ocultarForm() {
    document.querySelector(".form-buy").style.display = "none";
}

 function mostrarForm(){
    document.querySelector(".form-buy").style.display = "block";
}

function finishBuy(){
    document.querySelector(".btn-form").addEventListener("click", ()=>{
        Swal.fire(
            'COMPRA EXITOSA!',
            'Muchas gracias!',
            'success',
          )
          ocultar();
          ocultarForm();
          carrito = [];
          navCarrito.innerHTML = "";
    })
}

function deleteProd(){
    //debugger
    carrito.forEach((prod) => {
        document.querySelector(`#btn-borrar${prod.art}`).addEventListener("click", ()=>{
            carrito = carrito.filter(item => item.cantidad !== 1);
            if(prod.cantidad > 1){
                prod.cantidad--
            }
            renderCarrito();
        })
    })
}

function pay(){
    let total = carrito.reduce((acc, prod) => acc + (prod.importe * prod.cantidad), 0);
    navCarrito.innerHTML = `<img class="img-closed"src="./svg/minus.svg">
                            <h1 class= "total">Total: $${total}</h1>`;
        document.querySelector(".img-closed").addEventListener("click", ()=>{
        if (carrito == 0){
            ocultar();
        }
    })
    if(carrito == 0){
        Toastify({
            text: "Tu carrito está vacío!",
            duration: 2000,
            gravity: 'top',
            position: 'right',
            style: {
                background: 'white',
                color: 'black'
            }
        }).showToast();
    }
}

function agregando(){
    document.querySelector(".total-carrito").addEventListener("click", ()=>{
        mostrar();
    })
}

/* function buttonFinish(){
    let btn = document.querySelector(".carrito");
    btn.innerHTML = `<button class="btn-finish">Realizar compra</button>`
    
} */

cards();
renderCarrito();
agregando();
minus();
formBtn();

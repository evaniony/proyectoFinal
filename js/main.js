let carrito = []
let tienda = []

class Producto{
    constructor(art, nombre, importe){
        this.art = art;
        this.nombre = nombre;
        this.importe = importe;
    }
}


function stock(){
tienda.push(new Producto(0001, "SOMBRERO", 1500));
tienda.push(new Producto(0002, "ANTEOJOS DE SOL", 2000));
tienda.push(new Producto(0003, "AROS", 700));
tienda.push(new Producto(0004, "COLLAR", 1200));
tienda.push(new Producto(0005, "PULSERA", 1200));
tienda.push(new Producto(0006, "CINTURON", 2000));
tienda.push(new Producto(0007, "LLAVERO", 900));
tienda.push(new Producto(0012, "CARTERA", 3000));
tienda.push(new Producto(0013, "BILLETERA", 1200));
tienda.push(new Producto(0010, "MOCHILA", 3100));
tienda.push(new Producto(0011, "ACC. DE PELO", 500));
}
stock();

alert("Tienda de accesorios");

function agregarProducto(){
    alert("Contamos con el siguiente stock:\n-SOMBRERO A $1500.-\n-ANTEOJOS DE SOL A $2000.-\n-AROS A $700.-\n-COLLAR A $1200.-\n-PULSERA A $1200.-\n-CINTURON A $2000.-\n-LLAVERO A $900.-\n-CARTERA A $3000.-\n-BILLETERA A $1200.-\n-MOCHILA A $3100.-\n-ACC. DE PELO A $500.-")
    let descripcion = prompt("Escribe el nombre del producto: ").toUpperCase();
    let buscar = tienda.find((prod) => prod.nombre === descripcion);
    carrito.push(buscar);
}
agregarProducto();

/* function confirm(){
 if (buscar == stock())
    alert("Elegiste " + buscar);
} */
function finalizarCompra(){
        let total = carrito.reduce((acc, producto) => acc + producto.importe, 0);
        console.log("El total es: ", total, " GRACIAS POR TU COMPRA!");
}

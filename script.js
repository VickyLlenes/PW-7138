const shopcontent = document.getElementById("shopcontent");
shopcontent.classList.add("shopcontent");
const verCarrito = document.getElementById("vercarrito")
const modalContainer= document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("cantidadCarrito")

let carrito = [];

const inicializarCarrito = () => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        carritoCounter();
    }
};

window.onload = inicializarCarrito;

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className="card";
    content.innerHTML = `
        <img src="${product.img}" >
        <h3>${product.nombre}</h3>
        <p class="price" >${product.precio}$</p>
    `;

    let boton = document.createElement("button");
    boton.innerText= "Agregar al carrito";
    boton.className= "boton";

    content.append(boton);

    shopcontent.append(content);

    boton.addEventListener("click", ()=>{

        const repeat = carrito.some((repeatProduct)=> repeatProduct.id === product.id)
        if (repeat){
            carrito.map((prod) => {
                if (prod.id===product.id){
                    prod.cantidad++;
                }
            })
        }else{
            carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad,
            });
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        carritoCounter();
    });
});

verCarrito.className= "carrito"
const pintarCarrito= ()=> {
    modalContainer.innerHTML="";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className="modal-header"
    modalHeader.innerHTML = `
        <h1 class="modal-header-title"> Carrito:</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerHTML = `
    <span class="material-symbols-outlined">close</span>
    `;
    modalbutton.className= "modal-header-button";

    modalbutton.addEventListener("click", () =>{
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton)

    carrito.forEach((product) =>{
       let carritoContent= document.createElement("div");
        carritoContent.className="modal-content"
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio}$</p>
            <h2 class="botonSumar">+</h2>
            <p>Cantidad: </p>
            <p class="cantidad">  ${product.cantidad}</p>
            <h2 class="botonRestar">-</h2>
            <p> Total: ${product.cantidad*product.precio}</p>
           

        `; 
        modalContainer.append(carritoContent)

        let eliminar = document.createElement("span");
        eliminar.innerHTML= `
        <span class="material-symbols-outlined">close</span>`;
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", ()=>{
            eliminarProducto(product.id);
        });

        const botonesSumar = carritoContent.querySelectorAll(".botonSumar");
        botonesSumar.forEach((boton)=>{
            boton.addEventListener("click", () => {
                sumarCantidad(product.id);
            });
        });

        const botonesRestar = carritoContent.querySelectorAll(".botonRestar");
        botonesRestar.forEach((boton)=>{
            boton.addEventListener("click", () => {
                restarCantidad(product.id);
            });
        });
    });

    const total= carrito.reduce((acc,producto)=> acc + producto.precio*producto.cantidad, 0);

    const totalbuy = document.createElement("div");
    totalbuy.className = "totalBuy";
    totalbuy.innerHTML = `Total a pagar: ${total}$`;
    modalContainer.append(totalbuy)
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) =>{
    carrito = carrito.filter((product)=> product.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    carritoCounter();
    pintarCarrito();
};

const sumarCantidad = (id) =>{
    carrito.forEach((product)=>{
        if (product.id === id){
            product.cantidad++;
        }
    });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    carritoCounter();
    pintarCarrito();
};

const restarCantidad = (id) =>{
    carrito.forEach((product, index)=>{
        if (product.id === id){
            if (product.cantidad === 1) {
                carrito.splice(index, 1);
            } else {
                product.cantidad--;
            }
        }
    });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    carritoCounter();
    pintarCarrito();
};

const carritoCounter = ()=> {
    cantidadCarrito.style.display="block";
    cantidadCarrito.innerText = carrito.length;
};

modalContainer.style.right = "-550px";
verCarrito.onclick = function(){
    if(modalContainer.style.right == "-550px"){
        modalContainer.style.right = "0"
    }
    else{
        modalContainer.style.right = "-550px"
    }
};

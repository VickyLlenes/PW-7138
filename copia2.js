const shopcontent = document.getElementById("shopcontent");
shopcontent.classList.add("shopcontent");
const verCarrito = document.getElementById("vercarrito")
const modalContainer= document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("cantidadCarrito")



let carrito = [];

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
        console.log(carrito);
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
            <p> Cantidad: ${product.cantidad}</p>
            <p> Total: ${product.cantidad*product.precio}</p>

        `; 
        modalContainer.append(carritoContent)

        let eliminar = document.createElement("span");
        eliminar.innerHTML= `
        <span class="material-symbols-outlined">close</span>`;
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);
    })
    const total= carrito.reduce((acc,producto)=> acc + producto.precio*producto.cantidad, 0);

    const totalbuy = document.createElement("div");
    totalbuy.className = "totalBuy";
    totalbuy.innerHTML = `Total a pagar: ${total}$`;
    modalContainer.append(totalbuy)
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () =>{
    const foundId = carrito.find((element)=> element.id);

    carrito = carrito.filter((carritoId)=>{
        return carritoId !== foundId
    })
    carritoCounter();
    pintarCarrito();
    
};

const carritoCounter = ()=> {
    cantidadCarrito.style.display="block";
    cantidadCarrito.innerText = carrito.length;
}

modalContainer.style.right = "-550px"
verCarrito.onclick = function(){
    if(modalContainer.style.right == "-550px"){
        modalContainer.style.right = "0"
    }
    else{
        modalContainer.style.right = "-550px"
    }
}
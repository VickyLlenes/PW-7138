
let boton = document.getElementById("boton");
let listasboton = document.getElementById("listasboton");

boton.addEventListener("click", function(){
    listasboton.classList.toggle("list");
});

let element = document.querySelectorAll(".lista");
let contador= 0
element.forEach(function(elemento) {

    elemento.addEventListener("click", function() {
        contador++;
        console.log("Contador:",contador)
        document.getElementById("contador").innerHTML= contador;
        elemento.style.color="red" 
    });
    
});





function validateForm(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let errorMessage = "";

    if (name === "" || email === "" || message === "") {
        errorMessage += "Por favor, complete todos los campos. \n";
    }
    if ((name.length)>20||email.length>20||message.length>20){
        errorMessage += "Los campos no deben exceder los 20 caracteres. \n";
    }
    if (name.length<10||email.length<10||message.length<10){
        errorMessage += "Los campos deben exceder los 10 caracteres. \n";
    }
    if (errorMessage !== "") {
        document.getElementById("errorMessages").innerHTML = errorMessage;

    }
    
}

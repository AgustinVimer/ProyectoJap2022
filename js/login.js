let usuario = {};
let listaUsuarios = [];

function crearObjeto() {
    let email = localStorage.getItem("loginUsuario");
    usuario.pNombre = "";
    usuario.sNombre = "";
    usuario.pApellido = "";
    usuario.sApellido = "";
    usuario.email = email;
    usuario.telefono = "";

    if(!yaExiste(email, listaUsuarios)){
        listaUsuarios.push(usuario);
        localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
    }
        
}

function yaExiste(email, listaUsuarios){
    let yaExiste = false;

    for(let i=0; i<listaUsuarios.length; i++){
        let usuario = listaUsuarios[i];
        if(usuario.email === email){
            yaExiste = true;
        }
    }

    return yaExiste;
}


document.getElementById("iniciarSesion").addEventListener("click", function () {

    let usuario = document.getElementById("loginUsuario").value;
    let contrasena = document.getElementById("loginContraseña").value;
    if(localStorage.getItem("listaUsuarios")){
        listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios")); 
    }

    if (usuario == "" || contrasena == "") {
        alert("Debes completar los campos de usuario y contraseña")
    } else {
        localStorage.setItem("loginUsuario", usuario);
        crearObjeto();
        window.location.href = "portada.html";
    }

});


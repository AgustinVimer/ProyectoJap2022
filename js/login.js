
document.getElementById("iniciarSesion").addEventListener("click", function () {

    let usuario = document.getElementById("loginUsuario").value;
    let contrasena = document.getElementById("loginContraseña").value;

    if (usuario == "" || contrasena == "") {

        alert("Debes completar los campos de usuario y contraseña")
    }

    else {localStorage.setItem("loginUsuario", usuario);
         window.location.href = "portada.html" }


});


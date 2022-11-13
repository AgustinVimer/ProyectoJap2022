let listaUsuarios = [];
let usuarioActual = {};
let index;

function mostrarPerfil() {

  let contenido = `<div>
                <h2>Perfil</h2>
              </div>
              <div>
                <br>
                <div class="row g-3">
                  <div class="col">
                    <label for="PNombre" class="form-label">Primer nombre (*)</label>
                    <div class="form-group input-group has-validation">
                      <input id="PNombre" type="text" class="form-control" required>
                    </div>
                  </div>
                  <div class="col">
                    <label for="SNombre" class="form-label">Segundo nombre</label>
                    <div class="form-group input-group">
                      <input id="SNombre" type="text" class="form-control" >
                    </div>
                  </div>
                </div>
                <br>
                <div class="row g-3">
                  <div class="col">
                    <label for="PApellido" class="form-label">Primer Apellido (*)</label>
                    <div class="form-group input-group has-validation">
                      <input id="PApellido" type="text" class="form-control" required>
                    </div>
                  </div>
                  <div class="col">
                    <label for="SApellido" class="form-label">Segundo Apellido</label>
                    <div class="form-group input-group ">
                      <input id="SApellido" type="text" class="form-control" > 
                    </div>
                  </div>
                </div>
                <br>
                <div class="row g-3">
                  <div class="col">
                    <label for="Email" class="form-label">E-mail (*)</label>
                    <div class="form-group input-group has-validation">
                      <input id="Email" type="email" class="form-control" required>
                    </div>
                  </div>
                  <div class="col">
                    <label for="Telefono" class="form-label">Teléfono de contacto (*)</label>
                    <div class="form-group input-group has-validation">
                      <input id="Telefono" type="text" class="form-control" required>
                    </div>
                  </div>
                </div>
                <br>
              </div>
              <br>
              <input class="btn btn-primary needs-validations" id="botonGC" type="button" value="Guardar cambios">`

  document.getElementById("perfilTodo").innerHTML = contenido
}


function mostrarInfo() {

  for (let i = 0; i < listaUsuarios.length; i++) {
    let usuario = listaUsuarios[i]
    if (usuario.email === localStorage.getItem("loginUsuario")) {
      index = i;
      document.getElementById("PNombre").value = usuario.pNombre;
      document.getElementById("SNombre").value = usuario.sNombre;
      document.getElementById("PApellido").value = usuario.pApellido;
      document.getElementById("SApellido").value = usuario.sApellido
      document.getElementById("Email").value = usuario.email;
      document.getElementById("Telefono").value = usuario.telefono;
    }
  }

}

function chequearCampos(){
  let chequeado = true;
  usuarioActual.pNombre = document.getElementById("PNombre").value;
  usuarioActual.sNombre = document.getElementById("SNombre").value;
  usuarioActual.pApellido = document.getElementById("PApellido").value;
  usuarioActual.sApellido = document.getElementById("SApellido").value 
  usuarioActual.email = document.getElementById("Email").value;
  usuarioActual.telefono = document.getElementById("Telefono").value

  if(usuarioActual.pNombre === "" || usuarioActual.pApellido === "" || usuarioActual.email === "" || usuarioActual.telefono === ""){
    chequeado = false;
    alert("Debe completar los campos requeridos (*)");
  }

  return chequeado;

}

function guardarCambios(){

  let usuario = listaUsuarios[index];
  usuario.pNombre = usuarioActual.pNombre;
  usuario.sNombre = usuarioActual.sNombre;
  usuario.pApellido = usuarioActual.pApellido;
  usuario.sApellido = usuarioActual.sApellido;
  usuario.email = usuarioActual.email;
  usuario.telefono = usuarioActual.telefono;

  localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));

}

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("loginUsuario") == null) {
    alert("Debes estar registrado para ver el perfil");
    window.location.href = "index.html"
  } else {
    if (localStorage.getItem("listaUsuarios")) {
      listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));
    }

    mostrarPerfil();
    mostrarInfo();

    document.getElementById("botonGC").addEventListener("click", function () {
      //chequea campos no vacios 
      if(chequearCampos()){
        //guardar campos
        guardarCambios();
        alert("Los cambios se guardaron correctamente!");
      }

    })
  }


}) 
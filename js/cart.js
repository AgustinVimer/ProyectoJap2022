const userID = "25801";
let articulosArray = [];
let porcEnvio =0;
let subtotal =0;
let costoEnvio =0;
let innerHTML;

function cambiarInput(indice, nuevaCantidad) {
    /*let costoTotalArticulo = document.getElementById("id" + idArticulo);
    let nuevoCostoTotal = costoTotal(costo, nuevaCantidad);
    costoTotalArticulo.innerHTML = nuevoCostoTotal;*/

    cambiarLocalStorage(indice,nuevaCantidad);
    mostrarCarrito(articulosArray);
}

function cambiarLocalStorage(indice, cantidad){
    for(let i=0 ; i < articulosArray.length; i++){
        let articulo = articulosArray[i];

        if (i === indice){
            articulo.count = cantidad;
            
        }
    }
    localStorage.setItem("listaCarrito",JSON.stringify(articulosArray));

}

function costoTotal(costo, cantidad) {
    let total = costo * cantidad;
    return total;
}

function mostrarCarrito(lista) {

    let htmlCarrito = "";
    for (let i = 0; i < lista.length; i++) {
        let articles = lista[i];
        htmlCarrito += `
            <th><img class="imgCarrito" src="${articles.image}"></th>
            <td>${articles.name}</td>
            <td id="unitCost"><b>${articles.currency}</b> ${articles.unitCost}</td>
            <div class="paraCant"><td id="cantCarrito"><input type="number" min="1" id="${articles.id}" class=" cant needs-validation form-control" placeholder="1" value="${articles.count}"
                                  onchange="cambiarInput(${i}, this.value)"></input></td><div>
            <td id="currency"><b>${articles.currency}</b> </td>
            <td id="id${i}"> ${costoTotal(articles.unitCost, articles.count)}</td>
            
            `

    }

    document.getElementById("bodyTabla").innerHTML = htmlCarrito;
    actualizarSubtotal();
    actualizarCostoEnvio();
    actualizarTotal()
}




function actualizarSubtotal(){
    let sumando = 0;
    

    for (let i = 0; i < articulosArray.length; i++) {
    let articles = articulosArray[i];
        if (articles.currency === "USD"){
            sumando += articles.unitCost * articles.count
        } 
        else{
            let conversion = Math.round(articles.unitCost / 40);
            sumando += articles.count * conversion

        }
    }

    subtotal = sumando;
    document.getElementById("subtotal").innerHTML = "USD " + subtotal;
      
    
}

function actualizarCostoEnvio(){
    let cEnvio = porcEnvio * subtotal

    costoEnvio = cEnvio;
    document.getElementById("envio").innerHTML = "USD " + Math.round(costoEnvio);
    actualizarTotal();
}

function actualizarTotal(){
  
    let totaltotal = costoEnvio + subtotal;

    document.getElementById("totaltotal").innerHTML = "USD " + totaltotal
}


function seleccionarMetodoPago(metodo){

  let htmlParrafo =  document.getElementById("seleccionar");
  
    if (metodo === "transferencia"){
        htmlParrafo.innerHTML = "Forma de pago seleccionada: Transferencia"
        document.getElementById("numeroCuenta1").setAttribute("required","");
        document.getElementById("numeroCuenta1").removeAttribute("disabled")
        document.getElementById("numeroTarjeta").setAttribute("disabled","")
        document.getElementById("numeroTarjeta").removeAttribute("required")
        document.getElementById("codigo").setAttribute("disabled","")
        document.getElementById("codigo").removeAttribute("required")
        document.getElementById("vencimiento").setAttribute("disabled","")
        document.getElementById("vencimiento").removeAttribute("required")
    }

     else if (metodo === "tarjeta"){
        htmlParrafo.innerHTML = "Forma de pago seleccionada:  Tarjeta de credito"
        document.getElementById("numeroCuenta1").setAttribute("disabled","");
        document.getElementById("numeroCuenta1").removeAttribute("required");
        document.getElementById("numeroTarjeta").removeAttribute("disabled")
        document.getElementById("numeroTarjeta").setAttribute("required","")
        document.getElementById("codigo").removeAttribute("disabled")
        document.getElementById("codigo").setAttribute("required","")
        document.getElementById("vencimiento").removeAttribute("disabled")
        document.getElementById("vencimiento").setAttribute("required","")


    }

    document.getElementById("seleccionar").classList.remove('text-danger');
    /*lo despinta de rojo a cuando haya seleccionado el metodo de pago*/


}





document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CART_INFO_URL + userID + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulosArray = resultObj.data.articles
            localStorage.setItem("listaCarrito", JSON.stringify(articulosArray));
            mostrarCarrito(articulosArray);
            

        }



    });

    document.getElementById("premium").addEventListener("change", function(){
        porcEnvio = 0.15;
        actualizarCostoEnvio();
    });
    
    document.getElementById("express").addEventListener("change", function(){
        porcEnvio = 0.07;
        actualizarCostoEnvio();
    });

    document.getElementById("standard").addEventListener("change", function(){
        porcEnvio = 0.05;
        actualizarCostoEnvio();
    });

    document.getElementById("tarjeta").addEventListener("change", function(){
        seleccionarMetodoPago("tarjeta");


    });

    document.getElementById("transferencia").addEventListener("change", function(){
        seleccionarMetodoPago("transferencia");
    });

   /*  let direccion = document.getElementById("calle").value;
    let numero = document.getElementById("numero").value; */
    /* let cantidad = parseInt(document.getElementById("cantCarrito").innerText); */


   var forms = document.querySelectorAll('.needs-validation')
   Array.prototype.slice.call(forms)
   
    .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            /* if (direccion === "" || direccion == undefined || numero ==="" || numero == undefined) {
                alert("debes completar los campos")
            } */
          /*   if ( cantidad <= 1){
                alert("La cantidad no puede ser menor a uno")
            } */

            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }


            form.classList.add('was-validated')
            document.getElementById("tipoenvio").classList.add('was-validated')
            document.getElementById("seleccionar").classList.add('text-danger')
            
            document.getElementById("bodyTabla").classList.add('was-validated')
            
            
           

            if(form.checkValidity()) {
                alert("La compra ha sido exitosa");
                articulosArray = [];
                localStorage.removeItem("listaCarrito");
               
               
               
               
                /* alertas = document.getElementById("alertas").innerHTML

                alertas.innerHTML += `<div class="alert alert-success" role="alert">
                La compra ha sido exitosa!
              </div>` 
              
              NO LOGRO HACER ENTRAR LA ALERTA DE BOOTSTRAP*/
            }
             
        }, false)
    })
});





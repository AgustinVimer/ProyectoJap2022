let prodID = "";
let productInfo = "";
let nameProd = "";
let listaProductInfoComentarios = [];
let articulo = {};
let listaCarrito = [];

function yaEsta(){
 let esta = false;
 
 for (let i = 0; i < listaCarrito.length; i++) {
    let art = listaCarrito[i]
    if(art.id === articulo.id){
        esta = true
    }
 }
 return esta

}

function agregarCarrito(){
    if (localStorage.getItem("listaCarrito")){
        listaCarrito = JSON.parse(localStorage.getItem("listaCarrito"));
        if(yaEsta()){
            let irAlCarrito = confirm("El producto ya esta en el carrito ¿Desea ver su carrito?");
            if(irAlCarrito){
                window.location.href = "cart.html"
            }

        } else {
            listaCarrito.push(articulo);
            localStorage.setItem("listaCarrito",JSON.stringify(listaCarrito));
            alert("El producto se agrego correctamente")
        }
     } else {
        listaCarrito.push(articulo);
        localStorage.setItem("listaCarrito",JSON.stringify(listaCarrito));
     }





}

function mostrarInfoProducto() {
    let imageArray = productInfo.images; 
    let contenidoHtml = "";

    contenidoHtml += ` <div> <h2><br> ${nameProd} <button onclick="agregarCarrito()" type="button" class="btn btn-success float-end">Agregar a carrito</button> </h2> <hr> </div> 
    
            <div  class="col">
                
                    <div>
                     <h5><b>Precio</b></h5><h5>${productInfo.currency} ${productInfo.cost}</h5>
                    </div>
                    <div>
                     <h5><b>Descripción</b><p>${productInfo.description} </p>
                    </div>
                    <div>
                    <h5><b>Categoria</b><p>${productInfo.category} </p>
                    </div>
                   <div>
                   <h5><b>Cantidad de vendidos</b><p>${productInfo.soldCount} </p>
                   </div>
                   <div>
                   <h5><b>Imagenes ilustrativas</h5></b>
                   </div>
            </div>
            `
    articulo.count=1;
    articulo.currency = productInfo.currency ;
    articulo.id = productInfo.id;
    articulo.image = productInfo.images[0];
    articulo.name = nameProd;
    articulo.unitCost = productInfo.cost;

    document.getElementById("info-producto").innerHTML = contenidoHtml;

    let imgHtml = ""
    for (let i = 0; i < imageArray.length; i++) {
        let imagen = imageArray[i]; 

        imgHtml += `
                
             
                <div class="col">
                    <img src="${imagen}" class="bd-placeholder-img card-img-top"> 
                </div>`

    }

    document.getElementById("img-producto").innerHTML = imgHtml;







}




function mostrarListaComentarios(){

    let comentariosHtml = "";
    comentariosHtml += ` <br><br><br><br><div> <h2> Comentarios: </h2></div> ` 
    
    for(let i = 0; i < listaProductInfoComentarios.length; i++){
        let comentario = listaProductInfoComentarios[i];
        
        
        comentariosHtml += `<p><b> ${comentario.user} </b>${comentario.dateTime} ${cantEstrellas(comentario)}</p>
        <p> ${comentario.description}</p>`
     
     
      
    }

   /*  comentariosHtml+= `<p><b> ${localStorage.getItem("loginUsuario")} </b>${localStorage.getItem("fecha")} ${cantEstrellas(localStorage.getItem("stars"))}</p>
            <p> ${localStorage.getItem("coment")}</p>` */

    /*    comentariosHtml += `<br>
        <div class="mb-3">
        <label for="exampleFo>rmControlTextarea1" class="form-label">Añade un comentario:</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div class="input-group mb-3">
         <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">Puntaje</label>
        </div>
  <select class="custom-select  required" id="inputGroupSelect01">
    <option value= "0" selected disabled="disabled">Puntúa al producto</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
</div>
      <button onclick="enviarComentario()" type="button" class="btn btn-primary">Enviar comentario</button>
        `
 */
        
         

    document.getElementById("comentarios").innerHTML = comentariosHtml; 
    /* localStorage.setItem("comentariosHtml", comentariosHtml) */
}
    
function cantEstrellas(comentario){
    let puntos = comentario.score;
    let html = "";

    if (puntos == 1) {
    html +=`<span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>`
    }
    else if (puntos == 2){
        html +=   `<span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>`
    }
    else if (puntos == 3)
    { html +=   `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }
    else if (puntos == 4)
    { html +=  `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>`
    }
    else 
    { html +=  `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>`
    }

    return html;

    }

    function setProdRelID(id2) {
        localStorage.setItem("prodID", id2);
        window.location = "product-info.html"
        mostrarListaProductos();
    }

    function mostrarProductosRelacionados(){
    let productosRelacionados = productInfo.relatedProducts  
    let pRelHtml = ""

    for (let i = 0; i < productosRelacionados.length; i++) {
        let pRel = productosRelacionados[i]; console.log(pRel);

        pRelHtml +=/* `
                
             
                <div class="col">
                    <img onclick="setProdRelID(${productosRelacionados.id})" class="img-rel" src="${pRel.image}" class="bd-placeholder-img card-img-top"> 
                    <p class="name-rel bd-placeholder-img card-img-top ">${pRel.name}</p>
                </div>`
*/
                `<div class="card">
                <img onclick="setProdRelID(${pRel.id})" src="${pRel.image}" class="card-img-tos">
                <div class="card-body">
                <h5 class="card-title">${pRel.name}</h5>            
                </div>`
    }

    document.getElementById("info-pRel").innerHTML += pRelHtml;



    }

   /* function enviarComentario(){

        let comen = document.getElementById("exampleFormControlTextarea1").value;
        let stars = document.getElementById("inputGroupSelect01").value;
        let fecha = new Date(); 
        let fechaHoy = fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " "+ fecha.getHours() + ":" + fecha.getMinutes()+ ":" + fecha.getSeconds(); 
        localStorage.setItem("coment", comen);
        localStorage.setItem("stars", stars);
        localStorage.setItem("fecha",fechaHoy );
        comentariosHtml = localStorage.getItem("comentariosHtml") */
            
        

          
        

document.addEventListener("DOMContentLoaded", function () {
    prodID = localStorage.getItem("prodID")
    getJSONData(PRODUCT_INFO_URL + prodID + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            nameProd = resultObj.data.name;
            productInfo = resultObj.data;
            mostrarInfoProducto();
            mostrarProductosRelacionados();
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL+ prodID + ".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            listaProductInfoComentarios = resultObj.data;
            mostrarListaComentarios();
        }
    });

    document.getElementById("enviarComentario").addEventListener("click", function(){
        if (parseInt(document.getElementById("inputGroupSelect01").value) == 0 
        || document.getElementById("anadeComentario").value === "" ){         
            alert("Debes seleccionar un puntaje y escribir un comentario")
        } 
        else{
            window.location.href = "product-info.html";
            
            }
           
    });

    
    
    
    });







    




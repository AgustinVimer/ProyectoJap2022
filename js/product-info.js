let prodID = "";
let productInfo = "";
let nameProd = "";
let listaProductInfoComentarios = [];

function mostrarInfoProducto() {
    let imageArray = productInfo.images; 
    let contenidoHtml = "";

    contenidoHtml += ` <div> <h2><br> ${nameProd} </h2> <hr></div> 
    
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
    document.getElementById("info-producto").innerHTML = contenidoHtml;

    let imgHtml = ""
    for (let i = 0; i < imageArray.length; i++) {
        let imagen = imageArray[i]; console.log(imagen);

        imgHtml += `
                
             
                <div class="col">
                    <img src="${imagen}" class="bd-placeholder-img card-img-top> 
                </div>`

    }

    document.getElementById("img-producto").innerHTML = imgHtml;







}




function mostrarListaComentarios(){

    let comentariosHtml = "";
    comentariosHtml += ` <br><br><br><br><div> <h2> Comentarios: </h2></div> ` 
    
    for(let i = 0; i < listaProductInfoComentarios.length; i++){
        let comentario = listaProductInfoComentarios[i];
        
        
        comentariosHtml += `<p><b> ${comentario.user} </b>${comentario.dateTime} ${comentario.score}</p>
        <p> ${comentario.description}</p>`
     
     
      
    }

       comentariosHtml += `<br>
        <div class="mb-3">
        <label for="exampleFo>rmControlTextarea1" class="form-label">Añade un comentario:</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <button type="button" class="btn btn-primary">Enviar comentario</button>
        `
         

    document.getElementById("comentarios").innerHTML = comentariosHtml; 
}
    




document.addEventListener("DOMContentLoaded", function () {
    prodID = localStorage.getItem("prodID")
    getJSONData(PRODUCT_INFO_URL + prodID + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            nameProd = resultObj.data.name;
            productInfo = resultObj.data;
            mostrarInfoProducto();
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL+ prodID + ".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            listaProductInfoComentarios = resultObj.data;
            mostrarListaComentarios();
        }
    });
});


/*
function cantEstrellas(puntos){
    let puntos = comentario.score

    if (puntos == 1) {
    `<span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>`
    }
    else if (puntos == 2){
        `<span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>
     <span class="fa fa-star"></span>`
    }
    else if (puntos == 3)
    {   `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }
    else if (puntos == 4)
    {   `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>`
    }
    else 
    {   `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>`
    }

    }
    */



/* getJSONData(PRODUCT_INFO_COMMENTS_URL+ prodID + ".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            listaProductInfoComentarios = resultObj.data;
        }
    });
    */

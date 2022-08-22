let productosArray = [];
let catName = "";


function mostrarListaProductos(){

    let contenidoHtml = "";
    contenidoHtml += ` <div> <h2> ${catName} </h2></div> ` // Para agregarle el título de la categoria a los productos
    
    for(let i = 0; i < productosArray.length; i++){
        let producto = productosArray[i];


            contenidoHtml += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${producto.image}" alt="${producto.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${producto.name}   </h4>
                            <small class="text-muted">${producto.soldCount} vendidos</small>
                           
                        </div>
                        <p class="mb-1">${producto.description} <br>
                        <h4><b>${producto.currency} ${producto.cost}</b></h4> </p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("productos-list").innerHTML = contenidoHtml; 
        //agrego todo lo que puse en contenidoHtml al div con Id productos-list
}



document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCTS_URL+"101.json").then(function(resultObj){
        if (resultObj.status === "ok"){
            catName= resultObj.data.catName
            productosArray = resultObj.data.products
            mostrarListaProductos();
            
        }
    });
});
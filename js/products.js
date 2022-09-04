let productosArray = [];
let catName = "";
let catID = "";
const ORDER_ASC_BY_PRECIO = "ASC";
const ORDER_DESC_BY_PRECIO = "DESC";
const ORDER_BY_PROD_VENDIDOS = "VENDIDOS";
let ordenActualCriterio = undefined;
let minPrecio = undefined;
let maxPrecio = undefined;


function mostrarListaProductos(){

    let contenidoHtml = "";
    contenidoHtml += ` <div> <h2> ${catName} </h2></div> ` // Para agregarle el título de la categoria a los productos
    
    for(let i = 0; i < productosArray.length; i++){
        let producto = productosArray[i];

        if (((minPrecio == undefined) || (minPrecio != undefined && parseInt(producto.cost) >= minPrecio)) &&
        ((maxPrecio == undefined) || (maxPrecio != undefined && parseInt(producto.cost) <= maxPrecio))) {

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
    }

    document.getElementById("productos-list").innerHTML = contenidoHtml; 
    //agrego todo lo que puse en contenidoHtml al div con Id productos-list
}




function ordenarProductos(criterio, lista){
    let result = [];
    if (criterio === ORDER_ASC_BY_PRECIO)
    { 
        result = lista.sort(function(a, b) {
            if ( parseInt(a.cost) < parseInt(b.cost) ){ return -1; }
            if (  parseInt(a.cost) > parseInt(b.cost) ){ return 1; }
            return 0;
        });
    }else if (criterio === ORDER_DESC_BY_PRECIO){
        result = lista.sort(function(a, b) {
            if ( parseInt(a.cost) > parseInt(b.cost) ){ return -1; }
            if ( parseInt(a.cost) < parseInt(b.cost) ){ return 1; }
            return 0;
        });
    }else if (criterio === ORDER_BY_PROD_VENDIDOS){
        result = lista.sort(function(a, b) {
            let aVendidos = parseInt(a.soldCount);
            let bVendidos = parseInt(b.soldCount);

            if ( aVendidos > bVendidos ){ return -1; }
            if ( aVendidos < bVendidos ){ return 1; }
            return 0;
        });
    }

    return result;
}

function OrdenarYMostrarProductos(criterioOrden, arrayProductosActual){ 
    ordenActualCriterio = criterioOrden;

    if(arrayProductosActual != undefined){
        productosArray = arrayProductosActual;
    }

    productosArray = ordenarProductos(ordenActualCriterio, productosArray);

    //Muestro los productos  ordenados
    mostrarListaProductos();
}

document.addEventListener("DOMContentLoaded", function(){
    catID=  localStorage.getItem("catID")
    getJSONData(PRODUCTS_URL+ catID+ ".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            catName= resultObj.data.catName
            productosArray = resultObj.data.products
            mostrarListaProductos();
            
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){ 
        OrdenarYMostrarProductos(ORDER_ASC_BY_PRECIO);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        OrdenarYMostrarProductos(ORDER_DESC_BY_PRECIO);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        OrdenarYMostrarProductos(ORDER_BY_PROD_VENDIDOS);
    });


    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPrecioMin").value = "";
        document.getElementById("rangeFilterPrecioMax").value = "";

        minPrecio = undefined;
        maxPrecio = undefined;

        mostrarListaProductos();
    });

    document.getElementById("rangeFilter").addEventListener("click", function(){
        
        minPrecio = document.getElementById("rangeFilterPrecioMin").value;
        maxPrecio = document.getElementById("rangeFilterPrecioMax").value;

        if ((minPrecio != undefined) && (minPrecio != "") && (parseInt(minPrecio)) >= 0){
            minPrecio = parseInt(minPrecio);
        }
        else{
            minPrecio = undefined;
        }

        if ((maxPrecio != undefined) && (maxPrecio != "") && (parseInt(maxPrecio)) >= 0){
            maxPrecio = parseInt(maxPrecio);
        }
        else{
            maxPrecio = undefined;
        }

        mostrarListaProductos();
    });
});



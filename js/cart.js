const userID = "25801"
let articulosArray = []


function cambiarInput(idArticulo, costo, nuevaCantidad) {
    let costoTotalArticulo = document.getElementById("id" + idArticulo);
    let nuevoCostoTotal = totalCost(costo, nuevaCantidad);
    costoTotalArticulo.innerHTML = nuevoCostoTotal;

}

function totalCost(costo, nuevacantidad) {
    let totalCost = costo * nuevacantidad;
    return totalCost;
}

function mostrarCarrito() {

    let htmlCarrito = "";
    for (let i = 0; i < articulosArray.length; i++) {
        let articles = articulosArray[i];




        htmlCarrito += `
            <th><img class="imgCarrito" src="${articles.image}"></th>
            <td>${articles.name}</td>
            <td id="unitCost"><b>${articles.currency}</b> ${articles.unitCost}</td>
            <td id="cantCarrito"><input type="number" min="0" id="${articles.id}" class="cant" placeholder="1" value="${articles.count}
                                  "onchange="cambiarInput(${i},${articles.unitCost}, this.value)"></input></td>
            <td id="currency"><b>${articles.currency}</b> </td>
            <td id="id${i}"> ${articles.unitCost}</td>
            
            `



    }

    document.getElementById("bodyTabla").innerHTML += htmlCarrito;
}






document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CART_INFO_URL + userID + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulosArray = resultObj.data.articles
            localStorage.setItem("listaCarrito", JSON.stringify(articulosArray));
            mostrarCarrito()

        }



    });

});




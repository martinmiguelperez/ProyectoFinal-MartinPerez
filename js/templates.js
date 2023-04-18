let carritoCooltra = JSON.parse(localStorage.getItem("miCarritoCooltra")) || []

/* NAV*/
document.addEventListener('DOMContentLoaded', () => {

    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
            const target = el.dataset.target;
            const $target = document.getElementById(target);
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

        });
    });
});

function retornoCard({ id, images, nombre, precio, tipo, cilindrada }) {
    return `                
    <div class="tarjeta id="${id}">
        <div class="contenidosCard">
            <div class="ladoIzq">
                <h1 class="tituloCard">${nombre}</h1>
                <h2 class="tituloPrecio">${precio.toFixed(2)} €</h2>
                <div class="cuerpo">
                    <p>${tipo} || ${cilindrada} </p>
                </div>
                    <button type="button" class="btn btnCardComprar" id="${id}" title="Click para agregar '${nombre}' al carrito">Añadir</button>
            </div>
            <div class="ladoDer">
                <img src="${images}" alt="${nombre}" />
            </div>
        </div>
    </div>
    `
}

function armarTablaCarrito({ nombre, cantidad, precio, id }) {
    return `
                <tr>
                    <td class="">${nombre}</td>
                    <td class="">${cantidad}</td>
                    <td class="">${precio} €</td>
                    <td>${precio * cantidad} €</td>
                    <td><button type="button" class="delete is-medium button-delete" id="${id}" title="Quitar del carrito"></button></td>
                </tr>
                
            `
}

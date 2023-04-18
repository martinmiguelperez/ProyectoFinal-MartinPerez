const conteiner = document.getElementById("containerCard")
const imgCarrito = document.getElementById("imgCarritoCooltra")
const URL = '../baseDatos/vehiculos.json'
const vehiculos = []

async function conseguirDatos() {
    try {
        const response = await fetch(URL)
        const data = await response.json()
        if (data.length > 0) {
            vehiculos.push(...data)
            cargarProductosHTML(vehiculos)
            clickBotonesAgregar()
        }
    } catch (error) {
        conteiner.innerHTML = "<h2 class='cardError'>¡¡UPS!! Error al cargar productos.</h2>"
    }
}
conseguirDatos()


imgCarrito.addEventListener("mousemove", () => {
    let totalCantidadCarrito = carritoCooltra.reduce((acc, vehiculo) => acc + (vehiculo.cantidad), 0)
    imgCarrito.title = `${totalCantidadCarrito} productos en el carrito`
})

function cargarProductosHTML(array) {
    let contenidoEnHTML = ""
    if (array.length > 0) {
        array.forEach(vehiculo => contenidoEnHTML += retornoCard(vehiculo))
        conteiner.innerHTML = contenidoEnHTML
    }
}


function clickBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll("button.btn.btnCardComprar")
    botonesAgregar.forEach(btn => {
        btn.addEventListener("click", () => {
            let resultado = vehiculos.find(vehiculo => vehiculo.id === parseInt(btn.id))

            if (carritoCooltra.some(vehiculo => vehiculo.id === parseInt(btn.id))) {
                const indexNumber = carritoCooltra.findIndex(vehiculo => vehiculo.id === parseInt(btn.id))
                carritoCooltra[indexNumber].cantidad++
            } else {
                resultado.cantidad = 1
                carritoCooltra.push(resultado)
            }
            localStorage.setItem("miCarritoCooltra", JSON.stringify(carritoCooltra))
            toastifyAgregar(`${resultado.nombre} se agregó al carrito`, '#f27c51')

        })
    })
}


function filtrarProductos() {
    let resultado = vehiculos.filter(vehiculo => vehiculo.tipo.toUpperCase().includes(inputSearch.value.toUpperCase().trim()))
    if (resultado.length > 0) {
        cargarProductosHTML(resultado)
        clickBotonesAgregar()
    } else {
        toastifyAgregar(`No se encontró coincidencia en la búsqueda`, 'gray')
    }

}
inputSearch.addEventListener("search", () => {
    if (inputSearch.value.trim() !== "") {
        filtrarProductos()
    } else {
        cargarProductosHTML(vehiculos)
        clickBotonesAgregar()

    }
})

function ordenarProductosPrecioMeMa() {
    const ordenarMeMa = document.querySelector("button#ordenarMeMa")
    ordenarMeMa.addEventListener("click", () => {
        let productosOrdenados = vehiculos.sort((a, b) => a.precio - b.precio)
        cargarProductosHTML(productosOrdenados)
        clickBotonesAgregar()


    })
}
ordenarProductosPrecioMeMa()

function ordenarProductosPrecioMaMe() {
    const ordenarMaMe = document.querySelector("button#ordenarMaMe")
    ordenarMaMe.addEventListener("click", () => {
        let productosOrdenados = vehiculos.sort((a, b) => a.precio - b.precio).reverse()
        cargarProductosHTML(productosOrdenados)
        clickBotonesAgregar()
    })
}
ordenarProductosPrecioMaMe()

function ordenAZ() {
    const ordenAZ = document.querySelector('button#ordenarAZ');
    ordenAZ.addEventListener("click", () => {
        vehiculos.sort((a, b) => a.nombre.localeCompare(b.nombre))
        cargarProductosHTML(vehiculos)
        clickBotonesAgregar()
    })
}
ordenAZ()

function ordenZA() {
    const ordenZA = document.querySelector('button#ordenarZA');
    ordenZA.addEventListener("click", () => {
        vehiculos.sort((a, b) => a.nombre.localeCompare(b.nombre)).reverse()
        cargarProductosHTML(vehiculos)
        clickBotonesAgregar()
    })
}
ordenZA()

const toastifyAgregar = (text, bgcolor,) => {
    Toastify({
        text: text,
        duration: 1000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: { background: bgcolor || 'CornFlowerBlue', fontSize: '15px', fontFamily: 'Roboto Slab' }
    }).showToast();
}

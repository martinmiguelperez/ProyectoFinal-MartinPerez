const confirmarCompra = document.querySelector('#confirmarCompra');
const vaciarCarrito = document.querySelector('#vaciarCarrito');
const tbody = document.querySelector("tbody")


function recuperarCarritoLocalStorage() {
  let tablaHTML = []
  if (carritoCooltra.length > 0) {
    carritoCooltra.forEach(moto => tablaHTML += armarTablaCarrito(moto))
    tbody.innerHTML = tablaHTML
    calcularTotalHTML()
  } else {
    tbody.innerHTML = tablaHTML
    calcularTotalHTML()
  }
}
recuperarCarritoLocalStorage()

function activarBotonesEliminar() {
  const buttonsEliminar = document.querySelectorAll("button.delete.is-medium.button-delete")
  buttonsEliminar.forEach(btn => {
    btn.addEventListener("click", () => {
      let posicionEliminar = carritoCooltra.findIndex(vehiculo => vehiculo.id === parseInt(btn.id))
      let posicionNombre = carritoCooltra.find(vehiculo => vehiculo.id === parseInt(btn.id))
      if (posicionEliminar > -1) {
        carritoCooltra.splice(posicionEliminar, 1)
        localStorage.setItem("miCarritoCooltra", JSON.stringify(carritoCooltra));
        recuperarCarritoLocalStorage()
        activarBotonesEliminar()
        toastifyEliminar(`${posicionNombre.nombre} se eliminó del carrito`)
      }
    })
  })
}
activarBotonesEliminar()


function calcularTotalHTML() {
  let total = document.querySelector("h4#total")
  let totalCarrito = carritoCooltra.reduce((acc, vehiculo) => acc + (vehiculo.precio * vehiculo.cantidad), 0)
  total.innerHTML = `Total: ${totalCarrito.toLocaleString()} €`
}

const gifLoading = () => `<img src="images/gifLoading.gif" width="30px">`
const numeroAlAzar = () => parseInt(Math.random() * 3_000)

confirmarCompra.addEventListener("click", confirmarBtnCompra)
function confirmarBtnCompra() {
  confirmarCompra.innerHTML = gifLoading()
  setTimeout(() => {
    if (carritoCooltra.length !== 0) {
      carritoCooltra.length = 0;
      alertaSweet(false, 3000, 'success', '', '¡Felicidades!', 'Su pago se confirmó. Muchas gracias por elegirnos!', true)
      localStorage.setItem("miCarritoCooltra", JSON.stringify(carritoCooltra));
      recuperarCarritoLocalStorage()
    } else {
      alertaSweet(true, 1500, 'warning', 'top-end', '', 'No hay productos seleccionados para comprar')

    }
    confirmarCompra.innerText = "COMPRAR"
  }, numeroAlAzar())

}

vaciarCarrito.addEventListener("click", borrarCarrito)
function borrarCarrito() {
  if (carritoCooltra.length !== 0) {
    carritoCooltra.length = 0;
    alertaSweet(false, 2500, 'warning', '', '', 'Su carrito quedó vacio', true)
    localStorage.setItem("miCarritoCooltra", JSON.stringify(carritoCooltra));
    recuperarCarritoLocalStorage()
  } else {
    alertaSweet(true, 1500, 'warning', 'top-end', '', 'No hay productos en su carrito')
  }
}

const alertaSweet = (toast, timer, icon, position, title, text, showConfirmButton) => {
  Swal.fire({
    toast: toast || false,
    position: position || 'center',
    icon: icon || '',
    title: title || '',
    text: text || '',
    showConfirmButton: showConfirmButton || false,
    confirmButtonText: 'Aceptar',
    timer: timer
  })
}

const toastifyEliminar = (text, bgcolor) => {
  Toastify({
    text: text,
    duration: 1000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: { background: bgcolor || 'red', fontSize: '15px', fontFamily: 'Roboto Slab', color: 'black'}
  }).showToast();
}

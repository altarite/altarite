const alertas = (tipo, mensaje, referencia) => {

    //limpiamos el html
    limpiarHTML(referencia);
    const alerta = document.querySelector('.error');
    //si no existe la alerta la creamos
    if (!alerta) {
        

        const alerta = document.createElement('DIV');
        alerta.innerText = mensaje;
        if (tipo === 'error') {
            alerta.classList.add('error');
        }
        referencia.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

}


const limpiarHTML = (referencia) => {
    while (referencia.firstChild) {
        referencia.removeChild(referencia.firstChild);
    }
}

const validarTelefono = (telefono) => {
    const regex = /^\d{10}$/;
    const resultado = regex.test(telefono);
    return resultado;
}


const mostrarSpinner = (referencia) => {
    const spinner = document.createElement('DIV');
    spinner.classList.add('sk-fading-circle');
    spinner.innerHTML = `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
    `;
    referencia.appendChild(spinner);
}

export {
    alertas,
    limpiarHTML,
    validarTelefono,
    mostrarSpinner
}
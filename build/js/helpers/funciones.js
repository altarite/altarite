const alertas = (tipo, mensaje, referencia) => {

    //limpiamos el html
    limpiarHTML(referencia);
    const alerta = document.querySelector('.error');
    if (!alerta) {
        console.log('no hay alertas');

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

export {
    alertas,
    limpiarHTML,
    validarTelefono
}
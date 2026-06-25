import { alertas } from "../helpers/funciones.js";
import { validarTelefono } from "../helpers/funciones.js";
export const contacto = () => {


    const validarForm = (e) => {
        e.preventDefault();
        const nombre = document.querySelector('#nombre').value;
        const empresa = document.querySelector('#empresa').value;
        const email = document.querySelector('#email').value;
        const tel = document.querySelector('#telefono').value;
        const cargo = document.querySelector('#cargo').value;
        const servicio = document.querySelector('#servicio').value;
        const mensaje = document.querySelector('#mensaje').value;



        if (!nombre) {
            alertas('error', `Por favor introduce un ${e.target[0].id}`, alertasDiv);
            return;
        };
        if (!empresa) {
            alertas('error', `Por favor introduce una ${e.target[1].id}`, alertasDiv);
            return;
        };
        if (!email) {
            alertas('error', `Por favor introduce un ${e.target[2].id}`, alertasDiv);
            return;
        };
        if (!tel) {
            alertas('error', `Por favor introduce un ${e.target[3].id}`, alertasDiv);
            return;
        };
        if (!validarTelefono(tel)) {
            alertas('error', `Por favor introduce un número a 10 digitos valido`, alertasDiv);
            return;
        };
        if (!cargo) {
            alertas('error', `Por favor introduce un ${e.target[4].id}`, alertasDiv);
            return;
        };
        if (!servicio) {
            alertas('error', `Por favor introduce un ${e.target[5].id}`, alertasDiv);
            return;
        };
        if (!mensaje) {
            alertas('error', `Por favor introduce un ${e.target[6].id}`, alertasDiv);
            return;
        };

        //si pasa validacion lo metemos en un appendChild
        const datosContacto = {
            nombre,
            empresa,
            email,
            tel,
            cargo,
            servicio,
            mensaje
        };
        //enviando la infomación
        enviarFormulario(datosContacto);
    }

    const alertasDiv = document.querySelector('#alertasDiv');
    const formulario = document.querySelector('.formulario-contacto');
    formulario.addEventListener('submit', validarForm);



    // // Form submit (demo)
    // document.querySelector('.form-submit button').addEventListener('click', function () {
    //     this.textContent = '✓ Mensaje enviado';
    //     this.style.background = '#16a34a';
    //     setTimeout(() => {
    //         this.textContent = 'Enviar mensaje →';
    //         this.style.background = '';
    //     }, 3000);
    // });


    const enviarFormulario = async (datosObj) => {
        const url = `/api/send-email`;
        try {
            const respuesta = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosObj)
            });
            const resultado = await respuesta.json();
            console.log("Respuesta del servidor:", resultado);

        } catch (error) {
            console.log(error);

        }

    }

}
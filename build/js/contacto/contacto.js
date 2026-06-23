export const contacto = () => {


    // Form submit (demo)
    document.querySelector('.form-submit button').addEventListener('click', function () {
        this.textContent = '✓ Mensaje enviado';
        this.style.background = '#16a34a';
        setTimeout(() => {
            this.textContent = 'Enviar mensaje →';
            this.style.background = '';
        }, 3000);
    });

}
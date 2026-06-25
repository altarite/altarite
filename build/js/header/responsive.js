const menuResponsive = () => {

    const btnMenu = document.querySelector('#hamburguesa');

    const overlay = document.querySelector('#overlay-hamburguesa');

    const movilLinks = document.querySelectorAll('.movil-link');

    const bodyfreeze = document.body;

    // ABRIR MENU
    btnMenu.addEventListener('click', (e) => {

        e.preventDefault();

        overlay.classList.add('mostrar');

        bodyfreeze.classList.add('body-movil');
    });

    // CERRAR CON CLICK EN FONDO NEGRO
    overlay.addEventListener('click', (e) => {

        if (e.target === overlay) {

            cerrarMenu();
        }
    });

    // CERRAR AL DAR CLICK EN LINKS
    movilLinks.forEach(movilLink => {

        movilLink.addEventListener('click', () => {

            cerrarMenu();
        });
    });

    // FUNCION REUTILIZABLE
    const cerrarMenu = () => {

        overlay.classList.remove('mostrar');

        bodyfreeze.classList.remove('body-movil');
    };
};

export {
    menuResponsive
};
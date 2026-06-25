import { contacto } from "./contacto/contacto.js";
import { reveal } from "./reveal/reveal.js";
import { menuResponsive } from "./header/responsive.js";
document.addEventListener('DOMContentLoaded', ()=>{
    reveal();
    contacto();
    menuResponsive();
});
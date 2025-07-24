/** Point d'entrée du JavaScript */
import { displayWorks, createButton } from './home.js'; 
import { adminMode, setupLogout } from './login.js';
import { modalGetCategory, setEventModal} from './modal.js';

/** Appeler les fonctions */
createButton();
displayWorks();
setupLogout();
adminMode();
setEventModal();
modalGetCategory();


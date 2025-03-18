// Point d'entrée du JavaScript
import { displayWorks } from './home.js'; 
import { createButton } from './home.js';
import { setupLogout } from './login.js';
import { adminMode } from './login.js';


// Appeler les fonctions et afficher les résultats dans la console
createButton();
displayWorks();
setupLogout();
adminMode();


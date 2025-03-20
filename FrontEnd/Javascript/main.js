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

/*
RESTE A FAIRE :

CSS 
- Ajouter propriété aux boutons filtres, pour que celui selectionné soit en vert et les autres pas.
- " " à l'ensemble des boutons : un hover vert foncé.
- adapter taille de l'icone instagram dans la navbarre
- CSS de la page login
- CSS de la modale
- CSS de la navbarre

JS
- fonctionnalité de suppression dans la modale
- ajout dynamique de la page/modale d'ajout d'une photo
- il manque un bouton "modifier" à côté du titre "projet"
- les boutons de filtrage sont supprimés lorsque la modale est ouverte

*/
// Point d'entrée du JavaScript
import { displayWorks, createButton } from './home.js'; 
import { adminMode, setupLogout } from './login.js';
import { modalGetCategory, setEventModal} from './modal.js';


// Appeler les fonctions et afficher les résultats dans la console
createButton();
displayWorks();
setupLogout();
adminMode();
setEventModal();
modalGetCategory();


/*
RESTE A FAIRE :

Faire des commentaires JSdoc ?
récupérer les projets initiaux

CSS 
terminer CSS de la modale 2
trouver pourquoi les propriété CSS sur les h3 ne veulent pas s'appliquer sur les deux modales ? 

JS 
- faire une redirection vers la page d'accueil ou la modale quand on ajoute une image (voir les consignes du projet)
- permettre d'annuler l'upload d'image en cas d'erreur

*/
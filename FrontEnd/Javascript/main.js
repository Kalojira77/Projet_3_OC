// Point d'entrée du JavaScript
import { displayWorks } from './home.js'; 
import { createButton } from './home.js';
import { setupLogout } from './login.js';
import { adminMode } from './login.js';
import { getFormContent } from './modal.js';


// Appeler les fonctions et afficher les résultats dans la console
createButton();
displayWorks();
setupLogout();
adminMode();
document.getElementById("submit-btn").addEventListener("click", (event) => getFormContent(event)
);

/*
RESTE A FAIRE :

Vérifier les liens
Faire des commentaires JSdoc ?

CSS 
- le formulaire login (Ajuster la police d'écriture, améliorer l'affichage de l'erreur en cas de mauvais identifiants)
- la modale 1 et 2

JS 
- faire une redirection vers la page d'acceuil ou la modale quand on ajoute une image (voir les consignes du projet)
*/
// Point d'entrée du JavaScript
import { displayWorks } from './display.js'; 
import { createButton } from './display.js';
import { listenerButton } from './display.js';

import { getCategories } from './api.js';  // Importer la fonction fetchCategories
import { getWorks } from './api.js';        // Importer la fonction fetchWorks

// Appeler les fonctions et afficher les résultats dans la console

console.log(getCategories())
console.log(getWorks())
createButton()
displayWorks()
listenerButton()
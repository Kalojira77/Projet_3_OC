// Gestion de l'affichage des projet

// affichage de la galerie 

import { getWorks } from './api.js'; 
import { getCategories } from './api.js';

// Récupère les données de catégories depuis api.js + créer et affiche la galerie : image, titre, alt, src.

const categories = await getCategories();

export async function displayWorks(){
    const works = await getWorks();
    const gallery = document.getElementById('gallery');

    for (const work of works) {
        const workElement = document.createElement('figure');
        const workImage = document.createElement('img');
        const workTitle = document.createElement('figcaption');

        workElement.classList.add('galleryItem');

       // workElement.id = work.category.id;
        workElement.dataset.cat = work.category.id;
        
        workImage.src = work.imageUrl;
        workImage.alt = work.title;
        workTitle.textContent = work.title;

        workElement.appendChild(workImage);
        workElement.appendChild(workTitle);
        gallery.appendChild(workElement);
    }
    document.addEventListener('DOMContentLoaded', displayWorks);
}

// Creation et affichage des fonctionnalités de tri 

export async function createButton(){
    const filtres = document.getElementById('filter');

    for (const filterCategory of categories) {
        
        const filterButton = document.createElement('button');
        filterButton.textContent = filterCategory.name;
        filterButton.id = filterCategory.id;
        filterButton.classList.add("selectAll");

        filtres.appendChild(filterButton);   
    }
 
    // Créer un bouton 'tous' dont l'id est toujours supérieur de 1 à la taille du tableau catégorie = dynamique si ajout de catégorie
    const filterButtonTous = document.createElement('button');
    filterButtonTous.textContent = "tous";
    filterButtonTous.id = categories.length+1;
    filtres.appendChild(filterButtonTous);  
    
}

// créer la fonction de display block/none des catégories en fonctions du choix user et une fonction spécifique pour la sélection "tous"
function filtreObjet(){
    const displayObjet = document.querySelectorAll('div.gallery figure');

    displayObjet.forEach((element)=>{
        element.style.display = 'none';
        if(element.dataset.cat == this.id){
            element.style.display = 'block';
        }
    });
}

function filtreObjetAll(){
    const displayObjet = document.querySelectorAll('div.gallery figure');

    displayObjet.forEach((element)=>{
        element.style.display = 'block';
    });
}

// Fonction qui place un listener sur le boutton et qui lance les fonctions "filteObjet" et "filtreObjetAll"
export function listenerButton(){

    for (const categorie of categories) {
            //   document.getElementById(categorie.id).addEventListener("click", filtreObjet);
            document.getElementById(categorie.id).addEventListener("click", filtreObjet);
    }
   document.getElementById(categories.length+1).addEventListener("click",filtreObjetAll);
}

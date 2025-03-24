//** Gestion de l'affichage des projet */

//** Importation des données WORKS et CATEGORIES depuis l'api */  

import { getWorks } from './api.js'; 
import { getCategories } from './api.js';

//** CREER LES TRAVAUX */ 

const categories = await getCategories();

export async function displayWorks(){
    const works = await getWorks();
    const gallery = document.getElementById('gallery');

    for (const work of works) {
        const workElement = document.createElement('figure');
        const workImage = document.createElement('img');
        const workTitle = document.createElement('figcaption');

        workElement.classList.add('galleryItem');

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


//** CREER LES BOUTONS DE TRI */

export async function createButton(){
    const filtres = document.getElementById('filter');

    
    const filterButtonTous = document.createElement('button');
    filterButtonTous.textContent = "tous";
    filterButtonTous.id = 0;
    filterButtonTous.classList.add("button-general", "selectAllBtn")

    filterButtonTous.addEventListener("click", () => {
        filtreObjet(filterButtonTous.id);
    });
    filtres.appendChild(filterButtonTous);  

    for (const filterCategory of categories) {
        
        const filterButton = document.createElement('button');
        filterButton.textContent = filterCategory.name;
        filterButton.id = filterCategory.id;
        filterButton.classList.add("selectAll", "button-general", "selectAllBtn");

        filterButton.addEventListener("click", () => {
            filtreObjet(filterCategory.id);
        });
        
        filtres.appendChild(filterButton);   
    }

    
}

//** FONCTION DE FILTRAGE DES BOUTONS */

function filtreObjet(categoryId){
    const displayObjet = document.querySelectorAll('div.gallery figure');

    displayObjet.forEach((element)=> {
        element.style.display = "none";
        if(categoryId == element.dataset.cat){
            element.style.display = "block";
        }else{
            if(categoryId == 0){
                element.style.display = "block";
            }else{
                element.style.display = "none";
            }
        }
    })
}



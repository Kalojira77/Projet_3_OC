// Gestion de l'affichage des projet

// affichage de la galerie 

import { getWorks } from './api.js'; 
import { getCategories } from './api.js';

const categories = await getCategories();

export async function displayWorks(){
    const works = await getWorks();
    const gallery = document.getElementById('gallery');

    for (let i = 0 ; i < works.length; i++) {
        const projets = works[i];

        const workElement = document.createElement('figure');
        const workImage = document.createElement('img');
        const workTitle = document.createElement('figcaption');

        workElement.classList.add('galleryItem');
        workElement.id = projets.category.id;
        workImage.src = projets.imageUrl;
        workImage.alt = projets.title;
        workTitle.textContent = projets.title;

        workElement.appendChild(workImage);
        workElement.appendChild(workTitle);
        gallery.appendChild(workElement);
    }
    document.addEventListener('DOMContentLoaded', displayWorks);
}

// Creation et affichage des fonctionnalités de tri 

export async function createButton(){
    const filtres = document.getElementById('filter');

    for (let i = 0 ; i < categories.length; i++) {
        const filterCategory = categories[i];

        const filterButton = document.createElement('button');
        filterButton.textContent = filterCategory.name;
        filterButton.id = filterCategory.id;
        filterButton.classList.add("selectAll");

        filtres.appendChild(filterButton);       
    }
    
    const filterButtonTous = document.createElement('button');
    filterButtonTous.textContent = "tous";
    filterButtonTous.id = categories.length+1;
    filtres.appendChild(filterButtonTous);  
    
}

function filtreObjet(){
    const displayObjet = document.querySelectorAll('div.gallery figure');

    displayObjet.forEach((element)=>{
        element.style.display = 'none';
        if(element.id == this.id){
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

export function listenerButton(){
    for (let i = 0; i < categories.length; i++) {
        document.getElementById(i+1).addEventListener("click", filtreObjet);
   }
   document.getElementById(categories.length+1).addEventListener("click",filtreObjetAll);
}

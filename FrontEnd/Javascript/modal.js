// MODAL 
import { getWorks } from './api.js'; 

const works = await getWorks();


export async function modalOpen(){
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalButton = document.getElementById("modal-button");

    modalGallery();

    modal.style.display = "flex";
    modalTitle.innerHTML = "<h3>Galerie Photo</h3>"
  }

//   function modalAddWork();
//   // ouvre la deuxièmre modale lorsqu'on clique sur le bouton "ajout photo"

//   function addWork();


async function modalGallery(){

    const modalContent = document.getElementById("modal-content");

    if (!works || works.length === 0) {
        modalContent.innerHTML = "<p>Aucun travail disponible.</p>";
        return;
    }
    modalContent.innerHTML = "";

    works.forEach(work => {
        const workItem = document.createElement("div");
        workItem.classList.add("work-item");

        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;

        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash-can", "delete-icon");

        workItem.appendChild(img);
        workItem.appendChild(icon);
        modalContent.appendChild(workItem);
    });
  }



  // affiche le contenu dynamiques des travaux récupérés sur le serveur

//   function deleteWork();
//   // Supprime un élément work en fonction de son id.

function modalHide(){
    modal.style.display = "none";
}

function modalClose(){
const closeIcon = document.getElementById("close-icon");
const modal = document.getElementById("modal");

    if (closeIcon) {
        closeIcon.addEventListener("click", () => {
            modalHide();
        })
    }

    modal.addEventListener("click", (event) => {
        if (modal.contains(event.target)) {
            modalHide();
        }
    });
};

modalClose();


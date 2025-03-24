
// MODAL 

// Import des fonctions depuis api.js

import { getCategories, getWorks, addWork, deleteWork } from './api.js'; 

// Declaration des variables globales

const works = await getWorks();

const modal = document.getElementById("modal");
const modalFirst = document.getElementById("first-modal");
const modalSecond = document.getElementById("second-modal");
const modalTitle = document.getElementById("modal-title");
const modalFirstBtn = document.getElementById("modal-button");
const overlay = document.getElementById("overlay");
const modalContent = document.getElementById("modal-content");

// fonction qui ouvre la modale

export async function modalOpen(){
   
      if (modalFirstBtn) {
        modalFirstBtn.addEventListener("click", () => {
          modalSwitch();
        });
      }
    
    // overlay.style.display = "block";
    modal.style.display = "flex";
    modalFirst.style.display ="block";
    modalSecond.style.display ="none";
    modalTitle.innerHTML = "<h3>Galerie Photo</h3>"

    modalGallery();
    modalClose();
    modalReturn();
  }

// Fonction qui créer la galerie dans la première modale

async function modalGallery(){
    console.log("génération de la galerie")

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

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
        deleteIcon.setAttribute("data-id", work.id);

        deleteIcon.addEventListener("click", async () => {
          const workId = work.id;
          console.log("Suppression de l'élément avec l'ID :", workId);
          await deleteWork(workId);
          updateGallery();
        });

        workItem.appendChild(img);
        workItem.appendChild(deleteIcon);
        modalContent.appendChild(workItem);
    });
  }

// Fonction qui ferme la modale

function modalHide(){
  if (modal /*&& overlay*/) {
    modal.style.display = "none";  
    overlay.style.display = "none";  
  }
}

// Fonction permettant de donner les conditions d'execution de la fonction de fermeture de la modale (ne fonctionne pas avec l'overlay)

function modalClose(){
  console.log("Closing modal possibility")
  const closeIcon1 = document.getElementById("close-icon1");
  const closeIcon2 = document.getElementById("close-icon2");

    if (closeIcon1) {
        closeIcon1.addEventListener("click", modalHide);
        console.log("-> icone1")
      }
    if (closeIcon2) {
      closeIcon2.addEventListener("click", modalHide);
      console.log("-> icone2")
    }
    // if (overlay) {
    //   overlay.addEventListener("click", (event) => {
    //     console.log("overlay event");
    //     if (event.target === overlay){
    //       modalHide();
    //     }
    //   });
    // }         
};


// Fonction permettant le passage de la modale 1 à la modale 2

function modalSwitch(){
  modalFirst.style.display = "none";
  modalSecond.style.display = "block";
}

async function modalGetCategory() {
  try {
    const category = await getCategories();
    const categorySelector = document.getElementById("category");

    if (category) {
      category.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorySelector.appendChild(option);
      });
    } else {
      console.log("Aucune catégorie disponible")
    }
  } catch (error) {
    console.error("Erreur dans modalGetCategory:", error);
  }
}

// Fonction de retour à la première modale

function modalReturn(){
  const returnBtn = document.getElementById("return");  

  if (returnBtn) {
    returnBtn.addEventListener("click", () => {
      modalFirst.style.display = "block";   
      modalSecond.style.display = "none";  
    });
  }
}

// Fonction qui récupère les informations dans le formulaire de la 2nd modale et les envoie vers addWork ./api/works

function getFormContent () {
  console.log("entrée")
  document.getElementById("submit-btn").addEventListener("click", async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById("photo");
    const titleInput = document.getElementById("title");
    const categoryInput = document.getElementById("category");

    if (fileInput.files.length > 0) {
      const selectedImage = fileInput.files[0];  
      const title = titleInput.value;
      const categoryId = categoryInput.value;

      await addWork(title, selectedImage, categoryId);

    } else {
      console.error("Aucune image sélectionnée");
    }
  })
}

document.addEventListener("DOMContentLoaded", function () {
  getFormContent();
  modalGetCategory();
});





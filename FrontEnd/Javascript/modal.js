
// MODAL 

// Import des fonctions depuis api.js

import { getCategories, getWorks, addWork, deleteWork } from './api.js'; 
import { displayWorks } from './home.js';

// Declaration des variables globales
// variable works en let pour redefinir la variable après
let works = await getWorks();


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
    // Ajout du clic sur le fond pour fermer la modale
    document.body.addEventListener("click", (event) => {
      const modal = document.querySelector("#modal");
      if (event.target === modal) {
        modalHide();
      }
    });

  overlay.style.display = "block";
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
  // Vidage de la galerie avant de la remplir
  modalContent.innerHTML = "";
  if (!works || works.length === 0) {
      modalContent.innerHTML = "<p>Aucun travail disponible.</p>";
      return;
  }
  modalContent.innerHTML = "";
  worksUpdate(works);
  displayWorks();
}

function worksUpdate(works){
  
  works.forEach(work => {
      const workItem = document.createElement("div");
      workItem.classList.add("work-item");

      const img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
      deleteIcon.setAttribute("data-id", work.id);

      deleteIcon.addEventListener("click", async (element) => {
        console.log("Tu as cliqué sur supprimé")
        await deleteWork(element.target.dataset.id);
        deleteParentByDatasetId(element.target);
        displayWorks();
      });
      workItem.appendChild(img);
      workItem.appendChild(deleteIcon);
      modalContent.appendChild(workItem);

  });
}

function deleteParentByDatasetId(child){
  child.parentElement.remove()
}



// Fonction qui ferme la modale

function modalHide(){
  console.log(overlay);
  console.log(modal);
     modal.style = "display : none";  

    overlay.style.display = "none";  
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
    if (overlay) {
      window.addEventListener("click", (event) => {
        if (event.target.id === "overlay"){
          console.log("overlay event");
          modalHide();
        }

      });
    }         
};


// Fonction permettant le passage de la modale 1 à la modale 2

function modalSwitch(){
  modalFirst.style.display = "none";
  modalSecond.style.display = "block";
}

export async function modalGetCategory() {
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
   return;
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

export async function getFormContent (event) {
    event.preventDefault();
    const fileInput = document.getElementById("photo");
    const titleInput = document.getElementById("title");
    const categoryInput = document.getElementById("category");

    if (fileInput.files.length > 0) {
      const selectedImage = fileInput.files[0];  
      const title = titleInput.value;
      const categoryId = categoryInput.value;

      await addWork(title, selectedImage, categoryId);
      works = await getWorks();
      modalGallery();
      displayWorks();

      const form = document.getElementById("add-photo-form"); 
      form.reset()
      const selectImage = document.getElementById("select-img");
      const imagePreview = document.getElementById("preview-image");
      selectImage.style.display = "flex";
      imagePreview.style.display = "none";

    } else {
      console.error("Aucune image sélectionnée");
    }
}

/**  switch entre l'affichage [ajout photo] et [la preview] */
function updatePreview(imageSrc) {
  const imagePreview = document.getElementById("preview-image");
  const selectImage = document.getElementById("select-img");

  if (imagePreview) {
    imagePreview.src = imageSrc;
    imagePreview.alt = "Aperçu de l'image";
    imagePreview.style.display = "flex";
  }

  if (selectImage) {
    selectImage.style.display = "none";
  }
}

/** Fonction qui récupère l'input file et le rend lisible directement par le navigateur sans upload */
function readFile(file, callback) {
  /* vérifie si un fichier est transmis || si c'est bien une image */ 
  if (!file || !file.type.startsWith("image/")) {
    console.warn("Fichier non valide. Veuillez sélectionner une image.");
    return;
  }

  /* transforme le fichier en chaine de caractère qui peut être affiché par le navigateur*/
  const reader = new FileReader();
  reader.onload = (event) => callback(event.target.result);
  reader.readAsDataURL(file);
}

/* execute readFile puis updatePreview en transmettant les données necessaire à l'affichage de l'image*/
function imagePreview(event) {
  const file = event.target.files[0];
  readFile(file, (imageSrc) => updatePreview(imageSrc, "Aperçu de l'image"));
}



export function setEventModal() {
/* simule l'évenement de click sur la zone de drop de fichier et l'associe au bouton -modale2- */
document.getElementById("upload-button").addEventListener("click", function () {
  document.getElementById("photo").click(); 
});

/* en cas de modif de l'input id=photo lancer fonction imagePreview */
document.getElementById("photo").addEventListener("change", imagePreview);

/* quand on click sur le submit-btn -modale2- on lance la fonction getFormContent */
document.getElementById("submit-btn").addEventListener("click", (event) => getFormContent(event)
);
}







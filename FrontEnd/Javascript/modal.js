/** MODALES */

import { getCategories, getWorks, addWork, deleteWork } from "./api.js";
import { displayWorks } from "./home.js";

let works = await getWorks();

const modal = document.getElementById("modal");
const modalFirst = document.getElementById("first-modal");
const modalSecond = document.getElementById("second-modal");
const modalTitle = document.getElementById("modal-title");
const modalFirstBtn = document.getElementById("modal-button");
const overlay = document.getElementById("overlay");
const modalContent = document.getElementById("modal-content");
const dropZone = document.getElementById("drop-zone");

/** fonction qui ouvre la modale */

export async function modalOpen() {
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
  modalFirst.style.display = "flex";
  modalSecond.style.display = "none";
  modalTitle.innerHTML = "<h3>Galerie Photo</h3>";

  modalGallery();
  modalClose();
  modalReturn();
}

/** Fonction qui créer la galerie dans la première modale */

async function modalGallery() {
  console.log("génération de la galerie");
  modalContent.innerHTML = "";
  if (!works || works.length === 0) {
    modalContent.innerHTML = "<p>Aucun travail disponible.</p>";
    return;
  }
  modalContent.innerHTML = "";
  worksUpdate(works);
  displayWorks();
}

function worksUpdate(works) {
  console.log("worksUpdate");
  works.forEach((work) => {
    const workItem = document.createElement("div");
    workItem.classList.add("work-item");

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
    deleteIcon.setAttribute("data-id", work.id);

    deleteIcon.addEventListener("click", async (element) => {
      await deleteWork(element.target.dataset.id);
      deleteParentByDatasetId(element.target);
      displayWorks();
    });
    workItem.appendChild(img);
    workItem.appendChild(deleteIcon);
    modalContent.appendChild(workItem);
  });
}

function deleteParentByDatasetId(child) {
  child.parentElement.remove();
}

/** Fonction qui ferme la modale */

function modalHide() {
  modal.style = "display : none";
  overlay.style.display = "none";
}

/** conditions d'execution de fermeture de la modale  */

function modalClose() {
  const closeIcon1 = document.getElementById("close-icon1");
  const closeIcon2 = document.getElementById("close-icon2");

  if (closeIcon1) {
    closeIcon1.addEventListener("click", modalHide);
  }
  if (closeIcon2) {
    closeIcon2.addEventListener("click", modalHide);
  }
  if (overlay) {
    window.addEventListener("click", (event) => {
      if (event.target.id === "overlay") {
        modalHide();
      }
    });
  }
}

/** Fonction permettant le passage de la modale 1 à la modale 2 */

function modalSwitch() {
  modalFirst.style.display = "none";
  modalSecond.style.display = "flex";
}

export async function modalGetCategory() {
  try {
    const category = await getCategories();
    const categorySelector = document.getElementById("category");

    if (category) {
      category.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorySelector.appendChild(option);
      });
    } else {
      console.log("Aucune catégorie disponible");
    }
  } catch (error) {
    return;
  }
}

/** Fonction de retour à la première modale */

function modalReturn() {
  const returnBtn = document.getElementById("return");

  if (returnBtn) {
    returnBtn.addEventListener("click", () => {
      modalFirst.style.display = "flex";
      modalSecond.style.display = "none";
    });
  }
}

/** Fonction qui récupère les informations dans le formulaire de la 2nd modale et les envoie vers addWork ./api/works */

export async function getFormContent(event) {
  event.preventDefault();
  const fileInput = document.getElementById("photo");
  const titleInput = document.getElementById("title");
  const categoryInput = document.getElementById("category");

  if (fileInput.files.length > 0) {
    if (titleInput.value != "") {
      if (categoryInput.value != "0") {
        const selectedImage = fileInput.files[0];
        const title = titleInput.value;
        const categoryId = categoryInput.value;

        await addWork(title, selectedImage, categoryId);
        works = await getWorks();
        modalGallery();
        displayWorks();

        const form = document.getElementById("add-photo-form");
        form.reset();
        const selectImage = document.getElementById("select-img");
        const imagePreview = document.getElementById("preview-image");
        selectImage.style.display = "flex";
        imagePreview.style.display = "none";
        let crossIcon = document.getElementById("crossIcon");
        crossIcon.style.display = "none";
        const modalButton = document.getElementById("submit-btn");
        modalButton.classList.add("lock-submit-btn");
        modalButton.classList.remove("unlock-submit-btn");
      } else {
        console.error("La catégorie n'est pas renseigné");
      }
    } else {
      console.error("Le titre doit etre renseigné");
    }
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
    imagePreview.style.display = "block";
    imagePreview.style.position = "relative"; // S'assure que l'image est bien positionnée

    // Cache la zone de sélection d'image
    if (selectImage) {
      selectImage.style.display = "none";
    }

    // Vérifie si l'icône existe déjà, sinon on la crée
    let crossIcon = document.getElementById("crossIcon");

    if (imagePreview.style.display == "block") {
      crossIcon.style.display = "flex";
      // Ajoute un événement pour supprimer l'image lorsqu'on clique sur la croix
      crossIcon.addEventListener("click", resetForm);
    }
  }
}

/** Réinitialise le formulaire modale 2 */

function resetForm() {
  const form = document.getElementById("add-photo-form");
  form.reset();

  const imagePreview = document.getElementById("preview-image");
  if (imagePreview) {
    imagePreview.style.display = "none"; // Cache l’image
  }

  const selectImage = document.getElementById("select-img");
  if (selectImage) {
    selectImage.style.display = "flex"; // Réaffiche la zone de sélection
  }
  let crossIcon = document.getElementById("crossIcon");
  crossIcon.style.display = "none";
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
  document
    .getElementById("upload-button")
    .addEventListener("click", function () {
      document.getElementById("photo").click();
    });

  /* en cas de modif de l'input id=photo lancer fonction imagePreview */
  document.getElementById("photo").addEventListener("change", imagePreview);

  /* quand on click sur le submit-btn -modale2- on lance la fonction getFormContent */
  document
    .getElementById("submit-btn")
    .addEventListener("click", (event) => getFormContent(event));

  /** gère l'affichage de l'image preview */

  document.getElementById("photo").addEventListener("change", (event) => {
    if (document.getElementById("photo").files.length > 0) {
      dropZone.style.height = "auto";
    } else {
      dropZone.style.height = "50%";
    }
    verifButtonAndChange();
  });
  document.getElementById("title").addEventListener("input", (event) => {
    verifButtonAndChange();
  });
  document.getElementById("title").addEventListener("cut", (event) => {
    verifButtonAndChange();
  });
  document.getElementById("category").addEventListener("change", (event) => {
    verifButtonAndChange();
  });
}

/** gère le bouton de validation du formulaire */

function verifButtonAndChange() {
  const modalButton = document.getElementById("submit-btn");
  if (document.getElementById("photo").files.length > 0) {
    if (document.getElementById("title").value != "") {
      if (document.getElementById("category").value != "0") {
        modalButton.classList.add("unlock-submit-btn");
        modalButton.classList.remove("lock-submit-btn");
      }
    }
  }
  if (
    !(document.getElementById("photo").files.length > 0) ||
    !(document.getElementById("title").value != "") ||
    !(document.getElementById("category").value != "0")
  ) {
    modalButton.classList.add("lock-submit-btn");
    modalButton.classList.remove("unlock-submit-btn");
  }
}

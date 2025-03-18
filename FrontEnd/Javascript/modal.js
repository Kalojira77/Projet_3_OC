// MODAL 
import { getWorks } from './api.js'; 

export async function modalContent(){
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-content");
    const modalButton = document.getElementById("modal-button");

    modal.style.display = "flex";
    modalTitle.innerHTML = "<h3>Galerie Photo</h3>"

    //  Récupération des travaux via getWorks()
    const works = await getWorks();

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
  
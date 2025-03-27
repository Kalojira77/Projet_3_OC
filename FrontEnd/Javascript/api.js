// Gestion des appels API


// Fonction pour récupérer les catégories

export async function getCategories() {
  try {
    const reponse = await fetch('http://localhost:5678/api/categories');
    const categories = await reponse.json();
    return categories;
  } catch (error) {
    console.error("categories n'est pas disponible ou ne retourne rien");
  }
  
}

// Fonction qui récupère le contenu de Works

export async function getWorks() {
  try {
    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();
    return works;
  } catch (error) {
    console.error("works n'est pas disponible ou ne retourne rien");
  }
}


// fonction qui ajoute le nouveau projet à Works.

export async function addWork(title, selectedImage, categoryId) {
  console.log(selectedImage + "/" + title + "/" + categoryId);

  const formData = new FormData();
  formData.append("image", selectedImage); 
  formData.append("title", title);
  formData.append("category", categoryId);

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        Accept : "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });

    const result = await response.json();
    console.log(result);

  } catch (error) {
    console.error("La requête a eu une erreur: " + error);
  }
};

// Fonction qui supprime le projet selon son id dans Works

export async function deleteWork(id) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      }
    });

    if (!response.ok) {
      console.error("Erreur lors de la suppression:", response.status);
      return; // throw new Error
    }

    console.log(`Work ${id} supprimé avec succès`);

  } catch (error) {
    console.error("Erreur dans la fonction deleteWork:", error);
  }
}


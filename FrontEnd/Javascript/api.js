// Gestion des appels API

// Fonction pour récupérer les travaux et les catégories

export async function getCategories() {
  try {
    const reponse = await fetch('http://localhost:5678/api/categories');
    const categories = await reponse.json();
    return categories;
  } catch (error) {
    console.log("categories n'est pas disponible ou ne retourne rien");
  }
  
}

export async function getWorks() {
  try {
    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();
    return works;
  } catch (error) {
    console.log("works n'est pas disponible ou ne retourne rien");
  }
}


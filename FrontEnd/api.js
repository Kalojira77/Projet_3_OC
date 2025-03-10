// Gestion des appels API

// Fonction pour récupérer les travaux et les catégories

export async function getCategories() {
  const reponse = await fetch('http://localhost:5678/api/categories');
  const categories = await reponse.json();
  return categories
}

  export async function getWorks() {
    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();
    return works
  }



async function getProduit() {
    try {
      const response = await fetch('http://localhost/Stage/VivaFleurs/VivaFleurs/api/BDD.php');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
      throw error; // Pour propager l'erreur à l'appelant, si nécessaire
    }
}

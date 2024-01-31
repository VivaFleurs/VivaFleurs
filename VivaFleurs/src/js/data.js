

async function getProduit() {
    try {
      const response = await fetch('http://localhost/BDD.php');
      const data = await response.json();
      
      // Traiter les données reçues
      console.log(data);
      
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
      throw error; // Pour propager l'erreur à l'appelant, si nécessaire
    }
}


function setProduit(){

}
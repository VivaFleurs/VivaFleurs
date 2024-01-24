getProduit().then(data => {
    console.log(data)

    const tableauHTML = `
    <table>
      <thead>
        <tr>
          <th>ID Produit</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Composotion</th>
          <th>Prix</th>
          <th>Entretien</th>
          <th>Photo 1</th>
          <th>Photo 2</th>
          <th>Photo 3</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(produit => `
          <tr>
            <td>${produit.id_produit}</td>
            <td>${produit.nom}</td>
            <td>${produit.description}</td>
            <td>${produit.composition}</td>
            <td>${produit.prix}</td>
            <td>${produit.entretien}</td>
            <td><img src="${produit.photo1}" alt="Photo 1" style="width: 100px; height: 100px;"></td>
            <td><img src="${produit.photo2}" alt="Photo 2" style="width: 100px; height: 100px;"></td>
            <td><img src="${produit.photo3}" alt="Photo 3" style="width: 100+0px; height: 100px;"></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

    // Injecter le tableau HTML dans l'élément avec l'ID "resultat"
    document.getElementById('container').innerHTML = tableauHTML;

    // Masquer l'élément avec l'ID "gif"
    document.getElementById('gif').style.display = "none";
});




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


// Creation formulaire au clic sur d'ajout

function openPopup() {
  document.getElementById('popup-container').style.display = 'block';
  document.getElementById('popup-overlay').style.display = 'block';
  document.getElementById('ajout').addEventListener("submit", (e) => {
  console.log('1');
    const photo1 = e.target.files[0];
    if (photo1) {
      console.log('2');

      const reader = new FileReader();

      reader.onload = function (e) {
        console.log('3');
          const imageData = e.target.result;
      };
      console.log('4');

      reader.readAsDataURL(photo1);
  }
  console.log('5');
  
    const photo2 = e.target.files[1];
    const photo3 = e.target.files[2];   
  })
}

function closePopup() {
  document.getElementById('popup-container').style.display = 'none';
  document.getElementById('popup-overlay').style.display = 'none';
}



function sendCode() {

  var email = $('#email').val();
  var password = $('#password').val();


  $.ajax({
    type: 'POST',
    url: 'http://localhost/api.php',
    data: {
      action: 'generateCode',
      email: email,
      password: password
    },
    success: function(response) {
      $('#code-input-container').show();
      $('#login-form').hide();
    },
    error: function(error) {
      console.error('Erreur lors de la génération du code :', error);
    }
  });
}

function verifyCode() {

  var code = $('#code').val();

  $.ajax({
    type: 'POST',
    url: 'http://localhost/api.php', 
    data: {
      action: 'verifyCode',
      code: code
    },
    success: function(response) {
      console.log(response.success)
      if (response.success) {
        $('#popup-container').hide();
        $('#popup-overlay').hide();
        
      } else {
        alert('Code incorrect. Veuillez réessayer.');
      }
    },
    error: function(error) {
      console.error('Erreur lors de la vérification du code :', error);
    }
  });
}


function ajoutProduit() {

  let nom = document.getElementById('nom').value
  let description = document.getElementById('description').value
  let composition = document.getElementById('composition').value
  let prix = document.getElementById('prix').value
  let entretient = document.getElementById('entretient').value
  let categorie = document.getElementById('categorie').value
  console.log(nom)
  console.log(description)
  console.log(composition)
  console.log(prix)
  console.log(entretient)
  console.log(categorie)
  /* la récupération est a faire une fois qu'elle seront enregistrer sur le serveur */
  let photo1 = "";
  let photo2 = "";
  let photo3 = "";


  $.ajax({
    type: 'POST',
    url: 'http://localhost/api.php', 
    data: {
      action: 'ajoutProduit',
      nom: nom,
      description: description,
      composition: composition,
      prix:prix,
      entretient:entretient,
      categorie:categorie,
      photo1:photo1,
      photo2:photo2,
      photo3:photo3,
    },
    success: function(response) {
      console.log(response.success)
      if (response.success) {
        alert("Produit ajouté avec succés !");
        
      } else {
        alert('Code incorrect. Veuillez réessayer.');
      }
    },
    error: function(error) {
      console.error('Erreur lors de l\'ajout du produit :', error);
    }
  });
}







function openPopup() {
  document.getElementById('popup-container').style.display = 'block';
  document.getElementById('popup-overlay').style.display = 'block';
}

function closePopup() {
  document.getElementById('popup-container').style.display = 'none';
  document.getElementById('popup-overlay').style.display = 'none';
}




















async function getProduit() {
  try {
    const response = await fetch('http://localhost/BDD.php');
    const data = await response.json();
    
    // Traiter les données reçues       
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    throw error; // Pour propager l'erreur à l'appelant, si nécessaire
  }
}




getProduit().then(data => {

    const tableauHTML = `
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Composotion</th>
          <th>Prix</th>
          <th>Entretien</th>
          <th>Categorie</th>
          <th>Photo 1</th>
          <th>Photo 2</th>
          <th>Photo 3</th>
          <th>Afficher</th>
          <th>Événement</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(produit => `
          <tr>
            <td>${produit.nom}</td>
            <td>${produit.description}</td>
            <td>${produit.composition}</td>
            <td>${produit.prix}€</td>
            <td>${produit.entretien}</td>
            <td>${produit.categorie}</td>
            <td><img src="${produit.photo1}" alt="Photo 1" style="width: 100px; height: 100px;"></td>
            <td><img src="${produit.photo2}" alt="Photo 2" style="width: 100px; height: 100px;"></td>
            <td><img src="${produit.photo3}" alt="Photo 3" style="width: 100+0px; height: 100px;"></td>
            <td><button onclick="toggleVisibilityAfficher(${produit.id_produit}, ${produit.afficher})">${produit.afficher === 1 ? 'On' : 'Off'}</button></td>
            <td><button onclick="toggleVisibilityEvenement(${produit.id_produit}, ${produit.evenement})">${produit.evenement === 1 ? 'On' : 'Off'}</button></td>
            <td><button onclick="supprimer(${produit.id_produit})">Supprimer</button> <button onclick="">modifier</button></td>
        `).join('')}
      </tbody>
    </table>
  `;

  

    // Injecter le tableau HTML dans l'élément avec l'ID "resultat"
    document.getElementById('container').innerHTML = tableauHTML;

    // Masquer l'élément avec l'ID "gif"
    document.getElementById('gif').style.display = "none";
});


function toggleVisibilityAfficher(productId, currentStatus) {
  if (currentStatus === 1) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost/api.php', 
      data: {
        action: 'toggleVisibilityAfficher',
        id: productId,
        toggle: "off"
      },
      success: function(response) {
        console.log(response.success)
        if (response.success) {
          
          alert("Produit cacher avec succés !");
          location.reload();
          
        }
      },
      error: function(error) {
        console.error('Erreur lors du masquage du produit :', error);
      }
    });
  } else {
    $.ajax({
      type: 'POST',
      url: 'http://localhost/api.php', 
      data: {
        action: 'toggleVisibilityAfficher',
        id: productId,
        toggle: "on"
      },
      success: function(response) {
        console.log(response.success)
        if (response.success) {
          alert("Produit afficher avec succés !");
          location.reload();
          
        } else {
          alert('Code incorrect. Veuillez réessayer.');
        }
      },
      error: function(error) {
        console.error('Erreur lors de l\'affichage du produit :', error);
      }
    });
  }
}


function toggleVisibilityEvenement(productId, currentStatus) {
  if (currentStatus === 1) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost/api.php', 
      data: {
        action: 'toggleVisibilityEvenement',
        id: productId,
        toggle: "off"
      },
      success: function(response) {
        console.log(response.success)
        if (response.success) {
          
          alert("Produit cacher avec succés !");
          location.reload();
          
        }
      },
      error: function(error) {
        console.error('Erreur lors du masquage du produit :', error);
      }
    });
  } else {
    $.ajax({
      type: 'POST',
      url: 'http://localhost/api.php', 
      data: {
        action: 'toggleVisibilityEvenement',
        id: productId,
        toggle: "on"
      },
      success: function(response) {
        console.log(response.success)
        if (response.success) {
          alert("Produit afficher avec succés !");
          location.reload();
          
        } else {
          alert('Code incorrect. Veuillez réessayer.');
        }
      },
      error: function(error) {
        console.error('Erreur lors de l\'affichage du produit :', error);
      }
    });
  }
}

function supprimer(productId){
  $.ajax({
    type: 'POST',
    url: 'http://localhost/api.php', 
    data: {
      action: 'supprimerProduit',
      id: productId
    },
    success: function(response) {
      console.log(response.success)
      if (response.success) {
        alert("Produit supprimé avec succés !");
        
      }
    },
    error: function(error) {
      console.error('Erreur lors de la suppression du produit :', error);
    }
  });
}

// Creation formulaire au clic sur d'ajout
document.getElementById('ajout').addEventListener("submit", async (e) => {
  e.preventDefault();


});


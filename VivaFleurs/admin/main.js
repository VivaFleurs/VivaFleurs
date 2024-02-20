

function sendCode() {

  var email = $('#email').val();
  var password = $('#password').val();


  $.ajax({
    type: 'POST',
    url: 'http://localhost/VivaFleurs/VivaFleurs/VivaFleurs/api/api.php',
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
    url: 'http://localhost/VivaFleurs/VivaFleurs/VivaFleurs/api/api.php', 
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

  var images = [];
  for (var i = 1; i <= 3; i++) {
    var inputId = "image" + i;
    var fileInput = document.getElementById(inputId);
    if (fileInput.files.length > 0) {
      images.push(fileInput.files[0]);
    }
  }



  var formData = new FormData();
  formData.append('action', 'ajoutProduit');
  formData.append('nom', nom);
  formData.append('description', description);
  formData.append('composition', composition);
  formData.append('prix', prix);
  formData.append('entretient', entretient);
  formData.append('categorie', categorie);
  for (var i = 0; i < images.length; i++) {
    formData.append('images[]', images[i]);
  }
  $.ajax({
    type: 'POST',
    url: 'http://localhost/VivaFleurs/VivaFleurs/VivaFleurs/api/api.php', 
    data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
      console.log(response.success)
      if (response.success) {
        alert("Produit ajouté avec succés !");
        location.reload();
        
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


function openPopupModifierEvent(){
  document.getElementById('popup-ModifEvenement-container').style.display='block';
  document.getElementById('popup-ModifEvenement-overlay').style.display = 'block';
}

function closePopupModifEvenement(){
  document.getElementById('popup-ModifEvenement-container').style.display = 'none';
  document.getElementById('popup-ModifEvenement-overlay').style.display = 'none';
}














async function getProduit() {
  try {
    const response = await fetch('http://localhost/VivaFleurs/VivaFleurs/VivaFleurs/api/BDD.php');
    const data = await response.json();
    
    // Traiter les données reçues       
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    throw error; // Pour propager l'erreur à l'appelant, si nécessaire
  }
}



var currentURL = window.location.href;

if (currentURL.includes("")) {
 


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
              <td><button class="btn" onclick="toggleVisibilityAfficher(${produit.id_produit}, ${produit.afficher})">${produit.afficher === 1 ? 'On' : 'Off'}</button></td>
              <td><button class="btn" onclick="toggleVisibilityEvenement(${produit.id_produit}, ${produit.evenement})">${produit.evenement === 1 ? 'On' : 'Off'}</button></td>
              <td><button class="btn" onclick="supprimer(${produit.id_produit})">Supprimer</button> <button class="btn" onclick="modifier(${produit.id_produit})">modifier</button></td>
          `).join('')}
        </tbody>
      </table>
    `;

    

      // Injecter le tableau HTML dans l'élément avec l'ID "resultat"
      document.getElementById('container').innerHTML = tableauHTML;

      // Masquer l'élément avec l'ID "gif"
      document.getElementById('gif').style.display = "none";
  });



  // Creation formulaire au clic sur d'ajout
  document.getElementById('ajout').addEventListener("submit", async (e) => {
    e.preventDefault();
  });

  document.getElementById('form-modification').addEventListener("submit", async (e) => {
    e.preventDefault();
  });

  document.getElementById('form-event').addEventListener("submit", async (e) => {
    e.preventDefault();
  });
}


function modifierEvent(){
  img = document.getElementById('id-img').value;
  h1 = document.getElementById('id-h1').value;
  p = document.getElementById('id-p').value;
  var formData = new FormData();
  formData.append('action', 'modifierEvent');
  formData.append('image', img);
  formData.append('titre', h1);
  formData.append('paragraphe', p);
  
  for (var pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }




  $.ajax({
    type: 'POST',
    url: 'http://localhost/VivaFleurs/VivaFleurs/VivaFleurs/api/api.php', 
    data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
      console.log(response.success)
      if (response.success) {
        alert("Event modifié avec succés !");
        //location.reload();
        
      }
    },
    error: function(error) {
      console.error('Erreur lors de la modification de la page event :', error);
    }
  });
}







function toggleVisibilityAfficher(productId, currentStatus) {
  if (currentStatus === 1) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost/VivaFleurs/VivaFleurs/VivaFleurs/api/api.php', 
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
      url: 'http://localhost/VivaFleurs/VivaFleurs/VivaFleurs/api/api.php', 
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
      url: 'http://localhost/VivaFleurs/VivaFleurs/VivaFleurs/api/api.php', 
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
      url: 'http://localhost/VivaFleurs/VivaFleurs/VivaFleurs/api/api.php', 
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
    url: 'http://localhost/VivaFleurs/VivaFleurs/VivaFleurs/api/api.php', 
    data: {
      action: 'supprimerProduit',
      id: productId
    },
    success: function(response) {
      console.log(response.success)
      if (response.success) {
        alert("Produit supprimé avec succés !");
        location.reload();
        
      }
    },
    error: function(error) {
      console.error('Erreur lors de la suppression du produit :', error);
    }
  });
}





function modifier(id_produit) {
  getProduit().then(data => {
    // Recherche du produit dans le tableau de données
    var produit = data.find(function(item) {
      return item.id_produit === id_produit;
    });

    // Remplissage du formulaire avec les valeurs du produit
    document.getElementById("id_produit").value = produit.id_produit;
    document.getElementById("nom-modif").value = produit.nom;
    document.getElementById("description-modif").value = produit.description;
    document.getElementById("composition-modif").value = produit.composition;
    document.getElementById("prix-modif").value = produit.prix;
    document.getElementById("entretien-modif").value = produit.entretien;
    if(produit.categorie == 'bouquet'){
      document.getElementById("categorie-modif").value = 1;
    }else if(produit.categorie == 'fleur unique'){
      document.getElementById("categorie-modif").value = 2;
    }else if(produit.categorie == 'plante'){
      document.getElementById("categorie-modif").value = 3;
    }else if(produit.categorie == 'bouquet sec'){
      document.getElementById("categorie-modif").value = 4;
    }else{
      document.getElementById("categorie-modif").value = 5;
    }
    
    document.getElementById("photo1-modif").src = produit.photo1;
    document.getElementById("photo2-modif").src = produit.photo2;
    document.getElementById("photo3-modif").src = produit.photo3;

    document.getElementById('photo1-modif-btn').addEventListener('change', ()=>{
      document.getElementById("photo1-modif").style.display = "none"
    })
    document.getElementById('photo2-modif-btn').addEventListener('change', ()=>{
      document.getElementById("photo2-modif").style.display = "none"
    })
    document.getElementById('photo3-modif-btn').addEventListener('change', ()=>{
      document.getElementById("photo3-modif").style.display = "none"
    })

    // Affichage de la fenêtre modale
    openModal();
  })
}

function modifierProduit(){
  let id = document.getElementById('id_produit').value
  let nom = document.getElementById('nom-modif').value
  let description = document.getElementById('description-modif').value
  let composition = document.getElementById('composition-modif').value
  let prix = document.getElementById('prix-modif').value
  let entretient = document.getElementById('entretien-modif').value
  let categorie = document.getElementById('categorie-modif').value

  var images = [];
  var num_images = [];
  if (document.getElementById("photo1-modif").style.display == "none") {
      var fileInput1 = document.getElementById("photo1-modif-btn");
      if (fileInput1.files.length > 0) {
        console.log(fileInput1.files[0])
          images.push(fileInput1.files[0]);
          num_images.push(1);
      }
  } else {
    num_images.push(0);
  }
  
  if (document.getElementById("photo2-modif").style.display == "none") {
      var fileInput2 = document.getElementById("photo2-modif-btn");
      if (fileInput2.files.length > 0) {
        console.log(fileInput2.files[0])
          images.push(fileInput2.files[0]);
          num_images.push(1);
      }
  } else {
    num_images.push(0);
  }
  
  if (document.getElementById("photo3-modif").style.display == "none") {
      var fileInput3 = document.getElementById("photo3-modif-btn");
      if (fileInput3.files.length > 0) {
        console.log(fileInput3.files[0])
          images.push(fileInput3.files[0]);
          num_images.push(1);
      }
  } else {
    num_images.push(0);
  }
  console.log(images);



  var formData = new FormData();
  formData.append('action', 'modifierProduit');
  formData.append('id', id);
  formData.append('nom', nom);
  formData.append('description', description);
  formData.append('composition', composition);
  formData.append('prix', prix);
  formData.append('entretient', entretient);
  formData.append('categorie', categorie);
  for (var i = 0; i < images.length; i++) {
    formData.append('images[]', images[i]);
  }
  for (var j = 0; j < num_images.length; j++) {
    formData.append('num_images[]', num_images[j]);
  }




  $.ajax({
    type: 'POST',
    url: 'http://localhost/VivaFleurs/VivaFleurs/VivaFleurs/api/api.php', 
    data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
      console.log(response.success)
      if (response.success) {
        alert("Produit modifié avec succés !");
        //location.reload();
        
      }
    },
    error: function(error) {
      console.error('Erreur lors de l\'ajout du produit :', error);
    }
  });
}

function openModal() {
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}









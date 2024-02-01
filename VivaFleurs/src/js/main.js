
var currentURL = window.location.href;

if (currentURL.includes("catalogue.html")) {

  var catalogueContainer = document.getElementById('catalogue');


  getProduit().then(data => {

    data.forEach(produit => {

      var produitHTML = `
        <a class="card-link" href="bouquet.html?id=${produit.id_produit}">
          <div class="column">
            <div class="card">
              <img src="${produit.photo1}" alt="">
              <div class="card-text-bas">
                <h2>${produit.nom}</h2>
                <h3>${produit.prix}€</h3>
              </div>
            </div>
            <div class="card-text">
              <h1>${produit.nom}</h1>
              <h2>Description</h2>
              <p>${produit.description}</p>
              <h2>Fleurs :</h2>
              <p>${produit.composition}</p>
            </div>
          </div>
        </a>
      `;

      catalogueContainer.innerHTML += produitHTML;
    });
    document.getElementById('gif').style.display = "none"

  });
}

if (currentURL.includes("bouquet.html")) {
    var bouquetContainer = document.getElementById('container');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    getProduit().then(data => {

      data.forEach(produit => {
          if (produit.id_produit === productId) {
            var produitHTML = `
            <div class="col">
                <div class="row">
                    <img class="image-princ" id="principal" src="${produit.photo1}" alt="">
                </div>
                <div class="images">
                    <img id="image-fleur-1" src="${produit.photo1}" alt="">
                    <img id="image-fleur-2" src="${produit.photo2}" alt="">
                    <img id="image-fleur-3" src="${produit.photo3}" alt="">
                </div>
            </div>
            <div class="col">
                <h1>${produit.nom}</h1>
                
                <h4>Livraison par un fleuriste</h4>
                <span class="border"></span>
                <h3>Description</h3>
                <p>${produit.description}</p>
                <span class="border"></span>
                <h3>Composition</h3>
                <p>${produit.composition}</p>
                <span class="border"></span>
                <h3>Entretien</h3>
                <p>${produit.entretien}</p>
                <span class="border"></span>
                <h3>Prix</h3>
                <p>${produit.prix}€</p>
            </div>
            `;

            photo1 = produit.photo1;
            photo2 = produit.photo2;
            photo3 = produit.photo3;

            bouquetContainer.innerHTML += produitHTML;

            document.getElementById('image-fleur-1').addEventListener("click",()=>{
              document.getElementById('principal').src = `${photo1}`
            })
        
            document.getElementById('image-fleur-2').addEventListener("click",()=>{
                document.getElementById('principal').src = `${photo2}`
            })
        
            document.getElementById('image-fleur-3').addEventListener("click",()=>{
                document.getElementById('principal').src = `${photo3}`
            })
            document.getElementById('gif').style.display = "none"
          }
          

      });
    });
  }

  if(currentURL.includes("faq.html")){
    console.log('coucou')
    document.getElementById('livraison').addEventListener("click",()=>{
      document.getElementById('faq-content').innerHTML=`
      
      <div class="faq-item">
        <div class="faq-titre">
          <h3 id="service-title">1. Qu'est-ce que votre service propose exactement?</h3>
          <span class="rotate" id="arrow"></span>
        </div>
        <p id="service-description>Notre service offre une gamme complète de solutions dans le domaine [insérer le domaine]. Nous nous engageons à fournir [expliquer brièvement la mission].
        </p>

      </div>`

      document.getElementById('arrow').addEventListener("click",()=>{
        document.getElementById('service-description').style.display='flex'
      })
    }
    )
  }

  
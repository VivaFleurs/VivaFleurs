
var currentURL = window.location.href;


///////////////////////////////////////////////////////////////////////////////////////////////////////

//Début page catalogue

///////////////////////////////////////////////////////////////////////////////////////////////////

if (currentURL.includes("catalogue.html")) {
  var catalogueContainer = document.getElementById('catalogue');
  var loadingGif = document.getElementById('gif');
  loadingGif.style.display = "block"; // Afficher l'indicateur de chargement

  getProduit().then(data => {
    // Variables pour stocker les produits par catégorie
    var catalogueHTML = '';

    // Ajout des balises <h1> pour chaque catégorie
    var bouquetHTML = '<div class="row"><h1>Bouquet</h1></div><div class="row">';
    var fleurHTML = '<div class="row"><h1>Fleur unique</h1></div><div class="row">';
    var planteHTML = '<div class="row"><h1>Plante</h1></div><div class="row">';
    var bouquetsecHTML = '<div class="row"><h1>Bouquet sec</h1></div><div class="row">';
    var autreHTML = '<div class="row"><h1>Autre</h1></div><div class="row">';

    // Parcours des données pour classer les produits par catégorie
    data.forEach(produit => {
      if (produit.afficher == 1) {
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

        // Ajout du produit à la catégorie correspondante
        switch (produit.categorie.toLowerCase()) {
          case 'bouquet':
            bouquetHTML += produitHTML;
            break;
          case 'fleur unique':
            fleurHTML += produitHTML;
            break;
          case 'plante':
            planteHTML += produitHTML;
            break;
          case 'bouquet sec':
            bouquetsecHTML += produitHTML;
            break;
          case 'autre':
            autreHTML += produitHTML;
            break;
          default:
            break;
        }
      }
    });

    bouquetHTML += '</div>';
    fleurHTML += '</div>';
    planteHTML += '</div>';
    bouquetsecHTML += '</div>';
    autreHTML += '</div>';

    catalogueHTML += bouquetHTML + fleurHTML + planteHTML + bouquetsecHTML + autreHTML;
    catalogueContainer.innerHTML = catalogueHTML;

    loadingGif.style.display = "none";
  });
}





///////////////////////////////////////////////////////////////////////////////////////////////////////

//Début page bouquet

///////////////////////////////////////////////////////////////////////////////////////////////////


if (currentURL.includes("bouquet.html")) {
    var bouquetContainer = document.getElementById('container');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    getProduit().then(data => {

      data.forEach(produit => {
          if (produit.id_produit == productId) {
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


  ///////////////////////////////////////////////////////////////////////////////////////////////////////

//Début page evenement

///////////////////////////////////////////////////////////////////////////////////////////////////


if (currentURL.includes("evenement.html")) {

  var evenementContainer = document.getElementById('container-evenement');


  getProduit().then(data => {

    data.forEach(produit => {

      if(produit.evenement == 1){

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

        evenementContainer.innerHTML += produitHTML;
      }
    });
    document.getElementById('gif').style.display = "none"

  });
}























///////////////////////////////////////////////////////////////////////////////////////////////////////

//Début page livraison

///////////////////////////////////////////////////////////////////////////////////////////////////

if(currentURL.includes("livraison.html")){
  console.log('coucou')


}

///////////////////////////////////////////////////////////////////////////////////////////////////////

//Fin page livraison

///////////////////////////////////////////////////////////////////////////////////////////////////


















///////////////////////////////////////////////////////////////////////////////////////////////////////

//Début FAQ pour livraison catégorie

///////////////////////////////////////////////////////////////////////////////////////////////////


  if(currentURL.includes("faq.html")){
    console.log('coucou')
    document.getElementById('livraison').addEventListener("click",()=>{
      document.getElementById('faq-content').innerHTML=`
      
      <div class="faq-item">
        <div class="faq-titre">
          <h3 id="service-title">1. Qu'est-ce que votre service propose exactement?</h3>
          <span class="rotate arrow" id="arrow1"></span>
        </div>
        <p id="service-description" class="none">Notre service offre une gamme complète de solutions dans le domaine [insérer le domaine]. Nous nous engageons à fournir [expliquer brièvement la mission].
        </p>

        <div class="faq-titre">
          <h3 id="service-title">2. Comment les livraisons se passe?</h3>
          <span class="rotate arrow" id="arrow2"></span>
        </div>

        <p id="livraison-description" class="none"> Cela se passe ............

        <div class="faq-titre">
        <h3 id="service-title">3. Comment demander une livraison?</h3>
        <span class="rotate arrow" id="arrow3"></span>
      </div>

      <p id="demande-livraison-description" class="none"> Cela se passe ............
      </p>
          
      </div>`

      document.getElementById('arrow1').addEventListener("click",()=>{
        if(document.getElementById('service-description').style.display==='none')
        {
          document.getElementById('service-description').style.display='flex'
          document.getElementById('arrow1').style.transform='rotate(-90deg)'
        }
       else {
        document.getElementById('service-description').style.display='none'
          document.getElementById('arrow1').style.transform='rotate(90deg)'
       }
      })


      

      document.getElementById('arrow2').addEventListener("click",()=>{
        if(document.getElementById('livraison-description').style.display==='none')
        {
          document.getElementById('livraison-description').style.display='flex'
          document.getElementById('arrow2').style.transform='rotate(-90deg)'
        }
       else {
        document.getElementById('livraison-description').style.display='none'
          document.getElementById('arrow2').style.transform='rotate(90deg)'
       }
      })


      document.getElementById('arrow3').addEventListener("click",()=>{
        if(document.getElementById('demande-livraison-description').style.display==='none')
        {
          document.getElementById('demande-livraison-description').style.display='flex'
          document.getElementById('arrow3').style.transform='rotate(-90deg)'
        }
       else {
        document.getElementById('demande-livraison-description').style.display='none'
          document.getElementById('arrow3').style.transform='rotate(90deg)'
       }
      })




    }
    )
  }


  
///////////////////////////////////////////////////////////////////////////////////////////////////////

//Fin FAQ pour livraison catégorie

///////////////////////////////////////////////////////////////////////////////////////////////////


  
///////////////////////////////////////////////////////////////////////////////////////////////////////

//Début FAQ pour la catégorie Information générale 

///////////////////////////////////////////////////////////////////////////////////////////////////




if(currentURL.includes("faq.html")){
  console.log('information générale')
  document.getElementById('info-general').addEventListener("click",()=>{
    document.getElementById('faq-content').innerHTML=`
    
    <div class="faq-item">
      <div class="faq-titre">
        <h3 id="service-title">1. Qu'elles sont les informations générales?</h3>
        <span class="rotate arrow" id="arrow1"></span>
      </div>
      <p id="info1-description"class="none">dzhdahdzdaiudiauzh.
      </p>

      <div class="faq-titre">
        <h3 id="service-title">2. dzadadazdazdaz?</h3>
        <span class="rotate arrow" id="arrow2"></span>
      </div>

      <p id="info2-description"class="none"> Cela se passe ............

      <div class="faq-titre">
      <h3 id="service-title">3. azdazdazdadazdazdad?</h3>
      <span class="rotate arrow" id="arrow3"></span>
    </div>

    <p id="info3-description"class="none"> Cela se passe ............
    </p>
        
    </div>`

    document.getElementById('arrow1').addEventListener("click",()=>{
      if(document.getElementById('info1-description').style.display==='none')
      {
        document.getElementById('info1-description').style.display='flex'
        document.getElementById('arrow1').style.transform='rotate(-90deg)'
      }
     else {
      document.getElementById('info1-description').style.display='none'
        document.getElementById('arrow1').style.transform='rotate(90deg)'
     }
    })


    

    document.getElementById('arrow2').addEventListener("click",()=>{
      if(document.getElementById('info2-description').style.display==='none')
      {
        document.getElementById('info2-description').style.display='flex'
        document.getElementById('arrow2').style.transform='rotate(-90deg)'
      }
     else {
      document.getElementById('info2-description').style.display='none'
        document.getElementById('arrow2').style.transform='rotate(90deg)'
     }
    })


    document.getElementById('arrow3').addEventListener("click",()=>{
      if(document.getElementById('info3-description').style.display==='none')
      {
        document.getElementById('info3-description').style.display='flex'
        document.getElementById('arrow3').style.transform='rotate(-90deg)'
      }
     else {
      document.getElementById('info3-description').style.display='none'
        document.getElementById('arrow3').style.transform='rotate(90deg)'
     }
    })




  }
  )
}


///////////////////////////////////////////////////////////////////////////////////////////////////////

//Fin FAQ pour la catégorie Information générale 

///////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////

//Début FAQ pour la catégorie Bouquet

///////////////////////////////////////////////////////////////////////////////////////////////////




if(currentURL.includes("faq.html")){
  console.log('bouquet')
  document.getElementById('bouquet').addEventListener("click",()=>{
    document.getElementById('faq-content').innerHTML=`
    
    <div class="faq-item">
      <div class="faq-titre">
        <h3 id="service-title">1. Qu'elles sont les informations générales?</h3>
        <span class="rotate arrow" id="arrow1"></span>
      </div>
      <p id="bouquet1-description"class="none">dzhdahdzdaiudiauzh.
      </p>

      <div class="faq-titre">
        <h3 id="service-title">2. dzadadazdazdaz?</h3>
        <span class="rotate arrow" id="arrow2"></span>
      </div>

      <p id="bouquet2-description"class="none"> Cela se passe ............

      <div class="faq-titre">
      <h3 id="service-title">3. azdazdazdadazdazdad?</h3>
      <span class="rotate arrow" id="arrow3"></span>
    </div>

    <p id="bouquet3-description"class="none"> Cela se passe ............
    </p>
        
    </div>`

    document.getElementById('arrow1').addEventListener("click",()=>{
      if(document.getElementById('bouquet1-description').style.display==='none')
      {
        document.getElementById('bouquet1-description').style.display='flex'
        document.getElementById('arrow1').style.transform='rotate(-90deg)'
      }
     else {
      document.getElementById('bouquet1-description').style.display='none'
        document.getElementById('arrow1').style.transform='rotate(90deg)'
     }
    })


    

    document.getElementById('arrow2').addEventListener("click",()=>{
      if(document.getElementById('bouquet2-description').style.display==='none')
      {
        document.getElementById('bouquet2-description').style.display='flex'
        document.getElementById('arrow2').style.transform='rotate(-90deg)'
      }
     else {
      document.getElementById('bouquet2-description').style.display='none'
        document.getElementById('arrow2').style.transform='rotate(90deg)'
     }
    })


    document.getElementById('arrow3').addEventListener("click",()=>{
      if(document.getElementById('bouquet3-description').style.display==='none')
      {
        document.getElementById('bouquet3-description').style.display='flex'
        document.getElementById('arrow3').style.transform='rotate(-90deg)'
      }
     else {
      document.getElementById('bouquet3-description').style.display='none'
        document.getElementById('arrow3').style.transform='rotate(90deg)'
     }
    })




  }
  )
}


///////////////////////////////////////////////////////////////////////////////////////////////////////

//Fin FAQ pour la catégorie Bouquet

///////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////

//Début FAQ pour la catégorie Plantes

///////////////////////////////////////////////////////////////////////////////////////////////////




if(currentURL.includes("faq.html")){
  console.log('bouquet')
  document.getElementById('plantes').addEventListener("click",()=>{
    document.getElementById('faq-content').innerHTML=`
    
    <div class="faq-item">
      <div class="faq-titre">
        <h3 id="service-title">1. Qu'elles sont les informations générales?</h3>
        <span class="rotate arrow" id="arrow1"></span>
      </div>
      <p id="plantes1-description"class="none">dzhdahdzdaiudiauzh.
      </p>

      <div class="faq-titre">
        <h3 id="service-title">2. dzadadazdazdaz?</h3>
        <span class="rotate arrow" id="arrow2"></span>
      </div>

      <p id="plantes2-description"class="none"> Cela se passe ............

      <div class="faq-titre">
      <h3 id="service-title">3. azdazdazdadazdazdad?</h3>
      <span class="rotate arrow" id="arrow3"></span>
    </div>

    <p id="plantes3-description"class="none"> Cela se passe ............
    </p>
        
    </div>`

    document.getElementById('arrow1').addEventListener("click",()=>{
      if(document.getElementById('plantes1-description').style.display==='none')
      {
        document.getElementById('plantes1-description').style.display='flex'
        document.getElementById('arrow1').style.transform='rotate(-90deg)'
      }
     else {
      document.getElementById('plantes1-description').style.display='none'
        document.getElementById('arrow1').style.transform='rotate(90deg)'
     }
    })


    

    document.getElementById('arrow2').addEventListener("click",()=>{
      if(document.getElementById('plantes1-description').style.display==='none')
      {
        document.getElementById('plantes2-description').style.display='flex'
        document.getElementById('arrow2').style.transform='rotate(-90deg)'
      }
     else {
      document.getElementById('plantes2-description').style.display='none'
        document.getElementById('arrow2').style.transform='rotate(90deg)'
     }
    })


    document.getElementById('arrow3').addEventListener("click",()=>{
      if(document.getElementById('plantes3-description').style.display==='none')
      {
        document.getElementById('plantes3-description').style.display='flex'
        document.getElementById('arrow3').style.transform='rotate(-90deg)'
      }
     else {
      document.getElementById('plantes3-description').style.display='none'
        document.getElementById('arrow3').style.transform='rotate(90deg)'
     }
    })




  }
  )
}


///////////////////////////////////////////////////////////////////////////////////////////////////////

//Fin FAQ pour la catégorie plantes

///////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////

//Début FAQ pour la catégorie stocks

///////////////////////////////////////////////////////////////////////////////////////////////////




if(currentURL.includes("faq.html")){
  console.log('bouquet')
  document.getElementById('stocks').addEventListener("click",()=>{
    document.getElementById('faq-content').innerHTML=`
    
    <div class="faq-item">
      <div class="faq-titre">
        <h3 id="service-title">1. Qu'elles sont les informations générales?</h3>
        <span class="rotate arrow" id="arrow1"></span>
      </div>
      <p id="stocks1-description"class="none">dzhdahdzdaiudiauzh.
      </p>

      <div class="faq-titre">
        <h3 id="service-title">2. dzadadazdazdaz?</h3>
        <span class="rotate arrow" id="arrow2"></span>
      </div>

      <p id="stocks2-description"class="none"> Cela se passe ............

      <div class="faq-titre">
      <h3 id="service-title">3. azdazdazdadazdazdad?</h3>
      <span class="rotate arrow" id="arrow3"></span>
    </div>

    <p id="stocks3-description"class="none"> Cela se passe ............
    </p>
        
    </div>`

    document.getElementById('arrow1').addEventListener("click",()=>{
      if(document.getElementById('stocks1-description').style.display==='none')
      {
        document.getElementById('stocks1-description').style.display='flex'
        document.getElementById('arrow1').style.transform='rotate(-90deg)'
      }
     else {
      document.getElementById('stocks1-description').style.display='none'
        document.getElementById('arrow1').style.transform='rotate(90deg)'
     }
    })


    

    document.getElementById('arrow2').addEventListener("click",()=>{
      if(document.getElementById('stocks2-description').style.display==='none')
      {
        document.getElementById('stocks2-description').style.display='flex'
        document.getElementById('arrow2').style.transform='rotate(-90deg)'
      }
     else {
      document.getElementById('stocks2-description').style.display='none'
        document.getElementById('arrow2').style.transform='rotate(90deg)'
     }
    })


    document.getElementById('arrow3').addEventListener("click",()=>{
      if(document.getElementById('stocks2-description').style.display==='none')
      {
        document.getElementById('stocks2-description').style.display='flex'
        document.getElementById('arrow3').style.transform='rotate(-90deg)'
      }
     else {
      document.getElementById('stocks3-description').style.display='none'
        document.getElementById('arrow3').style.transform='rotate(90deg)'
     }
    })




  }
  )
}


///////////////////////////////////////////////////////////////////////////////////////////////////////

//Fin FAQ pour la catégorie stocks

///////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////

//Début mention légal

///////////////////////////////////////////////////////////////////////////////////////////////////


if (currentURL.includes("mention-legal.html")) {



  console.log('cocoucoucouc');

  const toggleDescription = (id_p, id_span) => {
    const element = document.getElementById(id_p);

    if (element.style.display === "none" || !element.style.display) {
      element.style.display = "flex";
      document.getElementById(id_span).classList.add("rotate");
    } else {
      element.style.display = "none";
      document.getElementById(id_span).classList.remove("rotate");
    }
  };

  document.getElementById("fleche1").addEventListener('click', () => toggleDescription("stocks1-description","fleche1"));
  document.getElementById("fleche2").addEventListener('click', () => toggleDescription("stocks2-description","fleche2"));
  document.getElementById("fleche3").addEventListener('click', () => toggleDescription("stocks3-description","fleche3"));
 
}


///////////////////////////////////////////////////////////////////////////////////////////////////////

//Fin mention legal

///////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////

//Début configuration politique de confidentialité

///////////////////////////////////////////////////////////////////////////////////////////////////


if (currentURL.includes("politique-de-confidentialite.html")) {



  console.log('cocoucoucouc');

  const toggleDescription = (id_p, id_span) => {
    const element = document.getElementById(id_p);

    if (element.style.display === "none" || !element.style.display) {
      element.style.display = "flex";
      document.getElementById(id_span).classList.add("rotate");
    } else {
      element.style.display = "none";
      document.getElementById(id_span).classList.remove("rotate");
    }
  };

  document.getElementById("fleche4").addEventListener('click', () => toggleDescription("vivafleurs-description","fleche4"));
  document.getElementById("fleche5").addEventListener('click', () => toggleDescription("collecte-description","fleche5"));
  document.getElementById("fleche6").addEventListener('click', () => toggleDescription("utilisation-description","fleche6"));
  document.getElementById("fleche7").addEventListener('click', () => toggleDescription("protection-description","fleche7"));
  document.getElementById("fleche8").addEventListener('click', () => toggleDescription("partage-description","fleche8"));
  document.getElementById("fleche9").addEventListener('click', () => toggleDescription("modification-description","fleche9"));
  document.getElementById("fleche10").addEventListener('click', () => toggleDescription("info-sup-description","fleche10"));
}


///////////////////////////////////////////////////////////////////////////////////////////////////////

//Fin configuration politique de confidentialité

///////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////

//Debut design js de la card de redirection dans l'index 

///////////////////////////////////////////////////////////////////////////////////////////////////
document.querySelectorAll(".carousel").forEach(carousel => {
  const items = carousel.querySelectorAll(".carousel__item");

  const buttonsHTML = Array.from(items, (item, index) => {
      const imgSrc = item.querySelector("img").src;
      const title = item.querySelector("h2").innerText;
      const text = item.querySelector("p").innerText;

      return `<span class="carousel__button" data-index="${index}">
                  
              </span>`;
  });

  carousel.insertAdjacentHTML("beforeend", `
      <div class="carousel__nav">
          ${buttonsHTML.join("")}
      </div>
  `);

  const buttons = carousel.querySelectorAll(".carousel__button");

  buttons.forEach((button, i) => {
      button.addEventListener("click", () => {
          items.forEach(item => item.classList.remove("carousel__item--selected"));
          buttons.forEach(btn => btn.classList.remove("carousel__button--selected"));

          items[i].classList.add("carousel__item--selected");
          button.classList.add("carousel__button--selected");
      });
  });

  // Sélection du premier item sur la page de présentation
  items[0].classList.add("carousel__item--selected");
  buttons[0].classList.add("carousel__button--selected");
});
///////////////////////////////////////////////////////////////////////////////////////////////////////

//Debut design js de la card de redirection dans l'index 

///////////////////////////////////////////////////////////////////////////////////////////////////





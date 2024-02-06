
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



if(currentURL.includes("mention-legal.html")){
  console.log('mention-legal')
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

//Fin configuration mention légal

///////////////////////////////////////////////////////////////////////////////////////////////////



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


  var formData = new FormData();
  formData.append('action', 'viewEvent');

  $.ajax({
    type: 'POST',
    url: 'http://localhost/Stage/VivaFleurs/VivaFleurs/api/api.php', 
    data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
      console.log(response.image)
      console.log(response.titre)
      console.log(response.paragraphe)
      if (response.success) {
        //location.reload();
        
      }
    },
    error: function(error) {
      console.error('Erreur lors de l\'affichage de la page event :', error);
    }
  });

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
      <p id="info1-description"class="none">Les informations générale recueillis sur la page contact sont :
      <br>
      -Nom
      <br>
      -Prénom
      <br>
      -Email
      <br>
      -L'adresse
      <br>
      -Le code postal
      <br>
      -La ville
      </p>

      <div class="faq-titre">
        <h3 id="service-title">2. Les donnnées sont elles conservées?</h3>
        <span class="rotate arrow" id="arrow2"></span>
      </div>

      <p id="info2-description"class="none"> 
      
      Oui, les données sont conservées dans le respect des lois et des réglementations en matière de protection des données.
      Nous prenons la confidentialité et la sécurité des données très au sérieux et nous mettons en place des mesures appropriées pour protéger les informations personnelles de nos clients. 
      Les données sont utilisées uniquement dans le cadre des services que nous offrons, tel que le traitement des commandes. Nous ne partageons pas les données avec des tiers sans le consentement explicite des utilisateurs, sauf dans les cas où cela est légalement requis. Pour plus d'informations sur notre politique de confidentialité et la manière dont nous gérons les données, veuillez vous référer à notre politique de confidentialité disponible sur notre site web.
      </p>
      
      <div class="faq-titre">
      <h3 id="service-title">3. Vos données sont-elles revendu ?</h3>
      <span class="rotate arrow" id="arrow3"></span>
    </div>

    <p id="info3-description"class="none"> 
    Les données sont utilisées uniquement dans le cadre des services que nous offrons, tel que le traitement des commandes. Nous ne partageons pas les données avec des tiers sans le consentement explicite des utilisateurs, sauf dans les cas où cela est légalement requis. Pour plus d'informations sur notre politique de confidentialité et la manière dont nous gérons les données, veuillez vous référer à notre politique de confidentialité disponible sur notre site web.
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
        <h3 id="service-title">1. Comment sont crée nos bouquets?</h3>
        <span class="rotate arrow" id="arrow1"></span>
      </div>
      <p id="bouquet1-description"class="none">
      Nos bouquets sont créés avec soin en sélectionnant les meilleures fleurs et plantes disponibles. Nous travaillons en étroite collaboration avec des fournisseurs de confiance pour garantir la fraîcheur et la qualité des produits. 
      Nos artisans floraux composent ensuite les bouquets en tenant compte des saisons, des tendances actuelles et des préférences esthétiques, afin de créer des arrangements uniques et élégants. 
      Chaque bouquet est conçu avec passion et expertise pour offrir une expérience florale exceptionnelle à nos clients.
      </p>

      <div class="faq-titre">
        <h3 id="service-title">2. Puis-je personnaliser mon bouquet de fleurs en ajoutant des fleurs spécifiques ou en modifiant les couleurs ?</h3>
        <span class="rotate arrow" id="arrow2"></span>
      </div>

      <p id="bouquet2-description"class="none"> 
      Oui, nous offrons souvent la possibilité de personnaliser votre bouquet de fleurs selon vos préférences. 
      Vous pouvez généralement spécifier les types de fleurs que vous souhaitez inclure dans votre bouquet, ainsi que les couleurs dominantes ou les thèmes. Lorsque vous passez votre commande, vous pouvez contacter notre équipe de service client pour discuter de vos besoins spécifiques.
       Nous ferons de notre mieux pour créer un bouquet qui correspond parfaitement à vos souhaits et à l'occasion pour laquelle il est destiné. 
      Veuillez noter que certaines demandes de personnalisation peuvent entraîner des frais supplémentaires, en fonction de la disponibilité des fleurs et de la complexité de la conception.
      </p>

      <div class="faq-titre">
      <h3 id="service-title">3. Acceptez-vous les commandes de bouquets de fleurs pour des événements spéciaux tels que les mariages ou les anniversaires ? </h3>
      <span class="rotate arrow" id="arrow3"></span>
    </div>

    <p id="bouquet3-description"class="none">Oui, nous sommes ravis d'accepter les commandes de bouquets de fleurs pour des événements spéciaux tels que les mariages, les anniversaires, les anniversaires de mariage, les fêtes et autres occasions importantes.
     Nous comprenons l'importance de ces moments spéciaux et nous nous efforçons de créer des arrangements floraux qui ajoutent une touche mémorable à votre événement. 
     Notre équipe d'artisans floraux qualifiés travaille en étroite collaboration avec vous pour comprendre vos besoins, vos préférences et votre vision, afin de créer des bouquets et des arrangements qui correspondent parfaitement à l'ambiance et au style de votre événement. 
    Contactez nous pour discuter de vos besoins spécifiques et pour commencer à planifier les arrangements floraux pour votre événement spécial dès aujourd'hui.
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
        <h3 id="service-title">1. Puis-je commander des plantes de fleurs en ligne et les faire livrer ?
        </h3>
        <span class="rotate arrow" id="arrow1"></span>
      </div>
      <p id="plantes1-description"class="none">Nous sommes désolés, mais actuellement nous ne proposons pas de service de commande en ligne avec livraison pour nos plantes de fleurs. 
      Notre site web fonctionne comme un vitrine présentant nos différentes variétés de plantes de fleurs disponibles en magasin. Cependant, vous pouvez visiter notre magasin en personne pour voir notre sélection complète et passer votre commande directement sur place. 
      Si vous ne pouvez pas vous rendre en magasin, vous pouvez utiliser la catégorie "Contact" sur notre site pour poser des questions sur nos produits ou pour organiser un ramassage en magasin ou planifiez une livraison. Nous serions ravis de vous aider à trouver la plante de fleurs parfaite pour vos besoins.
      </p>

      <div class="faq-titre">
        <h3 id="service-title">2. Comment prendre soin de mes plantes de fleurs d'intérieur pour les garder en bonne santé ?</h3>
        <span class="rotate arrow" id="arrow2"></span>
      </div>

      <p id="plantes2-description"class="none"> Prendre soin de vos plantes de fleurs d'intérieur est essentiel pour les maintenir en bonne santé et les faire prospérer. Voici quelques conseils généraux :
      <br>
      -Arrosage : Assurez-vous de comprendre les besoins en arrosage spécifiques de chaque plante. Certaines plantes nécessitent un arrosage fréquent, tandis que d'autres préfèrent un sol plus sec entre les arrosages. Vérifiez régulièrement l'humidité du sol et ajustez votre fréquence d'arrosage en conséquence.
      <br>
      
      -Lumière : Placez vos plantes dans des endroits où elles reçoivent la quantité appropriée de lumière. La plupart des plantes d'intérieur préfèrent la lumière indirecte vive, mais certaines peuvent tolérer des conditions de lumière plus faible. Assurez-vous de faire pivoter périodiquement vos plantes pour éviter une croissance déséquilibrée.
      <br>
      
      -Fertilisation : Fertilisez vos plantes selon les besoins, en utilisant un engrais équilibré pour plantes d'intérieur. Suivez les instructions sur l'emballage et n'oubliez pas de fertiliser pendant la période de croissance active.
      <br>
      
      -Contrôle des parasites et des maladies : Surveillez régulièrement vos plantes pour détecter les signes de parasites ou de maladies. Si vous repérez des problèmes, agissez rapidement en utilisant des méthodes de contrôle appropriées, telles que le nettoyage des feuilles ou l'application de solutions insecticides douces.
      <br>
      
      -Taille et élagage : Taillez vos plantes au besoin pour favoriser une croissance saine et éliminer les parties endommagées ou mortes.
      <br>
      
      -Conditions environnementales : Assurez-vous que vos plantes bénéficient des bonnes conditions environnementales, y compris la température et l'humidité appropriées.
      <br>
      
      En suivant ces conseils de base et en étant attentif aux besoins individuels de vos plantes, vous pouvez maintenir vos plantes de fleurs d'intérieur en bonne santé et profiter de leur beauté pendant longtemps.

      <div class="faq-titre">
      <h3 id="service-title">3. Comment puis-je savoir si ma plante de fleurs a besoin d'être arrosée ?

      </h3>
      <span class="rotate arrow" id="arrow3"></span>
    </div>

    <p id="plantes3-description"class="none"> -Vérifiez visuellement le sol : Inspectez le sol de votre plante. S'il est sec en surface, cela peut indiquer que votre plante a besoin d'eau. Cependant, assurez-vous également de vérifier le sol en profondeur, car il peut sembler sec à la surface tout en conservant de l'humidité en dessous.
    <br>
    -Testez l'humidité du sol avec votre doigt : Enfoncez votre doigt dans le sol jusqu'à environ 2 à 3 centimètres de profondeur. Si le sol est sec à cette profondeur, il est temps d'arroser votre plante. Si le sol est encore humide, attendez un peu avant d'arroser à nouveau.
    <br>
    
    -Utilisez un humidimètre : Un humidimètre est un outil utile pour mesurer l'humidité du sol avec précision. Insérez simplement la sonde de l'humidimètre dans le sol autour de la plante et lisez le niveau d'humidité indiqué.
    <br>
    
    -Observez le feuillage de la plante : Les plantes qui ont besoin d'eau peuvent commencer à montrer des signes de flétrissement ou de feuilles tombantes. Si vous remarquez que les feuilles de votre plante semblent fanées ou molles, cela peut être un signe qu'elle a besoin d'être arrosée.
    <br>
    
    -Suivez un calendrier d'arrosage régulier : Pour certaines plantes, il peut être utile de suivre un calendrier d'arrosage régulier en fonction de leurs besoins en eau. Cependant, il est important de surveiller les conditions individuelles de chaque plante et d'ajuster l'arrosage en conséquence.
    <br>
    
    En utilisant ces méthodes simples, vous pouvez déterminer avec précision quand arroser vos plantes de fleurs, ce qui contribuera à maintenir leur santé et leur croissance optimales.
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
        <h3 id="service-title">1. Comment choisissez-vous les fleurs que vous proposez en magasin ?
        </h3>
        <span class="rotate arrow" id="arrow1"></span>
      </div>
      <p id="stocks1-description"class="none">
      Nous sélectionnons soigneusement chaque fleur que nous proposons en magasin pour garantir la qualité, la fraîcheur et la diversité de notre assortiment. 
      Notre équipe d'acheteurs travaille en étroite collaboration avec des producteurs et des fournisseurs de confiance pour choisir les meilleures fleurs disponibles sur le marché. 
      Nous tenons compte de nombreux facteurs lors de la sélection des fleurs, notamment la saisonnalité, la variété, la longévité, la beauté et les tendances actuelles. Nous recherchons également des fleurs cultivées de manière responsable, en privilégiant les options écologiques et équitables lorsque cela est possible.
       Notre objectif est de vous offrir une gamme variée de fleurs fraîches et de haute qualité pour répondre à tous vos besoins en matière de décoration florale, que ce soit pour les événements spéciaux, les cadeaux ou simplement pour embellir votre maison.
      </p>

      <div class="faq-titre">
        <h3 id="service-title">2. Comment puis-je être informé des promotions ou des nouveaux arrivages de fleurs dans votre magasin ?</h3>
        <span class="rotate arrow" id="arrow2"></span>
      </div>

      <p id="stocks2-description"class="none"> 

      Sur notre site vitrine, nous mettons à votre disposition différentes méthodes pour vous tenir informé des nouveaux arrivages de fleurs dans notre magasin :
      <br>
      -Réseaux sociaux : Suivez-nous sur nos plateformes de médias sociaux telles que Facebook ou Instagram Nous publions régulièrement des annonces sur Nos nouveaux produits, ce qui vous permet de rester informé en temps réel.
      <br>
      -Page d'accueil du site web : Consultez régulièrement la page d'accueil de notre site web où nous affichons souvent nos promotions en cours et mettons en avant nos nouveaux arrivages de fleurs.
      <br>
      En utilisant ces méthodes, vous pouvez rester au courant de toutes les fleurs fraîches qui arrivent dans notre magasin, et ainsi ne rien manquer des opportunités d'embellir votre vie avec nos magnifiques fleurs.
      
      </p>

      <div class="faq-titre">
      <h3 id="service-title">3. Proposez-vous des accessoires tels que des vases, des cartes de vœux ou des emballages cadeaux ?</h3>
      <span class="rotate arrow" id="arrow3"></span>
    </div>

    <p id="stocks3-description"class="none"> 
    Oui, nous proposons une gamme d'accessoires pour accompagner nos fleurs, ce qui inclut généralement des vases, des cartes de vœux et des options d'emballage cadeau. Ces accessoires sont conçus pour compléter et personnaliser votre achat de fleurs, que ce soit pour offrir en cadeau ou pour embellir votre propre espace.
    <br>

-Vases : Nous proposons une sélection de vases dans différents styles, tailles et matériaux pour mettre en valeur vos bouquets de fleurs. Vous pouvez choisir parmi une variété de designs, du classique au contemporain, pour trouver celui qui correspond parfaitement à vos goûts et à votre décoration intérieure.
<br>
-Cartes de vœux : Nous offrons également des cartes de vœux avec une variété de designs et de messages pour accompagner votre bouquet de fleurs. Que ce soit pour une occasion spéciale ou simplement pour exprimer vos sentiments, nos cartes de vœux ajoutent une touche personnelle à votre cadeau floral.
<br>

-Emballages cadeaux : Pour ceux qui souhaitent offrir un bouquet de fleurs comme cadeau, nous proposons des options d'emballage cadeau élégantes pour compléter votre présent. Nos emballages cadeaux sont conçus pour mettre en valeur la beauté des fleurs et ajouter une touche d'élégance à votre cadeau.
<br>

Que ce soit pour une occasion spéciale ou simplement pour faire plaisir à un être cher, nos accessoires sont conçus pour vous aider à créer des cadeaux florals mémorables et à faire ressortir la beauté de nos fleurs dans n'importe quel contexte.
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





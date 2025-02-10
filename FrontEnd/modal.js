const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();

const token = localStorage.getItem("userToken");

if (token) {
    //Création du lien vers la modale
    const sectionPortfolio = document.getElementById("portfolio");
    const titreProjet = document.querySelector("#portfolio h2");
    const divEntete = document.createElement("div");
    divEntete.classList.add("entete");
    sectionPortfolio.insertBefore(divEntete, titreProjet);
    divEntete.appendChild(titreProjet);
    const lienModale = document.createElement("a")
    lienModale.href = "#";
    lienModale.innerHTML = "<i class='fa-regular fa-pen-to-square'></i> Modifier"
    divEntete.appendChild(lienModale)

    //Création du bouton pour fermer la modal (et du bouton retour pour la deuxième "page" de la modal)
    const contenuModal = document .querySelector(".contenu-modal");
    const divBoutonFermer = document.createElement("div")
    divBoutonFermer.classList.add("div-btn-entete");
    const boutonFermer = document.createElement("button");
    const boutonRetour = document.createElement("button");
    boutonFermer.classList.add("btn-entete-modal");
    boutonRetour.classList.add("btn-entete-modal");
    boutonFermer.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    boutonRetour.innerHTML = '<i class="fa-solid fa-arrow-left"></i>'

    //Création des titres de la modal (page 1 et 2)
    const titreModal1 = document.createElement("h3");
    titreModal1.innerText ="Galerie photo";
    const titreModal2 = document.createElement("h3");
    titreModal2.innerText = "Ajout photo";
    
    //Création d'une div gallery-modal pour la page 1 et d'une d'un formulaire pour la page 2
    const divGallerie = document.createElement("div");
    divGallerie.classList.add("gallery-modal");
    const formAjout = document.createElement("form");
    //Création d'une div à part pour intégrer du css et correspondre à la maquette (et de son contenu)
    const divAjoutPhoto = document.createElement("div");
    divAjoutPhoto.classList.add("ajout-photo");
    const imageAjoutPhoto = document.createElement("p");
    imageAjoutPhoto.innerHTML = '<i class="fa-regular fa-image"></i>';
    const boutonAjoutPhoto = document.createElement("button");
    boutonAjoutPhoto.innerText = "+ Ajouter photo";
    const infoPhoto = document.createElement("p");
    infoPhoto.innerText = "jpg, png : 4mo max";
    const titreForm = document.createElement("p");
    titreForm.innerHTML = '<label for="titre">Titre</label><br><input type="text" name="titre" id="titre">'
    const categorieForm = document.createElement("p");
    categorieForm.innerHTML = '<label for="categorie">Catégorie</label><br><select name="categorie" id="categorie"></select>'
    
    
    //créationdu bouton de validation d'envoi de projet (page 2)
    const divValider = document.createElement("div");
    divValider.classList.add("bouton-modal");
    const boutonValider = document.createElement("button");
    boutonValider.classList.add("btn-valider");
    boutonValider.innerText = "Valider";


    //Création d'une div avec le bouton pour changer l'écran de la modal (page 1)
    const divBoutonAjouter = document.createElement("div");
    divBoutonAjouter.classList.add("bouton-modal");
    const boutonAjouter = document.createElement("button");
    boutonAjouter.classList.add("btn-ajouter");
    boutonAjouter.innerText = "Ajouter une photo";
    

    function genererFigure(works) {
        //Création et ajout de chaque <figure> dans la <div class="gallery-modal">
        works.forEach((figure) => {
            const figureElement = document.createElement("figure");
            const imageElement = document.createElement("img");
            imageElement.src = figure.imageUrl;
            const logoElement = document.createElement("button");
            logoElement.classList.add("delete-works");
            logoElement.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
            //Rattachement des éléments
            divGallerie.appendChild(figureElement);
            figureElement.appendChild(imageElement);
            figureElement.appendChild(logoElement);
        });
    } 
    genererFigure(works);
    
    const modal = document.getElementById("modal");   
    //Création de la fonction pour ouvrir la modal
    function ouvrirModal() {
        lienModale.addEventListener("click", (event) => {
            event.preventDefault;
            modal.style.display = null;
            console.log("Modale ouverte");
            genererModal1();
        })
    }
    ouvrirModal();

    function genererModal1 () {
        contenuModal.innerHTML = "";
        divBoutonFermer.innerHTML = "";
        contenuModal.appendChild(divBoutonFermer);
        divBoutonFermer.style.justifyContent = "end";
        divBoutonFermer.appendChild(boutonFermer);
        contenuModal.appendChild(titreModal1);
        contenuModal.appendChild(divGallerie);
        contenuModal.appendChild(divBoutonAjouter);
        divBoutonAjouter.appendChild(boutonAjouter);
    }

    function genererModal2 () {
        contenuModal.innerHTML = "";
        divBoutonFermer.innerHTML = "";
        contenuModal.appendChild(divBoutonFermer);
        divBoutonFermer.style.justifyContent = "space-between";
        divBoutonFermer.appendChild(boutonRetour);
        divBoutonFermer.appendChild(boutonFermer);
        contenuModal.appendChild(titreModal2);
        contenuModal.appendChild(formAjout);
        formAjout.appendChild(divAjoutPhoto);
        divAjoutPhoto.appendChild(imageAjoutPhoto);
        divAjoutPhoto.appendChild(boutonAjoutPhoto);
        divAjoutPhoto.appendChild(infoPhoto);
        formAjout.appendChild(titreForm);
        formAjout.appendChild(categorieForm);
        contenuModal.appendChild(divValider);
        divValider.appendChild(boutonValider);
    }
    
    //Changement de "page" de la modal au clique sur le bouton ajouter une photo.
    boutonAjouter.addEventListener("click", (event) => {
        event.preventDefault();
        genererModal2();
    })

    boutonRetour.addEventListener("click", (event) => {
        event.preventDefault();
        genererModal1();
    })

    //Création de la fonction pour fermer la modal
    function fermerModal() {
        //avec le bouton de fermeture
        boutonFermer.addEventListener("click", (event) => {
            event.preventDefault();
            if (modal.style.display !== "none") {
                modal.style.display = "none";
                console.log("modale fermé via le bouton fermer")
            }
        })
        //En cliquent en dehors de la modal
        window.addEventListener("click", (event) => {
            //On vérifie si le clic est en dehors de .contenu-modal
            if (event.target === modal && modal.style.display !== "none") { 
                modal.style.display = "none";
                console.log("modale fermée via l'extérieur");
            }
        });
        
    }
    fermerModal();   
}

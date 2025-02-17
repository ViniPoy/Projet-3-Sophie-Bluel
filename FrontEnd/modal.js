const contenuModal = document.querySelector(".contenu-modal");
const modal = document.getElementById("modal");


//Si on clique en dehors de la modale quand celle-ci est ouverte, elle se ferme
window.addEventListener("click", (event) => {
    if (event.target === modal && modal.style.display !== "none") {
        modal.style.display = "none";
        console.log("modale fermée via l'extérieur");
    }
});
    
function creerEntete(typeModal){
    //On créé une div contenant les icônes de navigation (<- retour et X fermer)
    const divBoutonFermer = document.createElement("div")
    divBoutonFermer.classList.add("div-btn-entete");
    //Si la modal affiche le formulaire d'envoie de travaux, on ajoute le bouton "<-" retour
    if (typeModal === "form") {
        creerBoutonRetour(divBoutonFermer)
        divBoutonFermer.classList.add("element-space-between")
    }
    //Quoiqu'il arrive, on ajoute le bouton "X" fermer
    creerBoutonFermer(divBoutonFermer)
    contenuModal.appendChild(divBoutonFermer)
}

function creerBoutonFermer(divBoutonFermer) {
    const boutonFermer = document.createElement("button");
    boutonFermer.classList.add("btn-entete-modal");
    boutonFermer.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    divBoutonFermer.appendChild(boutonFermer)
    //Au clique sur le boouton "X" fermer, la modale se ferme
    boutonFermer.addEventListener("click", (event) => {
        event.preventDefault();
        if (modal.style.display !== "none") {
            modal.style.display = "none";
            console.log("modale fermé via le bouton fermer")
        }
    })
}

function creerBoutonRetour(divBoutonFermer) {
    const boutonRetour = document.createElement("button");
    boutonRetour.classList.add("btn-entete-modal");    
    boutonRetour.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    //Au clique sur le bouton "<-" retour, on reviens sur la page de la modale qui affiche la galerie des travaux pouvant être supprimé
    boutonRetour.addEventListener("click", () => {
        genererGallerieModal();
    })
    divBoutonFermer.appendChild(boutonRetour)
}

function creerTitreModal(titre) {
    const titreModal = document.createElement("h3");
    titreModal.innerText = titre;
    contenuModal.appendChild(titreModal);
}

function genererGallerieModal () {
    //On vide le contenu de la modal pour ne pas avoir à en créer une autre
    contenuModal.innerHTML = "";
    //On ajoute les boutons de navigation et le titre de la page
    creerEntete("liste");
    creerTitreModal("Gallerie photo");
    //On créé la div contenant les travaux à supprimer
    const divGallerie = document.createElement("div");
    divGallerie.classList.add("gallery-modal");
    contenuModal.appendChild(divGallerie);
    //On génère les travaux
    genererFigureModal(divGallerie);
    //On créé une div avec un bouton qui permet d'afficher le formulaire d'ajout de travaux
    const divBoutonAjouter = document.createElement("div");
    divBoutonAjouter.classList.add("bouton-modal");
    contenuModal.appendChild(divBoutonAjouter);
    const boutonAjouter = document.createElement("button");
    boutonAjouter.classList.add("btn-ajouter");
    boutonAjouter.innerText = "Ajouter une photo";
    boutonAjouter.addEventListener("click", () => {
        genererFormModal();
    })
    divBoutonAjouter.appendChild(boutonAjouter);
}

function genererFormModal() {
    //On vide le contenu de la modal pour ne pas avoir à en créer une autre
    contenuModal.innerHTML = "";
    //On ajoute les boutons de navigation et le titre de la page
    creerEntete("form");
    creerTitreModal("Ajout Photo");
    //On créé un formulaire 
    const formAjout = document.createElement("form");
    contenuModal.appendChild(formAjout);
    //On créé une div stylisée qui sert à ajouter une foto via un input
    const divAjoutPhoto = document.createElement("div");
    divAjoutPhoto.classList.add("ajout-photo");
    //On créé un visuel pour signifier que c'est ici qu'on ajoute la photo
    const imageAjoutPhoto = document.createElement("p");
    imageAjoutPhoto.innerHTML = '<i class="fa-regular fa-image"></i>';
    //On créé l'input de type file pour ajouter la photo, on lui met un display none pour le remplacer par un bouton, plus facile a modifier en CSS 
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/jpeg, image/png";
    inputFile.id = "upload-photo"
    inputFile.style.display = "none"
    //Et on créé le bouton qui permet d'utiliser l'input de type file
    const boutonAjoutPhoto = document.createElement("button");
    boutonAjoutPhoto.innerText = "+ Ajouter photo";
    boutonAjoutPhoto.setAttribute("for", "upload-photo")
    //Quand on clique sur le bouton, cela équivaut aul'activation de l'input de type file
    boutonAjoutPhoto.addEventListener("click", (event) => {
        event.preventDefault();
        inputFile.click();
    })
    //On vérifie que la photo ajoutée respecte les limitations imposées
    inputFile.addEventListener("change", (event) => {
        const file = event.target.files[0];
        //Si c'est le cas, on affiche la photo dans la div
        if (file && file.size <= 4 * 1024 * 1024) {
            const imageURL = URL.createObjectURL(file);
            divAjoutPhoto.innerHTML = `<img src="${imageURL}" alt="Aperçu" style="max-width: 35%; max-height: 100%; object-fit: contain;">`  
        //Sinon on affiche un message d'erreur et on réinitialise la valeur de l'input file
        } else {
            afficherMessage("Le fichier est trop volumineux (4 Mo max)");
            inputFile.value = "";
        }
        //Si tout est bon, la fonction ajoute le critère de validation de l'input file pour pouvoir changer la couleur du bouton 
        verifierFormulaire(inputFile, titreInput, categorieSelect, boutonValider)
    })
    //On ajoute un petit paragraphe concernant les informations sur les formats et le poid maximal acceptés pour les photos 
    const infoPhoto = document.createElement("p");
    infoPhoto.innerText = "jpg, png : 4mo max";
    //Enfin on rattache tout ça a la div qu'on a créée pour
    divAjoutPhoto.append(imageAjoutPhoto, boutonAjoutPhoto, inputFile, infoPhoto);
    //On créé un input pour le titre et un select pour la catégorie que l'on veut associé à la photo 
    const titreForm = document.createElement("p");
    titreForm.innerHTML = '<label for="titre">Titre</label><br><input type="text" name="titre" id="titre">'
    const categorieForm = document.createElement("p");
    categorieForm.innerHTML = '<label for="categorie">Catégorie</label><br><select name="categorie" id="categorie"></select>'
    //On rempli les options du select categorie
    remplirSelectCategories();
    //On créé une div avec le bouton qui permet l'ajout du travail (photo, titre, catégorie) à l'api
    const divValider = document.createElement("div");
    divValider.classList.add("bouton-modal");
    const boutonValider = document.createElement("button");
    boutonValider.classList.add("btn-valider");
    boutonValider.innerText = "Valider";
    divValider.appendChild(boutonValider);
    //Enfin on rattache tout les éléments du formulaire au formulaire créé en amont
    formAjout.append(divAjoutPhoto, titreForm, categorieForm, divValider);

    //On récupère la valeur de l'input titre et du select categorie pour vérifier qu'ils sont remplis
    const titreInput = formAjout.querySelector("#titre");
    const categorieSelect = formAjout.querySelector("#categorie")
    titreInput.addEventListener("input", () => verifierFormulaire(inputFile, titreInput, categorieSelect, boutonValider));
    categorieSelect.addEventListener("change", () => verifierFormulaire(inputFile, titreInput, categorieSelect, boutonValider));

    //Au clique sur le bouton valider, on appelle la fonction qui gère l'envoie de travaux
    boutonValider.addEventListener("click", async (event) => {
        event.preventDefault();
        envoyerTravail(inputFile, (message) => afficherMessage(message));
    })
}

function verifierFormulaire(inputFile, titreInput, categorieSelect, boutonValider) {
    //Si les champs du formulaire sont correctement remplis, le bouton deviens vert (signe que le travail peut être ajouté)
    if (inputFile.files.length > 0 && titreInput.value.trim() !== "" && categorieSelect.value !== "") {
        boutonValider.classList.add("btn-active")
    //Autrement il reste gris (ou redeviens gris si on vide un des champs)
    } else {
        boutonValider.classList.remove("btn-active")
    }
}

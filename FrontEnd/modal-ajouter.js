function genererFormModal() {
    //On vide le contenu de la modal pour ne pas avoir à en créer une autre
    contenuModal.innerHTML = "";
    //On ajoute les boutons de navigation et le titre de la page
    creerEntete("form");
    creerTitreModal("Ajout Photo");
    //On créé un formulaire 
    const formAjout = document.createElement("form");
    formAjout.classList.add("form-ajout");
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
    //Quand on clique sur le bouton, cela équivaut à l'activation de l'input de type file
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
    formAjout.appendChild(divAjoutPhoto);
    creerChampForm("titre", "Titre", "text");
    creerChampForm("categorie", "Catégorie", "select");
    remplirSelectCategories();
    creerFootModal("btn-valider", "Valider");
    
    //On récupère la valeur de l'input titre et du select categorie pour vérifier qu'ils sont remplis
    const titreInput = formAjout.querySelector("#titre");
    const categorieSelect = formAjout.querySelector("#categorie")
    titreInput.addEventListener("input", () => verifierFormulaire(inputFile, titreInput, categorieSelect, boutonValider));
    categorieSelect.addEventListener("change", () => verifierFormulaire(inputFile, titreInput, categorieSelect, boutonValider));

    //Au clique sur le bouton valider, on appelle la fonction qui gère l'envoie de travaux
    const boutonValider = document.querySelector(".btn-valider");
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

async function remplirSelectCategories(categories) {
    //On récupère les différentes catégorie via la fonction qui fait appel à l'api
    categories = await getCategories()
    //On créé une option par défaut ne contenant aucune catégorie
    const selectCategorie = document.getElementById("categorie");
    const optionParDefaut = document.createElement("option");
    optionParDefaut.value = "";
    optionParDefaut.disabled = true;
    optionParDefaut.selected = true;
    selectCategorie.appendChild(optionParDefaut);
    //Et ensuite on créé le reste des options dans le menu déroulant
    categories.forEach(categorie => {
        const option = document.createElement("option");
        option.value = categorie.id;
        option.textContent = categorie.name;
        selectCategorie.appendChild(option);
    })
}

async function envoyerTravail(inputFile, afficherMessage) {
    //On récupère la valeur des champs du formulaire d'ajout de travaux
    const inputTitre = document.getElementById("titre");
    const inputCategorie = document.getElementById("categorie");
    const titre = inputTitre.value.trim();
    const categorie = inputCategorie.value;
    const image = inputFile.files[0];
    //Si au moins un de ces champs est vide, on affiche un message d'erreur et on annule
    if (!titre || !categorie || !image) {
        afficherMessage("Veuillez remplir tout les champs et ajouter une image");
        return;
    }
    //on créé un FormData contenant les informations nécessaires pour ajouter le travail à la base de données
    const formData = new FormData();
    formData.append("title", titre);
    formData.append("category", categorie);
    formData.append("image", image);
    //on place ce FormData en tant que "body" pour la requête POST envoyé à l'api
    const nouveauTravail = await postWorks(formData);
    //si la requête est bonne
    if (nouveauTravail) {
        console.log("Travail ajouté :", nouveauTravail);
        //On affiche un message de validation
        afficherMessage("Travail ajouté!");
        //On ajoute le travaail sur la page web
        ajoutWorks(nouveauTravail);
        //Et on repasse sur la page de suppression de la modale, qui s'est mise à jour
        genererGallerieModal();
    //Sinon on affiche un message d'erreur
    } else {
        afficherMessage("Erreur lors de l'ajout du travail");
    }
}
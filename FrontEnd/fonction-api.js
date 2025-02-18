async function getWorks() {
    const reponseWorks = await fetch("http://localhost:5678/api/works");
    const works = await reponseWorks.json();
    return works;
}

async function getCategories() {
    const reponseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await reponseCategories.json();
    return categories;
}

async function deleteWorks(id) {
    try {
        const response = await fetch (`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }  
        })
        return response.ok
    } catch (error) {
        console.error("Erreur réseau :", error);
        return false;
    }
}

async function postWorks(donnees) {
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${token}`
            },
            body: donnees
        })
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Erreur lors de l'envoi :", response.status);
            return null;
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
        return null
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

async function genererFigureModal(divGallerie) {
    divGallerie.innerHTML = "";
    //On récupère les différents travaux via la fonction qui fait appel à l'api
    const works = await getWorks();
    //Création et ajout de chaque <figure> dans la <div class="gallery-modal">
    works.forEach((figureModal) => {
        const figureModalElement = document.createElement("figure");
        figureModalElement.id = `modal-${figureModal.id}`;
        divGallerie.appendChild(figureModalElement);
        //Création de l'image pour chaque figure
        const imageElement = document.createElement("img");
        imageElement.src = figureModal.imageUrl;
        figureModalElement.appendChild(imageElement);
        //Création d'un petit bouton en forme de poubelle
        const logoElement = document.createElement("button");
        logoElement.classList.add("btn-suppr");
        logoElement.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        //Au clique sur la poubelle on supprime le travail de la base de données
        logoElement.addEventListener("click", () => {
            console.log("Jai cliqué sur la petite poubelle");
            supprimerTravail(figureModal.id);
        })
        figureModalElement.appendChild(logoElement);
    });
} 

async function supprimerTravail(id) {
    //On attend la confirmation de la fonction qui envoie la requêter delete à l'api
    const suppressionReussi = await deleteWorks(id);
    //Si on a la réponse:
    if (suppressionReussi) {
        //On supprime directement l'élément de la page
        const pageElement = document.getElementById(`work-${id}`);
        if (pageElement) pageElement.remove();
        //Ainsi que de la modale
        const modalElement = document.getElementById(`modal-${id}`);
        if (modalElement) modalElement.remove();
        //Et on affiche un message de validation
        afficherMessage("Travail supprimé avec succès!")
        console.log(`Travail ${id} supprimé avec succès.`);
    //Sinon:
    } else {
        //On affiche un message d'erreur
        afficherMessage("Échec de la suppression du travail.");
        console.error(`Erreur lors de la suppression`)
    }
    
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

function afficherMessage(message){
    //On créé une div qui prendra toute la page pour la flouter
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
    //On créé une autree div pour afficher le message
    const boiteMessage = document.createElement("div");
    boiteMessage.classList.add("boite-message");
    boiteMessage.textContent = message;
    overlay.appendChild(boiteMessage);
    //On créé un bouton qui permet de fermer l'overlay
    const boutonOK = document.createElement("button");
    boutonOK.textContent = "OK";
    boutonOK.classList.add("bouton-ok");
    boutonOK.addEventListener("click", () => overlay.remove());
    boiteMessage.appendChild(boutonOK);
 }
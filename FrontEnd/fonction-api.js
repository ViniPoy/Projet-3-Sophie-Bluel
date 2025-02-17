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
    const reponseWorks = await fetch("http://localhost:5678/api/works");
    const works = await reponseWorks.json();
    //Création et ajout de chaque <figure> dans la <div class="gallery-modal">
    works.forEach((figureModal) => {
        const figureModalElement = document.createElement("figure");
        figureModalElement.id = `modal-${figureModal.id}`;
        const imageElement = document.createElement("img");
        imageElement.src = figureModal.imageUrl;
        const logoElement = document.createElement("button");
        logoElement.classList.add("btn-suppr");
        logoElement.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        logoElement.addEventListener("click", () => {
            console.log("Jai cliqué sur la petite poubelle");
            supprimerTravail(figureModal.id);
        })
        //Rattachement des éléments
        divGallerie.appendChild(figureModalElement);
        figureModalElement.appendChild(imageElement);
        figureModalElement.appendChild(logoElement);
    });
} 

async function supprimerTravail(id) {
    const suppressionReussi = await deleteWorks(id);
    if (suppressionReussi) {
        const pageElement = document.getElementById(`work-${id}`);
        if (pageElement) pageElement.remove();
        const modalElement = document.getElementById(`modal-${id}`);
        if (modalElement) modalElement.remove();
        afficherMessage("Travail supprimé avec succès!")
        console.log(`Travail ${id} supprimé avec succès.`);
    } else {
        afficherMessage("Échec de la suppression du travail.");
        console.error(`Erreur lors de la suppression`)
    }
    
}

async function envoyerTravail(inputFile, afficherMessage) {
    const inputTitre = document.getElementById("titre");
    const inputCategorie = document.getElementById("categorie");
    const titre = inputTitre.value.trim();
    const categorie = inputCategorie.value;
    const image = inputFile.files[0];
    if (!titre || !categorie || !image) {
        afficherMessage("Veuillez remplir tout les champs et ajouter une image");
        return;
    }
    const formData = new FormData();
    formData.append("title", titre);
    formData.append("category", categorie);
    formData.append("image", image);
    const nouveauTravail = await postWorks(formData);
    if (nouveauTravail) {
        console.log("Travail ajouté :", nouveauTravail);
        afficherMessage("Travail ajouté!");
        ajoutWorks(nouveauTravail);
        genererGallerieModal();
    } else {
        afficherMessage("Erreur lors de l'ajout du travail");
    }
}

function afficherMessage(message){
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    const boiteMessage = document.createElement("div");
    boiteMessage.classList.add("boite-message");
    boiteMessage.textContent = message;
    const boutonOK = document.createElement("button");
    boutonOK.textContent = "OK";
    boutonOK.classList.add("bouton-ok");
    boutonOK.addEventListener("click", () => overlay.remove());
    boiteMessage.appendChild(boutonOK);
    overlay.appendChild(boiteMessage);
    document.body.appendChild(overlay)
 }

const token = localStorage.getItem("userToken")

export async function chargerCategories() {
    try {
        const reponse = await fetch("http://localhost:5678/api/categories");
        if (!reponse.ok) {
            throw new Error ("Erreur lors du chargement des catégories")
        }
        const categories = await reponse.json();
        remplirSelectCategories(categories);
    } catch (error) {
        console.error("Erreur réseau :", error);
    }
}

function remplirSelectCategories(categories) {
    const selectCategorie = document.getElementById("categorie");
    selectCategorie.innerHTML = "";
    const optionParDefaut = document.createElement("option");
    optionParDefaut.value = "";
    optionParDefaut.disabled = true;
    optionParDefaut.selected = true;
    selectCategorie.appendChild(optionParDefaut);
    categories.forEach(categorie => {
        const option = document.createElement("option");
        option.value = categorie.id;
        option.textContent = categorie.name;
        selectCategorie.appendChild(option);
    })
}

export async function supprimerTravail(id) {
    try {
        const response = await fetch (`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }  
        })
        if (response.ok) {
            const pageElement = document.getElementById(`work-${id}`);
            if (pageElement) pageElement.remove();
            const modalElement = document.getElementById(`modal-${id}`);
            if (modalElement) modalElement.remove();
            console.log(`Travail ${id} supprimé avec succès.`);
        } else {
            console.error(`Erreur lors de la suppression`)
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
    }
}

export async function envoyerTravail(inputFile, afficherMessage) {
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
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${token}`
            },
            body: formData
        })
        if (response.ok) {
            const nouveauTravail = await response.json();
            console.log("Travail ajouté :", nouveauTravail);
            genererModal2();
            afficherMessage("Travail ajouté avec succès!");
        } else {
            afficherMessage("Erreur lors de l'ajout du travail");
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
    }
}


export function afficherMessage(message, formAjout){
    const messageErreur = document.createElement("div");
    messageErreur.textContent = message;
    messageErreur.style.color = "red";
    messageErreur.style.fontWeight = "bold";
    messageErreur.style.marginTop = "10px";
    formAjout.appendChild(messageErreur);
    setTimeout(() => messageErreur.remove(), 3000);
}


export function genererFigureModal(works, divGallerie) {
    divGallerie.innerHTML = "";
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
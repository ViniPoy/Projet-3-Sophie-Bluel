const contenuModal = document.querySelector(".contenu-modal");
const modal = document.getElementById("modal");

window.addEventListener("click", (event) => {
    if (event.target === modal && modal.style.display !== "none") {
        modal.style.display = "none";
        console.log("modale fermée via l'extérieur");
    }
});
    
function creerEntete(typeModal){
    const divBoutonFermer = document.createElement("div")
    divBoutonFermer.classList.add("div-btn-entete");
    if (typeModal === "form") {
        creerBoutonRetour(divBoutonFermer)
        divBoutonFermer.classList.add("element-space-between")
    }
    creerBoutonFermer(divBoutonFermer)
    contenuModal.appendChild(divBoutonFermer)
}

function creerBoutonFermer(divBoutonFermer) {
    const boutonFermer = document.createElement("button");
    boutonFermer.classList.add("btn-entete-modal");
    boutonFermer.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    divBoutonFermer.appendChild(boutonFermer)
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
    boutonRetour.addEventListener("click", () => {
        genererGallerieModal();
    })
    divBoutonFermer.appendChild(boutonRetour)
}

function genererFormModal() {
    contenuModal.innerHTML = "";

    creerEntete("form");

    const titreModal = document.createElement("h3");
    contenuModal.appendChild(titreModal);
    titreModal.innerText = "Ajout photo";

    const formAjout = document.createElement("form");
    contenuModal.appendChild(formAjout);

    const divAjoutPhoto = document.createElement("div");
    divAjoutPhoto.classList.add("ajout-photo");

    const imageAjoutPhoto = document.createElement("p");
    imageAjoutPhoto.innerHTML = '<i class="fa-regular fa-image"></i>';
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/jpeg, image/png";
    inputFile.id = "upload-photo"
    inputFile.style.display = "none"
    const boutonAjoutPhoto = document.createElement("button");
    boutonAjoutPhoto.innerText = "+ Ajouter photo";
    boutonAjoutPhoto.setAttribute("for", "upload-photo")
    const infoPhoto = document.createElement("p");
    infoPhoto.innerText = "jpg, png : 4mo max";

    const titreForm = document.createElement("p");
    titreForm.innerHTML = '<label for="titre">Titre</label><br><input type="text" name="titre" id="titre">'
    const categorieForm = document.createElement("p");
    categorieForm.innerHTML = '<label for="categorie">Catégorie</label><br><select name="categorie" id="categorie"></select>'
    
    const divValider = document.createElement("div");
    divValider.classList.add("bouton-modal");
    const boutonValider = document.createElement("button");
    boutonValider.classList.add("btn-valider");
    boutonValider.innerText = "Valider";
    boutonValider.type = "submit";

    formAjout.reset();
    
    divAjoutPhoto.innerHTML = "";
    divAjoutPhoto.append(imageAjoutPhoto, boutonAjoutPhoto, inputFile, infoPhoto);
    formAjout.append(divAjoutPhoto, titreForm, categorieForm, divValider);
    divValider.appendChild(boutonValider);

    chargerCategories();

    boutonAjoutPhoto.addEventListener("click", (event) => {
        event.preventDefault();
        inputFile.click();
    })

    inputFile.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 4 * 1024 * 1024) {
            const imageURL = URL.createObjectURL(file);
            divAjoutPhoto.innerHTML = `<img src="${imageURL}" alt="Aperçu" style="max-width: 35%; max-height: 100%; object-fit: contain;">`  
        } else {
            alert("Le fichier est trop volumineux (4 Mo max");
            inputFile.value = "";
        }
        verifierFormulaire(inputFile, titreInput, categorieSelect, boutonValider)
    })

    const titreInput = formAjout.querySelector("#titre");
    const categorieSelect = formAjout.querySelector("#categorie")
    titreInput.addEventListener("input", () => verifierFormulaire(inputFile, titreInput, categorieSelect, boutonValider));
    categorieSelect.addEventListener("change", () => verifierFormulaire(inputFile, titreInput, categorieSelect, boutonValider));

    verifierFormulaire(inputFile, titreInput, categorieSelect, boutonValider)

    formAjout.addEventListener("submit", async (event) => {
        event.preventDefault();
        envoyerTravail(inputFile, (message) => afficherMessage(message));
    })
}

function genererGallerieModal () {
    contenuModal.innerHTML = "";
    creerEntete("liste");
    const titreModal = document.createElement("h3");
    contenuModal.appendChild(titreModal);
    titreModal.innerText = "Gallerie photo";
    const divGallerie = document.createElement("div");
    divGallerie.classList.add("gallery-modal");
    const divBoutonAjouter = document.createElement("div");
    divBoutonAjouter.classList.add("bouton-modal");
    const boutonAjouter = document.createElement("button");
    boutonAjouter.classList.add("btn-ajouter");
    boutonAjouter.innerText = "Ajouter une photo";
    boutonAjouter.addEventListener("click", () => {
        genererFormModal();
    })
    contenuModal.appendChild(divGallerie);
    contenuModal.appendChild(divBoutonAjouter);
    divBoutonAjouter.appendChild(boutonAjouter);
    genererFigureModal(divGallerie);
}

function ouvrirModal() {
    modal.style.display = null;
    console.log("Modale ouverte");
    genererGallerieModal();
}

function verifierFormulaire(inputFile, titreInput, categorieSelect, boutonValider) {
    if (inputFile.files.length > 0 && titreInput.value.trim() !== "" && categorieSelect.value !== "") {
        boutonValider.classList.add("btn-active")
    } else {
        boutonValider.classList.remove("btn-active")
    }
}
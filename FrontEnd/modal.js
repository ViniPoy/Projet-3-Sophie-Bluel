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
    lienModale.addEventListener("click", (event) => {
        event.preventDefault();
        ouvrirModal();
    })

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
    const titreModal = document.createElement("h3");
    
    //Création d'une div gallery-modal pour la page 1 et d'une d'un formulaire pour la page 2
    const divGallerie = document.createElement("div");
    divGallerie.classList.add("gallery-modal");
    const formAjout = document.createElement("form");
    //Création d'une div à part pour intégrer du css et correspondre à la maquette (et de son contenu)
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



    const modal = document.getElementById("modal");   
    //Création de la fonction pour ouvrir la modal
    function ouvrirModal() {
        modal.style.display = null;
        console.log("Modale ouverte");
        genererModal1();
    }

    function genererModal1 () {
        contenuModal.innerHTML = "";
        divBoutonFermer.innerHTML = "";
        contenuModal.appendChild(divBoutonFermer);
        divBoutonFermer.style.justifyContent = "flex-end";
        divBoutonFermer.appendChild(boutonFermer);
        contenuModal.appendChild(titreModal);
        titreModal.innerText = "Gallerie photo";
        contenuModal.appendChild(divGallerie);
        contenuModal.appendChild(divBoutonAjouter);
        divBoutonAjouter.appendChild(boutonAjouter);
    }

    //Changement de "page" de la modal au clique sur le bouton ajouter une photo.
    boutonAjouter.addEventListener("click", () => {
        genererModal2();
    })

    async function chargerCategories() {
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
        
    function genererModal2 () {
        contenuModal.innerHTML = "";
        divBoutonFermer.innerHTML = "";
        contenuModal.appendChild(divBoutonFermer);
        divBoutonFermer.style.justifyContent = "space-between";
        divBoutonFermer.appendChild(boutonRetour);
        divBoutonFermer.appendChild(boutonFermer);
        contenuModal.appendChild(titreModal);
        titreModal.innerText = "Ajout photo";
        contenuModal.appendChild(formAjout);
        formAjout.reset();
        formAjout.appendChild(divAjoutPhoto);
        divAjoutPhoto.innerHTML = "";
        divAjoutPhoto.appendChild(imageAjoutPhoto);
        divAjoutPhoto.appendChild(boutonAjoutPhoto);
        divAjoutPhoto.appendChild(inputFile)
        divAjoutPhoto.appendChild(infoPhoto);
        formAjout.appendChild(titreForm);
        formAjout.appendChild(categorieForm);
        contenuModal.appendChild(divValider);
        divValider.appendChild(boutonValider);
        chargerCategories();
    }    
    
    boutonRetour.addEventListener("click", () => {
        genererModal1();
    })

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
    })
    boutonValider.addEventListener("click", async (event) => {
        event.preventDefault();
        const inputTitre = document.getElementById("titre");
        console.log(inputTitre);
        const inputCategorie = document.getElementById("categorie");
        console.log(inputCategorie);
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
    })

    function afficherMessage(message){
        const messageErreur = document.createElement("div");
        messageErreur.textContent = message;
        messageErreur.style.color = "red";
        messageErreur.style.fontWeight = "bold";
        messageErreur.style.marginTop = "10px";
        formAjout.appendChild(messageErreur);
        setTimeout(() => messageErreur.remove(), 3000);
    }
    
    async function supprimerTravail(id) {
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

    function genererFigureModal(works) {
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
    genererFigureModal(works);
    
    

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

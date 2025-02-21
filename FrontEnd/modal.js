const contenuModal = document.querySelector(".contenu-modal");
const modal = document.getElementById("modal");


//Si on clique en dehors de la modale quand celle-ci est ouverte, elle se ferme
window.addEventListener("click", (event) => {
    if (event.target === modal && modal.style.display !== "none") {
        modal.style.display = "none";
        console.log("modale fermée via l'extérieur");
    }
});

function ouvrirModal() {
    modal.style.display = null;
    console.log("Modale ouverte");
    genererGallerieModal();
}
    
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

function creerChampForm(attribut, titre, type) {
    const form = document.querySelector(".form-ajout");
    const conteneur = document.createElement("div");
    //On créé le label, mais on sépare le titre de l'attribut pour pouvoir mettre un titre avec majuscule et accent
    const label = document.createElement("label");
    label.setAttribute("for", attribut);
    label.innerText = titre;
    //On créé le champ associé au label
    let champ;
    if (type === "select") {
        champ = document.createElement("select");
    } else {
        champ = document.createElement("input");
        champ.type = type;
    }
    champ.name = attribut;
    champ.id = attribut;
    conteneur.append(label, champ);
    form.appendChild(conteneur);
}

function creerFootModal(classe, texte) {
    const divBouton = document.createElement("div");
    divBouton.classList.add("bouton-modal");
    contenuModal.appendChild(divBouton);
    const bouton = document.createElement("button");
    bouton.classList.add(classe);
    bouton.innerText = texte;
    divBouton.appendChild(bouton);
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
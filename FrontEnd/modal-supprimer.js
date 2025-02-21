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
    //On ajoute le bouton pour changer de page
    creerFootModal("btn-ajouter", "Ajouter une photo");
    const boutonAjouter = document.querySelector(".btn-ajouter");
    boutonAjouter.addEventListener("click", () => {
        genererFormModal();
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
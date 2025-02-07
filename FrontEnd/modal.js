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

    //Création du bouton pour fermer la modal
    const contenuModal = document .querySelector(".contenu-modal");
    const divBoutonFermer = document.createElement("div")
    divBoutonFermer.classList.add("div-btn-fermer");
    const boutonFermer = document.createElement("button");
    boutonFermer.classList.add("btn-fermer")
    boutonFermer.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    contenuModal.appendChild(divBoutonFermer);
    divBoutonFermer.appendChild(boutonFermer);

    //Création du titre de la modal
    const titreModal1 = document.createElement("h3");
    titreModal1.innerText ="Galerie photo";
    contenuModal.appendChild(titreModal1);

    //Création d'une div gallery-modal
    const divGallerie = document.createElement("div");
    divGallerie.classList.add("gallery-modal")
    contenuModal.appendChild(divGallerie)

    //Création d'une div avec le bouton pour changer l'écran de la modal
    const divBoutonAjouter = document.createElement("div");
    divBoutonAjouter.classList.add("bouton-modal");
    const boutonAjouter = document.createElement("button");
    boutonAjouter.classList.add("btn-ajouter");
    boutonAjouter.innerText = "Ajouter une photo";
    contenuModal.appendChild(divBoutonAjouter);
    divBoutonAjouter.appendChild(boutonAjouter);

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
    
        
    //Création de la fonction pour ouvrir la modal
    function ouvrirModal() {
        lienModale.addEventListener("click", (event) => {
            event.preventDefault;
            document.getElementById("modal").style.display = null;
            console.log("Modale ouverte");
        })
    }
    ouvrirModal();

    //Création de la fonction pour fermer la modal
    function fermerModal() {
        //avec le bouton de fermeture
        boutonFermer.addEventListener("click", (event) => {
            event.preventDefault();
            document.getElementById("modal").style.display = "none";
        })
        //En cliquent en dehors de la modal
        const modal = document.getElementById("modal");
        window.addEventListener("click", (event) => {
            //On vérifie si le clic est en dehors de .contenu-modal
            if (event.target === modal) { 
                modal.style.display = "none";
            }
        });
    }
    fermerModal();   
}

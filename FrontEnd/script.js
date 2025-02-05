// Récupération des données works da l'API
const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();


//Récupération de la div dans laquelle implémenter les <figure>
const divGallery = document.querySelector(".gallery");
//Création d'une fonction pour générer les éléments dans .gallery
function genererFigure(works) {
    //Création et ajout de chaque <figure> dans la <div class="gallery">
    works.forEach((figure) => {
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = figure.title;
        //Rattachement des éléments
        divGallery.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
    });
}
//Appel de la fonction
genererFigure(works);


//Création de la <div class="filtres">
const divFiltres = document.createElement("div");
divFiltres.classList.add("filtres");
//Attachement de la div à la section avant la gallery
divGallery.insertAdjacentElement("beforebegin", divFiltres);
//Création et attachement des boutons
const boutonTous = document.createElement("button");
boutonTous.classList.add("btn-filtrer");
boutonTous.innerText = "Tous";
divFiltres.appendChild(boutonTous);
const boutonObjets = document.createElement("button");
boutonObjets.classList.add("btn-filtrer");
boutonObjets.innerText = "Objets";
divFiltres.appendChild(boutonObjets);
const boutonAppart = document.createElement("button");
boutonAppart.classList.add("btn-filtrer");
boutonAppart.innerText = "Appartements";
divFiltres.appendChild(boutonAppart);
const boutonHotels = document.createElement("button");
boutonHotels.classList.add("btn-filtrer");
boutonHotels.innerText = "Hotels & Restaurants";
divFiltres.appendChild(boutonHotels);


//Création des évènements suite aux cliques sur les diférents bouton et génération des pages filtrées
boutonTous.addEventListener("click", function () {
    divGallery.innerHTML = "";
    genererFigure(works);
})

boutonObjets.addEventListener("click", function () {
    const worksFiltres = works.filter(work => work.categoryId === 1);
    divGallery.innerHTML = "";
    genererFigure(worksFiltres);
})

boutonAppart.addEventListener("click", function () {
    const worksFiltres = works.filter(work => work.categoryId === 2);
    divGallery.innerHTML = "";
    genererFigure(worksFiltres);
})

boutonHotels.addEventListener("click", function () {
    const worksFiltres = works.filter(work => work.categoryId === 3);
    divGallery.innerHTML = "";
    genererFigure(worksFiltres);
})


// Création de l'évènement qui emmènera sur la page de connexion au moment du clique sur le le "login" de la barre de navigation.
const boutonLogin = document.getElementById("login");
boutonLogin.addEventListener("click", () => {
    window.location.href = "login.html";
})


const token = localStorage.getItem("userToken");

if (token) {
    console.log("Utilisateur connecté, affichage des options admin.");
    //Changement du bouton login en logout, quand on clique sur logout, on reste sur la page mais en tant que visiteur
    boutonLogin.innerText = "logout";
    boutonLogin.addEventListener("click", () => {
        window.location.href = "index.html";
        localStorage.removeItem("userToken"); 
    })
    //On vire les boutons de filtres comme sur le figma
    divFiltres.innerHTML = "";
    //On créé le bandeau noir pour bien in diquer le mode admin
    const divEdition = document.createElement("div");
    divEdition.classList.add("mode-edition");
    const header = document.querySelector("header");
    header.insertAdjacentElement("beforebegin", divEdition);
    divEdition.innerHTML = "<i class='fa-regular fa-pen-to-square'></i> Mode édtion";
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
        event.preventDefault;
        console.log("Modale ouverte");
    })
} else {
    console.log("Utilisateur non connecté, mode visiteur.");
}

// Récupération des données works et categories da l'API
const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();
const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCategories.json();

//Récupération de la div dans laquelle implémenter les <figure>
const divGallery = document.querySelector(".gallery");
//Création d'une fonction pour générer les éléments dans .gallery
function genererFigure(works) {
    //Création et ajout de chaque <figure> dans la <div class="gallery">
    works.forEach((figure) => {
        const figureElement = document.createElement("figure");
        figureElement.id = `work-${figure.id}`;
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
//Création et attachement du bouton "Tous"
const boutonTous = document.createElement("button");
boutonTous.classList.add("btn-tous");
boutonTous.innerText = "Tous";
divFiltres.appendChild(boutonTous);
boutonTous.addEventListener("click", function () {
    divGallery.innerHTML = "";
    genererFigure(works);
})
//Création d'une fonction pour générer les boutons de filtre via l'api
function genereBoutonFiltre() {
    categories.forEach((category) => {
        const bouton = document.createElement("button");
        bouton.classList.add("btn-filtrer");
        bouton.innerText = category.name;
        divFiltres.appendChild(bouton);
        bouton.addEventListener("click", function () {
            const worksFiltres = works.filter(work => work.categoryId === category.id);
            divGallery.innerHTML = "";
            genererFigure(worksFiltres);
        })
    })
}
//Appel de la fonction
genereBoutonFiltre();


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
    divFiltres.style.display = "none";
    //On créé le bandeau noir pour bien indiquer le mode admin
    const divEdition = document.createElement("div");
    divEdition.classList.add("mode-edition");
    const header = document.querySelector("header");
    header.insertAdjacentElement("beforebegin", divEdition);
    divEdition.innerHTML = "<i class='fa-regular fa-pen-to-square'></i> Mode édtion";
    
} else {
    console.log("Utilisateur non connecté, mode visiteur.");
}

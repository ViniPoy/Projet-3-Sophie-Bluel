const divGallery = document.querySelector(".gallery");
const divFiltres = document.querySelector(".filtres");

linksLogin();
isConneceted();

let works;

getWorks().then((data) => {
    //On tock les travaux récupérés
    works = data;
    //Génération des filtres
    genererBoutonFiltre();
    //Génération de la gallerie
    genererWorksGallerie(works);
}).catch(error => console.error("Erreur lors de la récupération des travaux :", error));


//Création d'une fonction pour générer les éléments dans .gallery
function genererWorksGallerie(worksToShow) {
    //A chaque appel de de la fontion on vide le contenu de la div pour éviter les éléments en double
    divGallery.innerHTML = "";
    //On génère chaque objets de la liste de l'api
    worksToShow.forEach((figure) => {
        ajoutWorks(figure);
    });
}

//Création d'une fonction pour afficher une photo et son titre
function ajoutWorks(figure) {
    //On créé l'élément figure avec un id qui coreespond à celui de l'api (pour les supressions et ajout futur)
    const figureElement = document.createElement("figure");
    figureElement.id = `work-${figure.id}`;
    divGallery.appendChild(figureElement);
    //On créé une image et une figcaption dont la source et le text proviennent de l'api
    const imageElement = document.createElement("img");
    imageElement.src = figure.imageUrl;
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = figure.title;
    figureElement.append(imageElement, figcaptionElement);
}

function creerBoutonTous() {
    //On attribue l'id 0 au bouton tous pour assurer le bon fonctionnement du script (impossible de programmer un id 0 sur l'api)
    let category = { name: "Tous", id: "0" };
    const boutonTous = creerBouton(category);
    //On ajoute une classe qui permet de simuler un focus au chargement de la page
    boutonTous.classList.add("btn-active");
}

function creerBouton(category) {
    let worksFiltered;
    //On créé un bouton dont le texte correspond au nom de la catégorie associé dans l'api
    const bouton = document.createElement("button");
    bouton.classList.add("btn-filtrer");
    bouton.innerText = category.name;
    divFiltres.appendChild(bouton);
    //Au clique sur un bouton on simule le focus dessus tout en retirant le focus du bouton précédent
    bouton.addEventListener("click", () => {
        document.querySelectorAll(".btn-filtrer").forEach(btn => btn.classList.remove("btn-active"));
        bouton.classList.add("btn-active");
        //Si le bouton n'est pas le bouton Tous, on filtre la galerie selon la catégorie du bouton
        if (category.id > 0) {
            worksFiltered = works.filter(work => work.categoryId === category.id);
        //Sinon on affiche tout les travaux sans filtres, avec le bouton Tous
        } else {
            worksFiltered = works;
        }
        genererWorksGallerie(worksFiltered);
    });
    return bouton; // Retourne le bouton créé
}

//On appelle les fonctions précédentes dans celle ci pour générer les boutons
async function genererBoutonFiltre() {
    creerBoutonTous();
    const categories = await getCategories();
    categories.forEach((category) => {
        creerBouton(category);
    });
}

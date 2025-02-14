const divGallery = document.querySelector(".gallery");
const divFiltres = document.querySelector(".filtres");

linksLogin();
isConneceted();

let works;

getWorks().then((data) => {
    works = data; //Stock les travaux récupérés
    genererBoutonFiltre(); //Génération des filtres
    genererWorksGallerie(works); //Génération de la gallerie
}).catch(error => console.error("Erreur lors de la récupération des travaux :", error));



//Création d'une fonction pour générer les éléments dans .gallery
function genererWorksGallerie(worksToShow) {
    divGallery.innerHTML = "";
    worksToShow.forEach((figure) => {
        ajoutWorks(figure);
    });
}

function ajoutWorks(figure) {
    const figureElement = document.createElement("figure");
    figureElement.id = `work-${figure.id}`;
    const imageElement = document.createElement("img");
    imageElement.src = figure.imageUrl;
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = figure.title;
    divGallery.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);
}

function creerBoutonTous() {
    let category = { name: "Tous", id: "0" };
    const boutonTous = creerBouton(category);
    boutonTous.classList.add("btn-active");
}

async function genererBoutonFiltre() {
    creerBoutonTous();
    const categories = await getCategories();
    categories.forEach((category) => {
        creerBouton(category);
    });
}

function creerBouton(category) {
    let worksFiltered;
    const bouton = document.createElement("button");
    bouton.classList.add("btn-filtrer");
    bouton.innerText = category.name;
    divFiltres.appendChild(bouton);
    bouton.addEventListener("click", async function () {
        document.querySelectorAll(".btn-filtrer").forEach(btn => btn.classList.remove("btn-active"));
        bouton.classList.add("btn-active");

        if (category.id > 0) {
            worksFiltered = works.filter(work => work.categoryId === category.id);
        } else {
            worksFiltered = works;
        }
        genererWorksGallerie(worksFiltered);
    });
    return bouton; // Retourne le bouton créé
}

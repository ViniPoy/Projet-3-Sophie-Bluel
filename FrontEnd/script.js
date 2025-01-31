// Récupération des données works da l'API
const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();

//Récupération de la div dans laqquelle implémenter les <figure>
const divGallery = document.querySelector(".gallery");

//Création et ajout de chaque <figure> dans la <div class="gallery">
works.forEach((figure) => {
    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = figure.imageUrl;
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = figure.title;

    divGallery.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);
});

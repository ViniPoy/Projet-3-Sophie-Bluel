// Récupération des données works da l'API
const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();

const figure = works[0];
const sectionPortfolio = document.getElementById("portfolio");
const figureElement = document.createElement("figure");
const imageElement = document.createElement("img");
imageElement.src = figure.imageUrl;
const figcaptionElement = document.createElement("figcaption");
figcaptionElement.innerText = figure.title;

sectionPortfolio.appendChild(figureElement);
figureElement.appendChild(imageElement);
figureElement.appendChild(figcaptionElement);
const token = localStorage.getItem("userToken");

function isConneceted() {
    //L'utilisateur est connecté donc:
    if (token) {
        //On suppriume les boutons de filtres comme sur le figma
        divFiltres.style.display = "none";
        //On créé le bandeau noir pour bien indiquer le mode admin
        const divEdition = document.createElement("div");
        divEdition.classList.add("mode-edition");
        //On attache le bandeau noir au dessus du header
        const header = document.querySelector("header");
        header.insertAdjacentElement("beforebegin", divEdition);
        divEdition.innerHTML = "<i class='fa-regular fa-pen-to-square'></i> Mode édtion";
        //Je récupère la section portfolio, ainsi que le titre a l'intérieur
        const sectionPortfolio = document.getElementById("portfolio");
        const titreProjet = document.querySelector("#portfolio h2");
        //Je créé une div que je place avant le tritre
        const divEntete = document.createElement("div");
        divEntete.classList.add("entete");
        sectionPortfolio.insertBefore(divEntete, titreProjet);
        //Je déplace le titre à  l'intérieur de la div que je viens de créer
        divEntete.appendChild(titreProjet);
        //Et je créé un lien qui ouvrira la modale, que je mets aussi dans la div, le but étant de pouvoir les mettres côte à côte comme sur le figma
        const lienModale = document.createElement("a")
        lienModale.href = "#";
        lienModale.innerHTML = "<i class='fa-regular fa-pen-to-square'></i> Modifier"
        divEntete.appendChild(lienModale)
        //Au clique sur le lien, la modale s'ouvre
        lienModale.addEventListener("click", (event) => {
            event.preventDefault();
            ouvrirModal();
        })
    }
}

function linksLogin() {
    const boutonLogin = document.getElementById("login");
    // Si l'utilisateur est connecté:
    if (token) {
        //Changement du bouton login en logout, quand on clique sur logout, on reste sur la page mais en tant que visiteur
        boutonLogin.innerText = "logout";
        //Au clique sur le bouton logout, on déconnecte l'utilisateur
        boutonLogin.addEventListener("click", () => {
            window.location.href = "index.html";
            localStorage.removeItem("userToken");
        }) 
    //Sinon:
    } else {
        //Au clique sur le le bouton login, on redirige vers la page de connexion de l'utilisateur
        boutonLogin.addEventListener("click", () => {
            window.location.href = "login.html";
        })
    }
}
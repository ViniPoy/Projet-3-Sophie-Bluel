const token = localStorage.getItem("userToken");

function isConneceted() {
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
        lienModale.addEventListener("click", (event) => {
            event.preventDefault();
            ouvrirModal();
        })
    }
}

function linksLogin() {
    const boutonLogin = document.getElementById("login");
    if (token) {
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
        boutonLogin.addEventListener("click", () => {
            window.location.href = "login.html";
        })
    }
}
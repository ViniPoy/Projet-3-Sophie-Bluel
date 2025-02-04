//Récupération du formulaire de connection
const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
    event.preventDefault();//On empêche la page de se recharger à l'évènement submit
    //On récupère les valeurs entrées par l'utilisateur
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    //On effectue un try/catch: si les données sont bonnes on renvoie sur la page d'accueil en stockant les données en local, autrment on affiche un message d'erreur
    try {
        const reponse = await fetch("http://localhost:5678/api/users/login" , {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        })
        const data = await reponse.json();
        if (!reponse.ok) {
            throw new Error("Erreur dans l'identifiant ou le mot de passe.")
        }
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userEmail", email);
        window.location.href="index.html";
    } catch (error) {
        showError(error.message);
    }
})

//Fonction qui affiche le message d'erreur
function showError(message) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = message;
}
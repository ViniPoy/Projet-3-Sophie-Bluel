//Récupération du formulaire de connection
const form = document.querySelector("form");
//On récupère les valeurs entrées par l'utilisateur
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
//On fait en sorte que le bouton change de couleur quand les input sont remplis
document.querySelectorAll("#email, #password").forEach(input => {
    input.addEventListener("input", () => {
        if (emailInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
            document.querySelector(".btn-valider").classList.add("btn-active");
        } else {
            document.querySelector(".btn-valider").classList.remove("btn-active");
        }
    })
})
//On écoute le submit du formulaire pour vérifier qu'il n'y ait pas d'erreur.
form.addEventListener("submit", async (event) => {
    event.preventDefault();//On empêche la page de se recharger à l'évènement submit
    const email = emailInput.value;
    const password = passwordInput.value
    const userData = await postUserId(email, password);
    if (userData) {
        localStorage.setItem("userToken", userData.token);
        localStorage.setItem("userEmail", email);
        window.location.href="index.html";
    } else {
        showError("Identifiant ou mot de passe incorrects. Veuillez réessayer.")
    }
})

//Fonction qui affiche le message d'erreur
function showError(message) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = message;
}

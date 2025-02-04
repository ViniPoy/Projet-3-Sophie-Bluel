const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
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
        window.location.href="index.html";
    } catch (error) {
        showError(error.message);
    }
})


function showError(message) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = message;
}
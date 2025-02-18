async function getWorks() {
    const reponseWorks = await fetch("http://localhost:5678/api/works");
    const works = await reponseWorks.json();
    return works;
}

async function getCategories() {
    const reponseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await reponseCategories.json();
    return categories;
}

async function deleteWorks(id) {
    try {
        const response = await fetch (`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }  
        })
        return response.ok
    } catch (error) {
        console.error("Erreur réseau :", error);
        return false;
    }
}

async function postWorks(donnees) {
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${token}`
            },
            body: donnees
        })
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Erreur lors de l'envoi :", response.status);
            return null;
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
        return null
    }
}

// Création du formulaire d'authentification dynamiquement

function createLoginForm() {
    const container = document.getElementById("loginForm");
    if (!container) return;

    // Création du formulaire
    const form = document.createElement("form");
    form.id = "loginFormElement"; // Ajout d'un ID si besoin

    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email : ";
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.required = true;

    const passwordLabel = document.createElement("label");
    passwordLabel.textContent = "Mot de passe : ";
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "password";
    passwordInput.required = true;

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Se connecter";

    const passwordForget = document.createElement("p");
    passwordForget.textContent = "Mot de passe oublié";


    // Ajout des éléments au formulaire
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(submitButton);
    form.appendChild(document.createElement("br"));
    form.appendChild(passwordForget);
    

    // Ajout du formulaire au container
    container.appendChild(form);

    // Gestion de l'envoi du formulaire
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        authentification(emailInput.value, passwordInput.value);
    });
}

// Exécuter la fonction à la fin du chargement de la page
document.addEventListener("DOMContentLoaded", createLoginForm);

// Authentification

function authentification(emailInput, passwordInput){
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
            },
            body: JSON.stringify({ email: emailInput, password: passwordInput})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Echec de l'authentification");
            }
            return response.json();
        })
        .then(data => {
            sessionStorage.setItem("token", data.token);
            console.log("Token reçu :", data.token);
            window.location.href = "/index.html";
        })
        .catch(error => {
            console.error("Erreur :", error.message);

            if (!document.getElementById("authError")) {
                const authError = document.createElement("p");
                const form = document.getElementById("loginFormElement");
                authError.textContent = "Identifiants incorrects !";
                authError.id = "authError";
                form.appendChild(authError);
            }

        });
}

// Admin mode

export function adminMode() {
    const token = sessionStorage.getItem("token");

    if (!token || window.location.pathname !== "/index.html") {

        const login = document.getElementById("login"); 
        login.classList.toggle("displayBlock");

        const logout = document.getElementById("logout");
        logout.classList.toggle("displayNone");

        return; // Pas de token ou pas sur index.html → on ne fait rien
    }

    const adminBanner = document.createElement("div");
    adminBanner.id = "admin-banner";
    adminBanner.style.position = "fixed";
    adminBanner.style.top = "0";
    adminBanner.style.left = "0";
    adminBanner.style.width = "100%";
    adminBanner.style.backgroundColor = "black";
    adminBanner.style.color = "white";
    adminBanner.style.display = "flex";
    adminBanner.style.alignItems = "center";
    adminBanner.style.justifyContent = "center";
    adminBanner.style.padding = "10px";
    
    const editionIcone = document.createElement("i");
    editionIcone.classList.add("fa", "fa-pen-to-square"); // Icône crayon d'édition
    editionIcone.style.fontSize = "24px";
    editionIcone.style.marginRight = "10px";
    editionIcone.style.color = "white";

    const editLink = document.createElement("a");
    editLink.href = "#";
    editLink.innerText = "Mode édition";
    editLink.style.color = "white";
    editLink.style.textDecoration = "none";

    editLink.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Ouverture de la modale d'édition (à implémenter)");
    });

    adminBanner.appendChild(editionIcone);
    adminBanner.appendChild(editLink);
    document.body.prepend(adminBanner);

    const login = document.getElementById("login"); 
    login.classList.toggle("displayNone");

    const logout = document.getElementById("logout");
    logout.classList.toggle("displayBlock");
}



// Supprimer le token du sessionStorage
export function setupLogout() {
    const logoutButton = document.getElementById("logout");

    if (!logoutButton) {
        console.warn("Aucun bouton de déconnexion trouvé.");
        return;
    }

    logoutButton.addEventListener("click", (event) => {
        event.preventDefault();
        sessionStorage.removeItem("token");
        console.log("Déconnexion réussie. Token supprimé du sessionStorage.");
        window.location.href = "/index.html"; 
    });

}




/*
. Bannière d'accès modification => modale
. CSS
. Commentaires formalisés JS doc


 */


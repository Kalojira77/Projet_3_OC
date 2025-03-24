import { modalOpen } from './modal.js'; 

// Création du formulaire d'authentification dynamiquement


function createLoginForm() {
    const container = document.getElementById("loginForm");
    if (!container) return;

    const form = document.createElement("form");
    form.id = "loginFormElement"; 

    const emailLabel = document.createElement("label");
    emailLabel.textContent = "E-mail : ";
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
    submitButton.classList = "loginBtn";

    const passwordForget = document.createElement("a");
    passwordForget.textContent = "Mot de passe oublié";
    passwordForget.href = "#";


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
document.addEventListener("DOMContentLoaded", createLoginForm());

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

        return; 
    }

    const adminBanner = document.createElement("div");
    adminBanner.id = "admin-banner";


    // Lien vers la modale
    
    const modalLink = document.createElement("a");
    modalLink.id = "modalLink";
    modalLink.href = "#";

    const editIcone = document.createElement("i");
    editIcone.classList.add("fa-solid", "fa-pen-to-square", "editIcon1"); 

    const editText = document.createElement("span");
    editText.id = "editText";
    editText.innerText = " Mode édition";

    modalLink.addEventListener("click", (event) => {
        event.preventDefault();
        modalOpen();
    });

    adminBanner.appendChild(modalLink);
    modalLink.appendChild(editIcone);
    modalLink.appendChild(editText);
    document.body.prepend(adminBanner);

    // Switch de login -> logout dans la navbar

    const login = document.getElementById("login"); 
    login.classList.toggle("displayNone");

    const logout = document.getElementById("logout");
    logout.classList.toggle("displayBlock");

    const filter = document.getElementById('filter');
    filter.style.display = "none";

    const modification = document.getElementById('modification');
    modification.style.display = "flex";
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


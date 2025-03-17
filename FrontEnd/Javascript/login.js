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

// Ci dessous, work in progress
// => Le problème c'est que les fichiers sont pas correctement liés ... login.js s'execute sur login.html et pas sur index.html


function handleLogout() {
    // Supprimer le token du sessionStorage
    sessionStorage.removeItem("token");

    console.log("Déconnexion réussie. Token supprimé du sessionStorage.");

    // Redirection vers la page de connexion après déconnexion
    window.location.href = "/index.html"; 
}

// Assurer que l'élément avec l'ID "logout" existe avant d'ajouter l'événement
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout");

        if (logoutButton) {
            // Ajouter l'événement "click" au bouton de déconnexion
            logoutButton.addEventListener("click", (event) => {
                event.preventDefault();
                handleLogout();
            });
        } else {
            console.warn("Aucun bouton de déconnexion trouvé.");
        }
});

// Admin mode
// function adminMode("token"){
//     if (!sessionStorage.)
//     alors -> changer le login en logout dans la navbarre
//           -> faire apparaitre une div en haut avec un lien vers la modale
// }




/*
. Bannière d'accès modification => modale
. Gestion du bouton de navigation "login/logout" à l'aide de toggle " https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_toggle_class "
. CSS
. Commentaires formalisés JS doc


 */


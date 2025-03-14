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

    // Ajout des éléments au formulaire
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(submitButton);

    // Ajout du formulaire au container
    container.appendChild(form);

    // Gestion de l'envoi du formulaire
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        alert(`Email: ${emailInput.value}\nMot de passe: ${passwordInput.value}`);
    });
}

// Exécuter la fonction à la fin du chargement de la page
document.addEventListener("DOMContentLoaded", createLoginForm);

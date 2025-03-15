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
        authentification(emailInput.value, passwordInput.value);
        alert(`Email: ${emailInput.value}\nMot de passe: ${passwordInput.value}`);
    });
}

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
            localStorage.setItem("token", data.token);
            alert("Connexion réussie !");
            console.log("Token reçu :", data.token);
        })
        .catch(error => {
            console.error("Erreur :", error.message);
            alert("Identifiants incorrects !");
        });
}

// Exécuter la fonction à la fin du chargement de la page
document.addEventListener("DOMContentLoaded", createLoginForm);

/*
1.Lire l'entrée email et password donnée par l'utilisateur, l'associer à une variable ? au format json ?.
2.Récupérer les identifiants connus via l'api et transformer le resultat en json.
3.Comparer les deux.
4.Si les id sont corrects -> Donner un accès à l'utilisateur en stockant un token sur son navigateur dans le localstorage.
5.Si les id sont incorrects (=/= 200 coté serv) -> Renvoyer une erreur et afficher un message
 */


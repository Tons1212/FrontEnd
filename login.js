// Variables d'objets des éléments pour le login

const submit = document.querySelector(".submit");
const error = document.querySelector("form p");

let loginBtn = submit.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const user = {
    email: email.value,
    password: password.value,
  };
  try {
    const reponse = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (reponse.ok) {
      const data = await reponse.json();
      if (data.userId) {
        localStorage.setItem("token", data.token);
        location.href = "index.html";
      } else {
        error.innerText = "Erreur dans l'identifiant et/ou le mot de passe";
        function errDelete() {
          error.innerText = "";
        }
        setTimeout(errDelete, 25000);
      }
    } else {
      console.error("Erreur lors de la requête :", reponse.status);
    }
  } catch (err) {
    console.error("erreur lors de la requête:", err);
  }
});

/* =========================================
   HUNTER HELP
   FRONTEND MVP
========================================= */


/*
  CHAVES DE ACESSO DO PROTÓTIPO

  IMPORTANTE:
  Isto NÃO é segurança real.

  Qualquer chave colocada aqui pode ser
  encontrada no código do site.

  No produto real, a validação deverá
  acontecer em um backend.
*/

const agencyKeys = {
  "HUNTER-PRIME-2026": {
    name: "Imobiliária Prime",
    initials: "IP"
  },

  "HUNTER-DEMO-001": {
    name: "Imobiliária Demo",
    initials: "ID"
  }
};


/* =========================================
   ELEMENTOS
========================================= */

const introScreen = document.getElementById("introScreen");
const loginScreen = document.getElementById("loginScreen");
const app = document.getElementById("app");

const loginForm = document.getElementById("loginForm");
const agencyKeyInput = document.getElementById("agencyKey");
const loginError = document.getElementById("loginError");

const toggleKey = document.getElementById("toggleKey");
const logoutButton = document.getElementById("logoutButton");

const agencyName = document.getElementById("agencyName");

const menuButton = document.getElementById("menuButton");
const sidebar = document.querySelector(".sidebar");

const diagnosticModal = document.getElementById("diagnosticModal");
const diagnosticForm = document.getElementById("diagnosticForm");
const diagnosticResult = document.getElementById("diagnosticResult");


/* =========================================
   INICIALIZAÇÃO
========================================= */

window.addEventListener("load", () => {

  const savedAgency = localStorage.getItem("hunterAgency");

  setTimeout(() => {

    introScreen.style.display = "none";

    if (savedAgency) {

      try {

        const agency = JSON.parse(savedAgency);

        enterDashboard(agency);

      } catch {

        showLogin();

      }

    } else {

      showLogin();

    }

  }, 2800);

});


/* =========================================
   MOSTRAR LOGIN
========================================= */

function showLogin() {

  loginScreen.classList.remove("hidden");
  app.classList.add("hidden");

}


/* =========================================
   LOGIN
========================================= */

loginForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const key = agencyKeyInput.value.trim();

  loginError.textContent = "";

  if (!key) {

    loginError.textContent = "Digite sua chave de acesso.";

    return;

  }


  const agency = agencyKeys[key];

  if (!agency) {

    loginError.textContent =
      "Chave inválida. Verifique os dados fornecidos.";

    agencyKeyInput.classList.add("shake");

    setTimeout(() => {
      agencyKeyInput.classList.remove("shake");
    }, 400);

    return;

  }


  /*
    Guarda somente os dados da sessão
    no navegador.

    No sistema real isso será substituído
    por autenticação no backend.
  */

  localStorage.setItem(
    "hunterAgency",
    JSON.stringify(agency)
  );

  enterDashboard(agency);

});


/* =========================================
   ENTRAR NO DASHBOARD
========================================= */

function enterDashboard(agency) {

  loginScreen.classList.add("hidden");
  app.classList.remove("hidden");

  agencyName.textContent = agency.name;

  document.querySelectorAll(".account-avatar, .profile-avatar")
    .forEach(element => {
      element.textContent = agency.initials;
    });

}


/* =========================================
   MOSTRAR / ESCONDER CHAVE
========================================= */

toggleKey.addEventListener("click", () => {

  if (agencyKeyInput.type === "password") {

    agencyKeyInput.type = "text";
    toggleKey.textContent = "Ocultar";

  } else {

    agencyKeyInput.type = "password";
    toggleKey.textContent = "Mostrar";

  }

});


/* =========================================
   LOGOUT
========================================= */

logoutButton.addEventListener("click", () => {

  localStorage.removeItem("hunterAgency");

  app.classList.add("hidden");
  loginScreen.classList.remove("hidden");

  agencyKeyInput.value = "";

  loginError.textContent = "";

});


/* =========================================
   MENU MOBILE
========================================= */

menuButton.addEventListener("click", () => {

  sidebar.classList.toggle("mobile-open");

});


document.querySelectorAll(".nav-item").forEach(item => {

  item.addEventListener("click", () => {

    document.querySelectorAll(".nav-item")
      .forEach(nav => nav.classList.remove("active"));

    item.classList.add("active");

    sidebar.classList.remove("mobile-open");

  });

});


/* =========================================
   DIAGNÓSTICO
========================================= */

function openDiagnostic() {

  diagnosticModal.classList.add("open");

  diagnosticResult.classList.remove("show");

}


function closeDiagnostic() {

  diagnosticModal.classList.remove("open");

}


diagnosticForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const button = diagnosticForm.querySelector("button");

  button.innerHTML = "Analisando...";

  button.disabled = true;

  setTimeout(() => {

    button.innerHTML = "Análise concluída ✓";

    diagnosticResult.classList.add("show");

    button.disabled = false;

  }, 1400);

});


/* =========================================
   FERRAMENTAS
========================================= */

function selectTool(tool) {

  const names = {

    leads: "Mais Leads",
    atendimento: "Atendimento",
    anuncios: "Anúncios",
    social: "Social Media",
    concorrentes: "Concorrentes",
    seo: "SEO Local",
    automacao: "Automação"

  };

  alert(
    `${names[tool]}\n\n` +
    `Esta ferramenta será conectada ao motor de inteligência do Hunter Help.`
  );

}


/* =========================================
   FECHAR MODAL COM ESC
========================================= */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    closeDiagnostic();

  }

});


/* =========================================
   ANIMAÇÃO DE ENTRADA DOS CARDS
========================================= */

const observer = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

      }

    });

  },

  {
    threshold: 0.08
  }

);


document
  .querySelectorAll(
    ".metric-card, .tool-card, .score-card, .opportunities-card"
  )
  .forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(15px)";
    card.style.transition = "opacity .6s ease, transform .6s ease";

    observer.observe(card);

  });

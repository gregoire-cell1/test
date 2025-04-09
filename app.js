/* =========================
   Navigation et changement de pages
============================ */
const navLinks = document.querySelectorAll('.nav-link, .btn-main');
const sections = document.querySelectorAll('.page-section');

function switchPage(pageId) {
  sections.forEach(section => {
    if (section.id === pageId) {
      section.classList.add('active-section');
      if (pageId === "formations") renderCards();
    } else {
      section.classList.remove('active-section');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-page') === pageId);
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetPage = link.getAttribute('data-page');
    if (targetPage) {
      switchPage(targetPage);
      document.getElementById(targetPage).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* =========================
   Données et affichage des formations
============================ */
const formations = [
  {
    nom: "BUT Informatique",
    etablissement: "IUT de Paris - Rives de Seine",
    ville: "Paris",
    transport: "Métro 6 - Quai de la Gare",
    duree: "3 ans",
    diplome: "BUT",
    debouches: "Développeur, Data Analyst, poursuite en Master",
    cout: "170€ / an",
    parcoursup: "Oui",
    emploi_du_temps: [
      "Lundi : Algorithmique",
      "Mardi : Base de données",
      "Mercredi : Développement Web",
      "Jeudi : Projet tutoré",
      "Vendredi : Anglais"
    ],
    satisfaction: 4.5,
    description: "Vie étudiante riche, nombreux projets collaboratifs et stages réguliers.",
    etudiants: ["Emma, 20 ans", "Lucas, 21 ans", "Sarah, 19 ans"]
  },
  {
    nom: "Licence Psychologie",
    etablissement: "Université Lyon 2",
    ville: "Lyon",
    transport: "Tram T1 - Quai Claude Bernard",
    duree: "3 ans",
    diplome: "Licence",
    debouches: "Psychologue, RH, poursuite en Master",
    cout: "170€ / an",
    parcoursup: "Oui",
    emploi_du_temps: [
      "Lundi : Méthodologie",
      "Mardi : TD de psychologie",
      "Jeudi : Statistiques",
      "Vendredi : Cours magistral"
    ],
    satisfaction: 3.9,
    description: "Association dynamique avec un équilibre entre théorie et pratique.",
    etudiants: ["Chloé, 20 ans", "Yanis, 22 ans"]
  },
  {
    nom: "BTS Commerce International",
    etablissement: "Lycée Jean Monnet",
    ville: "Marseille",
    transport: "Bus Lignes 15, 22",
    duree: "2 ans",
    diplome: "BTS",
    debouches: "Commercial export, chargé de clientèle, poursuite en licence pro",
    cout: "250€ / an",
    parcoursup: "Oui",
    emploi_du_temps: [
      "Lundi : Économie internationale",
      "Mardi : Techniques de vente",
      "Mercredi : Langues étrangères",
      "Jeudi : Projet d'entreprise",
      "Vendredi : Stage en entreprise"
    ],
    satisfaction: 4.2,
    description: "Formation professionnalisante avec une forte dimension internationale.",
    etudiants: ["Marc, 21 ans", "Léa, 20 ans", "Théo, 22 ans"]
  }
  // Ajoute d'autres formations selon tes besoins
];

const container = document.getElementById("cardsContainer");
const searchInput = document.getElementById("searchInput");

/* Créer une carte avec le bouton "Contacter un étudiant" */
function createCard(formation) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <h2>${formation.nom}</h2>
    <p><strong>Établissement :</strong> ${formation.etablissement}</p>
    <p><strong>Ville :</strong> ${formation.ville} <em>(${formation.transport})</em></p>
    <p><strong>Durée :</strong> ${formation.duree}</p>
    <p><strong>Diplôme :</strong> ${formation.diplome}</p>
    <p><strong>Débouchés :</strong> ${formation.debouches}</p>
    <p><strong>Coût :</strong> ${formation.cout}</p>
    <p><strong>Parcoursup :</strong> ${formation.parcoursup}</p>
    <p><strong>Emploi du temps :</strong></p>
    <ul>${formation.emploi_du_temps.map(j => `<li>${j}</li>`).join("")}</ul>
    <p><strong>Note de satisfaction :</strong> ⭐ ${formation.satisfaction}/5</p>
    <p><strong>Vie étudiante :</strong> ${formation.description}</p>
    <button class="contact-btn" data-students='${JSON.stringify(formation.etudiants)}'>Contacter un étudiant</button>
  `;
  container.appendChild(card);
}

function renderCards() {
  container.innerHTML = "";
  formations.forEach(createCard);
}

/* Recherche par nom de formation */
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  container.innerHTML = "";
  formations.filter(form => form.nom.toLowerCase().includes(query))
            .forEach(createCard);
});

/* =========================
   Gestion de la modale "Contacter un étudiant"
============================ */
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalBody = document.getElementById("modalBody");

function openModal(students) {
  let listHTML = "<ul>";
  students.forEach(student => {
    listHTML += `<li>${student}</li>`;
  });
  listHTML += "</ul>";
  modalBody.innerHTML = listHTML;
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

modalClose.addEventListener("click", closeModal);
window.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

/* Délégation pour le bouton de contact étudiant */
document.addEventListener("click", e => {
  if (e.target && e.target.classList.contains("contact-btn")) {
    const students = JSON.parse(e.target.getAttribute("data-students"));
    openModal(students);
  }
});

/* =========================
   Initialisation
============================ */
document.addEventListener("DOMContentLoaded", () => {
  switchPage("home");
  if (document.getElementById("formations").classList.contains("active-section")) {
    renderCards();
  }
});

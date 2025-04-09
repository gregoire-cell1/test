/* ===================================================
   Navigation et changement de pages
=================================================== */
const navLinks = document.querySelectorAll('.nav-link, .btn-main, .scroll-btn');
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

/* ===================================================
   Données et affichage des formations
   (Incluant des informations détaillées par étudiant)
=================================================== */
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
    etudiants: [
      {
        nom: "Emma",
        age: 20,
        domaine: "Développement Web",
        bio: "Passionnée de code et de technologie, Emma travaille sur des projets innovants et aime partager ses astuces.",
        email: "emma@example.com"
      },
      {
        nom: "Lucas",
        age: 21,
        domaine: "Data Science",
        bio: "Lucas est un geek des données, capable de transformer des chiffres en histoires captivantes.",
        email: "lucas@example.com"
      },
      {
        nom: "Sarah",
        age: 19,
        domaine: "UI/UX",
        bio: "Sarah allie créativité et technique pour concevoir des interfaces intuitives et design.",
        email: "sarah@example.com"
      }
    ]
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
    description: "Association dynamique avec un équilibre parfait entre théorie et pratique.",
    etudiants: [
      {
        nom: "Chloé",
        age: 20,
        domaine: "Psychologie Cognitive",
        bio: "Chloé se passionne pour l'étude des comportements humains et l'impact des environnements sociaux.",
        email: "chloe@example.com"
      },
      {
        nom: "Yanis",
        age: 22,
        domaine: "Psychologie Sociale",
        bio: "Yanis aime analyser les interactions humaines et s’investit dans des projets de recherche innovants.",
        email: "yanis@example.com"
      }
    ]
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
    etudiants: [
      {
        nom: "Marc",
        age: 21,
        domaine: "Commerce",
        bio: "Marc est motivé par les défis internationaux et excelle dans les négociations multiculturelles.",
        email: "marc@example.com"
      },
      {
        nom: "Léa",
        age: 20,
        domaine: "Marketing International",
        bio: "Léa combine sens aigu du commerce et créativité, se spécialisant dans les stratégies globales.",
        email: "lea@example.com"
      },
      {
        nom: "Théo",
        age: 22,
        domaine: "Gestion Export",
        bio: "Théo aime optimiser les flux commerciaux et s’engage dans des projets de développement à l'international.",
        email: "theo@example.com"
      }
    ]
  }
  // Vous pouvez ajouter autant de formations que nécessaire...
];

const container = document.getElementById("cardsContainer");
const searchInput = document.getElementById("searchInput");

/* Créer la carte d'une formation avec bouton de contact */
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

/* Afficher toutes les cartes */
function renderCards() {
  container.innerHTML = "";
  formations.forEach(createCard);
}

/* Recherche instantanée dans le catalogue */
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  container.innerHTML = "";
  formations.filter(f => f.nom.toLowerCase().includes(query))
            .forEach(createCard);
});

/* ===================================================
   Gestion de la modale "Contacter un étudiant"
   (Affichage détaillé de plusieurs infos)
=================================================== */
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalBody = document.getElementById("modalBody");

// Ouvre la modale et affiche les infos détaillées de chaque étudiant
function openModal(etudiants) {
  let html = "";
  etudiants.forEach(etud => {
    html += `
      <div class="student-info">
        <h4>${etud.nom} (${etud.age} ans)</h4>
        <p><strong>Domaine :</strong> ${etud.domaine}</p>
        <p>${etud.bio}</p>
        <p><strong>Email :</strong> <a href="mailto:${etud.email}">${etud.email}</a></p>
      </div>
    `;
  });
  modalBody.innerHTML = html;
  modal.classList.remove("hidden");
}

// Ferme la modale
function closeModal() {
  modal.classList.add("hidden");
}

modalClose.addEventListener("click", closeModal);
window.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

// Délégation d'événement pour les boutons "Contacter un étudiant"
document.addEventListener("click", e => {
  if (e.target && e.target.classList.contains("contact-btn")) {
    const etudiants = JSON.parse(e.target.getAttribute("data-students"));
    openModal(etudiants);
  }
});

/* ===================================================
   Gestion du formulaire de contact (affichage confirmation)
=================================================== */
const contactForm = document.getElementById("contactForm");
const contactConfirmation = document.getElementById("contactConfirmation");

contactForm.addEventListener("submit", e => {
  e.preventDefault();
  // Simuler l'envoi du formulaire (vous pouvez intégrer ici une requête AJAX)
  setTimeout(() => {
    contactForm.reset();
    contactConfirmation.classList.remove("hidden");
    setTimeout(() => {
      contactConfirmation.classList.add("hidden");
    }, 3000);
  }, 800);
});

/* ===================================================
   Initialisation
=================================================== */
document.addEventListener("DOMContentLoaded", () => {
  switchPage("home");
  if (document.getElementById("formations").classList.contains("active-section")) {
    renderCards();
  }
});

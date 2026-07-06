/*
  Site Ennéagramme - Page "Nos formations"
  ------------------------------------------------------------
  - Charge data/formations.json (secours local ci-dessous si fetch bloqué).
  - Affiche une grille d'encadrés (un par formation) + un encadré "Organiser une
    formation chez vous".
  - Deux modales : inscription à une formation, demande d'organisation.
  - Les demandes sont stockées dans localStorage. Pour les envoyer vers un service
    externe (backend, Google Sheets, email...), compléter saveRegistration() et
    saveOrganizationRequest() en bas de fichier.
*/

const DEFAULT_FORMATIONS = [
  {
    id: "formation-1",
    title: "Découvrir les 9 ennéatypes",
    place: "Paris",
    description: "Une première journée d'initiation pour comprendre la carte de l'Ennéagramme et commencer à identifier son propre fonctionnement.",
    date: "15 juin 2026",
    time: "09h30 - 17h30"
  }
];

const I18N = {
  fr: {
    site: { title: "Ennéagramme", subtitle: "Le chemin vers l'éveil" },
    footer: { text: "Ennéagramme - Le chemin vers l'éveil" },
    page: {
      back: "Revenir à la page d'accueil",
      eyebrow: "Prochaines sessions",
      title: "Nos formations",
      intro: "Choisissez la formation qui vous appelle et inscrivez-vous en quelques instants. Vous pouvez aussi demander l'organisation d'une formation près de chez vous."
    },
    card: { place: "Lieu", date: "Date", time: "Horaire", register: "S'inscrire" },
    organizeCard: {
      eyebrow: "Sur mesure",
      title: "Organiser une formation chez vous",
      desc: "Vous souhaitez une formation dans votre ville, votre entreprise ou votre association ? Faites-nous part de votre projet.",
      button: "Demander l'organisation d'une formation"
    },
    modal: { cancel: "Annuler" },
    registration: {
      eyebrow: "Inscription",
      title: "Demande d'inscription",
      firstName: "Prénom",
      lastName: "Nom",
      phone: "Téléphone",
      email: "Email",
      message: "Message (facultatif)",
      submit: "Valider mon inscription",
      success: "Merci, votre demande d'inscription a bien été enregistrée. Nous vous recontacterons prochainement."
    },
    organize: {
      eyebrow: "Sur mesure",
      title: "Organiser une formation chez vous",
      intro: "Association, entreprise, groupe ou collectivité : nous construisons une formation adaptée à votre contexte, dans le lieu de votre choix. Décrivez votre projet, nous vous recontactons.",
      contact: "Nom du contact",
      structure: "Structure / organisation",
      email: "Email",
      phone: "Téléphone",
      city: "Ville / lieu souhaité",
      participants: "Nombre de participants estimé",
      dates: "Dates ou période envisagée",
      message: "Votre projet",
      submit: "Envoyer ma demande",
      success: "Merci, votre demande a bien été transmise. Nous reviendrons vers vous pour construire cette formation ensemble."
    }
  },
  es: {
    site: { title: "Eneagrama", subtitle: "El camino hacia el despertar" },
    footer: { text: "Eneagrama - El camino hacia el despertar" },
    page: {
      back: "Volver a la página de inicio",
      eyebrow: "Próximas sesiones",
      title: "Nuestras formaciones",
      intro: "Elija la formación que le inspire e inscríbase en unos instantes. También puede solicitar la organización de una formación cerca de usted."
    },
    card: { place: "Lugar", date: "Fecha", time: "Horario", register: "Inscribirse" },
    organizeCard: {
      eyebrow: "A medida",
      title: "Organizar una formación en su lugar",
      desc: "¿Desea una formación en su ciudad, empresa o asociación? Cuéntenos su proyecto.",
      button: "Solicitar la organización de una formación"
    },
    modal: { cancel: "Cancelar" },
    registration: {
      eyebrow: "Inscripción",
      title: "Solicitud de inscripción",
      firstName: "Nombre",
      lastName: "Apellido",
      phone: "Teléfono",
      email: "Email",
      message: "Mensaje (opcional)",
      submit: "Validar mi inscripción",
      success: "Gracias, su solicitud de inscripción ha sido registrada. Nos pondremos en contacto próximamente."
    },
    organize: {
      eyebrow: "A medida",
      title: "Organizar una formación en su lugar",
      intro: "Asociación, empresa, grupo o entidad: construimos una formación adaptada a su contexto, en el lugar que elija. Describa su proyecto y le contactamos.",
      contact: "Nombre del contacto",
      structure: "Estructura / organización",
      email: "Email",
      phone: "Teléfono",
      city: "Ciudad / lugar deseado",
      participants: "Número estimado de participantes",
      dates: "Fechas o período previsto",
      message: "Su proyecto",
      submit: "Enviar mi solicitud",
      success: "Gracias, su solicitud ha sido enviada. Nos pondremos en contacto para construir juntos esta formación."
    }
  },
  en: {
    site: { title: "Enneagram", subtitle: "The path toward awakening" },
    footer: { text: "Enneagram - The path toward awakening" },
    page: {
      back: "Back to the home page",
      eyebrow: "Upcoming sessions",
      title: "Our trainings",
      intro: "Choose the training that calls to you and register in a few moments. You can also request a training organized near you."
    },
    card: { place: "Place", date: "Date", time: "Time", register: "Register" },
    organizeCard: {
      eyebrow: "Tailor-made",
      title: "Organize a training at your place",
      desc: "Would you like a training in your city, company or association? Tell us about your project.",
      button: "Request a custom training"
    },
    modal: { cancel: "Cancel" },
    registration: {
      eyebrow: "Registration",
      title: "Registration request",
      firstName: "First name",
      lastName: "Last name",
      phone: "Phone",
      email: "Email",
      message: "Message (optional)",
      submit: "Confirm my registration",
      success: "Thank you, your registration request has been saved. We will contact you soon."
    },
    organize: {
      eyebrow: "Tailor-made",
      title: "Organize a training at your place",
      intro: "Association, company, group or organization: we build a training tailored to your context, in the place of your choice. Describe your project and we will get back to you.",
      contact: "Contact name",
      structure: "Structure / organization",
      email: "Email",
      phone: "Phone",
      city: "City / desired location",
      participants: "Estimated number of participants",
      dates: "Envisaged dates or period",
      message: "Your project",
      submit: "Send my request",
      success: "Thank you, your request has been sent. We will get back to you to build this training together."
    }
  }
};

const state = {
  lang: "fr",
  formations: [],
  selectedFormation: null
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  state.formations = await loadJson("data/formations.json", DEFAULT_FORMATIONS);
  bindLanguageSwitcher();
  bindDialogs();
  render();
}

async function loadJson(url, fallback) {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Impossible de charger ${url}`);
    return await response.json();
  } catch (error) {
    return JSON.parse(JSON.stringify(fallback));
  }
}

function t(path) {
  return getByPath(I18N[state.lang], path) ?? getByPath(I18N.fr, path) ?? "";
}

function getByPath(source, path) {
  return path.split(".").reduce((value, key) => (value == null ? undefined : value[key]), source);
}

function render() {
  applyTranslations();
  renderCards();
}

function applyTranslations() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = t(element.dataset.i18n);
    if (typeof value === "string" && value) element.textContent = value;
  });
  document.querySelectorAll(".language-switcher button").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === state.lang);
  });
}

function bindLanguageSwitcher() {
  document.querySelectorAll(".language-switcher button").forEach((button) => {
    button.addEventListener("click", () => {
      state.lang = button.dataset.lang;
      render();
    });
  });
}

function renderCards() {
  const grid = document.getElementById("formations-grid");
  const cards = state.formations
    .map(
      (formation) => `
      <article class="formation-card">
        <div class="formation-card-body">
          <span class="formation-place">${escapeHtml(formation.place)}</span>
          <h2 class="formation-title">${escapeHtml(formation.title)}</h2>
          <p class="formation-desc">${escapeHtml(formation.description)}</p>
          <dl class="formation-meta">
            <div>
              <dt>${escapeHtml(t("card.date"))}</dt>
              <dd>${escapeHtml(formation.date)}</dd>
            </div>
            <div>
              <dt>${escapeHtml(t("card.time"))}</dt>
              <dd>${escapeHtml(formation.time)}</dd>
            </div>
          </dl>
        </div>
        <button type="button" class="primary-button formation-register" data-register="${escapeHtml(formation.id)}">
          ${escapeHtml(t("card.register"))}
        </button>
      </article>`
    )
    .join("");

  const organizeCard = `
    <article class="formation-card organize-card">
      <div class="formation-card-body">
        <span class="formation-place">${escapeHtml(t("organizeCard.eyebrow"))}</span>
        <h2 class="formation-title">${escapeHtml(t("organizeCard.title"))}</h2>
        <p class="formation-desc">${escapeHtml(t("organizeCard.desc"))}</p>
      </div>
      <button type="button" class="primary-button formation-register" id="open-organize">
        ${escapeHtml(t("organizeCard.button"))}
      </button>
    </article>`;

  grid.innerHTML = cards + organizeCard;

  grid.querySelectorAll("[data-register]").forEach((button) => {
    button.addEventListener("click", () => openRegistration(button.dataset.register));
  });
  document.getElementById("open-organize").addEventListener("click", openOrganize);
}

function openRegistration(formationId) {
  state.selectedFormation = state.formations.find((formation) => formation.id === formationId);
  if (!state.selectedFormation) return;

  const summary = document.getElementById("selected-formation");
  const fields = [
    { label: t("card.date"), value: state.selectedFormation.date },
    { label: t("card.time"), value: state.selectedFormation.time },
    { label: t("card.place"), value: state.selectedFormation.place }
  ];
  summary.innerHTML =
    `<div class="summary-topic"><strong>${escapeHtml(state.selectedFormation.title)}</strong></div>` +
    fields
      .map((field) => `<div><strong>${escapeHtml(field.label)}</strong>${escapeHtml(field.value)}</div>`)
      .join("");

  const form = document.getElementById("registration-form");
  form.reset();
  document.getElementById("registration-message").textContent = "";
  openDialog("inscription-dialog");
}

function openOrganize() {
  const form = document.getElementById("organize-form");
  form.reset();
  document.getElementById("organize-message").textContent = "";
  openDialog("organize-dialog");
}

function bindDialogs() {
  document.querySelectorAll("dialog.modal").forEach((dialog) => {
    dialog.querySelectorAll("[data-close]").forEach((button) => {
      button.addEventListener("click", () => dialog.close());
    });
    // Fermer en cliquant sur le fond (backdrop)
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  document.getElementById("registration-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    saveRegistration({
      ...data,
      formation: state.selectedFormation,
      createdAt: new Date().toISOString()
    });
    document.getElementById("registration-message").textContent = t("registration.success");
    event.currentTarget.reset();
  });

  document.getElementById("organize-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    saveOrganizationRequest({ ...data, createdAt: new Date().toISOString() });
    document.getElementById("organize-message").textContent = t("organize.success");
    event.currentTarget.reset();
  });
}

function openDialog(id) {
  const dialog = document.getElementById(id);
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function saveRegistration(registration) {
  pushToStorage("enneagramme-inscriptions", registration);
  // Connexion future possible : envoyer registration vers un backend ou Google Sheets ici.
}

function saveOrganizationRequest(request) {
  pushToStorage("enneagramme-demandes-organisation", request);
  // Connexion future possible : envoyer request vers un backend ou une boîte email ici.
}

function pushToStorage(key, entry) {
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  list.push(entry);
  localStorage.setItem(key, JSON.stringify(list));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

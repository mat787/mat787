/**
 * TREŚĆ PORTFOLIO
 * Najważniejsze dane i projekty są zebrane tutaj, aby można je było łatwo edytować.
 */
const content = {
  name: "Matylda Drapich",
  initials: "MD",
  availability: "Otwarta na staż i junior role · Data / ML",
  intro:
    "Jestem Matylda — łączę analizę danych, uczenie maszynowe i ciekawość, żeby z chaosu wyciągać sensowne odpowiedzi.",
  about:
    "Studiuję informatykę stosowaną na Politechnice Warszawskiej i pracuję jako Junior Data Analyst w REDS S.A. Najbardziej kręcą mnie projekty, w których dane trzeba najpierw oswoić, a potem zamienić w decyzje.",
  email: "matyldadrapich@gmail.com",
  skills: ["Python", "SQL", "R", "Pandas", "Scikit-learn", "PostgreSQL", "Streamlit", "Docker", "QGIS"],
  socials: [
    { label: "GitHub", url: "https://github.com/mat787" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/matylda-drapich" },
  ],
  projects: [
    {
      title: "JobRadar",
      type: "RAG · FastAPI · PostgreSQL · pgvector",
      year: "2026",
      url: "https://github.com/mat787/JobRadar",
      glyph: "JR",
      color: "#ff7448",
      shape: "#e9ff54",
      description:
        "Platforma dopasowująca oferty pracy do CV. Scraper, deduplikacja, embeddingi w pgvector i lokalny LLM bez kosztów API.",
    },
    {
      title: "HealthAnalyzer",
      type: "ETL · Streamlit · Isolation Forest",
      year: "2026",
      url: "https://github.com/mat787/HealthAnalyzer",
      glyph: "HA",
      color: "#7788ff",
      shape: "#ff5cbe",
      images: [
        {
          src: "./projects/health-analyzer.png",
          alt: "Dashboard HealthAnalyzer z podsumowaniem danych zdrowotnych",
        },
        {
          src: "./projects/health-analyzer-anomalies.png",
          alt: "Widok wykrywania anomalii w danych Apple Health",
        },
        {
          src: "./projects/health-analyzer-detail.png",
          alt: "Szczegółowa wizualizacja pomiarów zdrowotnych",
        },
      ],
      description:
        "Pipeline ETL dla ponad 700 MB danych Apple Health, baza SQLite i wykrywanie nietypowych wzorców fizjologicznych.",
    },
    {
      title: "Klasyfikacja nowotworów",
      type: "EDA · Scikit-learn · diagnostyka",
      year: "2026",
      url: "https://github.com/mat787/breast-cancer-classification",
      glyph: "ML",
      color: "#e9ff54",
      shape: "#7788ff",
      images: [
        {
          src: "./projects/breast-cancer-analysis.png",
          alt: "Wykres analizy cech w projekcie klasyfikacji nowotworów",
        },
        {
          src: "./projects/breast-cancer-model.png",
          alt: "Macierz pomyłek modelu klasyfikacji",
        },
      ],
      description:
        "Porównanie modeli predykcyjnych z naciskiem na czułość i ograniczenie ryzyka fałszywie ujemnych diagnoz.",
    },
  ],
};

const setText = (key, value) => {
  document.querySelectorAll(`[data-content="${key}"]`).forEach((element) => {
    element.textContent = value;
  });
};

Object.entries({
  name: content.name,
  initials: content.initials,
  availability: content.availability,
  intro: content.intro,
  about: content.about,
  email: content.email,
}).forEach(([key, value]) => setText(key, value));

document.title = `${content.name} — Data & ML`;
document.querySelector('[data-content="email-link"]').href = `mailto:${content.email}`;
document.querySelector("[data-year]").textContent = new Date().getFullYear();

const projects = document.querySelector("[data-projects]");
projects.innerHTML = content.projects
  .map(
    (project, index) => `
      <a
        class="project-card interactive"
        href="${project.url}"
        style="--card-color: ${project.color}; --shape-color: ${project.shape}"
        target="_blank"
        rel="noreferrer"
        aria-label="Zobacz projekt ${project.title} na GitHubie"
      >
        <div class="project-card__visual ${project.images ? "project-card__visual--image" : ""}">
          <span class="project-number">0${index + 1} / ${project.year}</span>
          ${
            project.images
              ? `<span class="project-gallery project-gallery--${project.images.length}">
                  ${project.images
                    .map(
                      ({ src, alt }) =>
                        `<img src="${src}" alt="${alt}" loading="lazy" />`,
                    )
                    .join("")}
                </span>`
              : `<span class="project-glyph" aria-hidden="true">${project.glyph}</span>`
          }
        </div>
        <div class="project-card__meta">
          <div>
            <h3>${project.title}</h3>
            <p>${project.type}</p>
            <p class="project-description">${project.description}</p>
          </div>
          <span class="project-arrow" aria-hidden="true">↗</span>
        </div>
      </a>
    `,
  )
  .join("");

document.querySelector("[data-skills]").innerHTML = content.skills
  .map((skill) => `<li>${skill}</li>`)
  .join("");

document.querySelector("[data-socials]").innerHTML = content.socials
  .map(
    ({ label, url }) =>
      `<a class="interactive" href="${url}" target="_blank" rel="noreferrer">${label}</a>`,
  )
  .join("");

// Custom crosshair cursor — deliberately disabled for touch and reduced-motion users.
const cursor = document.querySelector(".cursor");
const finePointer = window.matchMedia("(pointer: fine)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (finePointer.matches && !reducedMotion.matches) {
  window.addEventListener(
    "pointermove",
    ({ clientX, clientY }) => {
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
    },
    { passive: true },
  );

  document.addEventListener("pointerdown", () => cursor.classList.add("is-pressed"));
  document.addEventListener("pointerup", () => cursor.classList.remove("is-pressed"));

  document.querySelectorAll("a, button").forEach((target) => {
    target.addEventListener("pointerenter", () => cursor.classList.add("is-active"));
    target.addEventListener("pointerleave", () => cursor.classList.remove("is-active"));
  });
}

// Subtle synthesized UI audio: no asset downloads and no audio before user consent.
const soundToggle = document.querySelector(".sound-toggle");
const soundLabel = document.querySelector(".sound-label");
const toast = document.querySelector(".toast");
let audioContext;
let soundEnabled = false;
let toastTimer;

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
};

const prepareAudio = async () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return false;

  audioContext ??= new AudioContext();
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
  return audioContext.state === "running";
};

const playTone = (kind = "click") => {
  if (!soundEnabled || !audioContext || audioContext.state !== "running") return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  const isTarget = kind === "target";

  oscillator.type = isTarget ? "sine" : "triangle";
  oscillator.frequency.setValueAtTime(isTarget ? 540 : 220, now);
  oscillator.frequency.exponentialRampToValueAtTime(isTarget ? 680 : 150, now + 0.045);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(isTarget ? 0.018 : 0.028, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + (isTarget ? 0.055 : 0.075));

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.08);
};

soundToggle.addEventListener("click", async () => {
  if (!soundEnabled) {
    const ready = await prepareAudio();
    if (!ready) {
      showToast("Ta przeglądarka nie obsługuje dźwięku");
      return;
    }
  }

  soundEnabled = !soundEnabled;
  soundToggle.setAttribute("aria-pressed", String(soundEnabled));
  soundLabel.textContent = soundEnabled ? "Dźwięk wł." : "Dźwięk wył.";
  showToast(soundEnabled ? "Subtelne dźwięki: włączone" : "Dźwięki: wyciszone");
  playTone("target");
});

document.addEventListener("click", ({ target }) => {
  if (target.closest("a, button") && !target.closest(".sound-toggle")) {
    playTone("click");
  }
});

document.querySelectorAll("a, button").forEach((target) => {
  target.addEventListener("pointerenter", () => playTone("target"));
});

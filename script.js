// =======================
// script.js
// =======================

document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTI TOP BAR
  const topLeft = document.querySelector(".top-left");
  const topRight = document.querySelector(".top-right");
  const workHeader = document.querySelector(".work-header");
  const curriculumOverlay = document.getElementById("curriculum");
  const fotoOverlay = document.getElementById("foto");

  // =======================
  // FUNZIONE AGGIORNA TOP-BAR
  // =======================
  function aggiornaTesto() {
    if (curriculumOverlay.classList.contains("active") || fotoOverlay.classList.contains("active")) return;

    const rect = workHeader.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.05;

    if (rect.top <= triggerPoint) {
      topLeft.textContent = "Portfolio Digitale / Work";
    } else {
      topLeft.textContent = "Portfolio Digitale / Intro";
    }
    topRight.textContent = "2025";
    topRight.onclick = null;
  }
// =======================
// OVERLAY CURRICULUM
// =======================
function apriCurriculum(e) {
  e.preventDefault();
  curriculumOverlay.classList.add("active");
  sideIndex.style.display = "none";

  topLeft.textContent = "Portfolio Digitale / Curriculum";
  topRight.textContent = "Return";

  history.pushState({ overlay: "curriculum" }, ""); // 👈 stato cronologia

  topRight.onclick = () => {
    chiudiOverlay(curriculumOverlay);
  };
}

// =======================
// OVERLAY FOTOGRAFIA
// =======================
function apriFoto(e) {
  e.preventDefault();
  fotoOverlay.classList.add("active");
  document.body.classList.add("photo-open");
  sideIndex.style.display = "none";

  topLeft.textContent = "Portfolio Digitale / Photography";
  topRight.textContent = "Return";

  history.pushState({ overlay: "foto" }, ""); // 👈 stato cronologia

  topRight.onclick = () => {
    chiudiOverlay(fotoOverlay);
  };
}

// =======================
// CHIUSURA OVERLAY
// =======================
function chiudiOverlay(overlay) {
  if (!overlay.classList.contains("active")) return;

  overlay.classList.add("closing");

  overlay.addEventListener("transitionend", function handler() {
    overlay.classList.remove("active", "closing");
    overlay.removeEventListener("transitionend", handler);
    document.body.classList.remove("photo-open");
  });
}


// =======================
// MENU LATERALE FOTO: scroll interno
// =======================
document.querySelectorAll('.photo-side-menu a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      const offset = 80; // altezza top-bar
      const top = target.offsetTop - offset;
      document.querySelector('#foto').scrollTo({
        top,
        behavior: 'smooth'
      });
    }
  });
});




// =======================
// BACK/FORWARD BROWSER
// =======================
window.addEventListener("popstate", (e) => {
  const state = e.state;

  if (!state || !state.overlay) {
    // Nessun overlay → chiudi tutto
    curriculumOverlay.classList.remove("active");
    fotoOverlay.classList.remove("active");
    document.body.classList.remove("photo-open");
    sideIndex.style.display = "";
    aggiornaTesto();
  } else if (state.overlay === "curriculum") {
    curriculumOverlay.classList.add("active");
    sideIndex.style.display = "none";
  } else if (state.overlay === "foto") {
    fotoOverlay.classList.add("active");
    document.body.classList.add("photo-open");
    sideIndex.style.display = "none";
  }
});




// =======================
// LISTENER MENU
// =======================

const sideIndex = document.querySelector(".side-index");

// apri overlay curriculum
function apriCurriculum(e) {
  e.preventDefault();
  curriculumOverlay.classList.add("active");
  sideIndex.style.display = "none"; // 👈 nascondi menu

  topLeft.textContent = "Portfolio Digitale / Curriculum";
  topRight.textContent = "Return";

  topRight.onclick = () => {
    curriculumOverlay.classList.remove("active");
    sideIndex.style.display = ""; // 👈 ri-mostralo
    aggiornaTesto();
  };
}

// apri overlay fotografia
function apriFoto(e) {
  e.preventDefault();
  fotoOverlay.classList.add("active");
  sideIndex.style.display = "none"; // 👈 nascondi menu

  topLeft.textContent = "Portfolio Digitale / Photography";
  topRight.textContent = "Return";

  topRight.onclick = () => {
    fotoOverlay.classList.remove("active");
    sideIndex.style.display = ""; // 👈 ri-mostralo
    aggiornaTesto();
  };
}

// listener menu curriculum
document.querySelectorAll('[data-overlay="curriculum"]').forEach(link => {
  link.addEventListener("click", apriCurriculum);
});

// listener menu fotografia
document.querySelectorAll('[data-overlay="foto"]').forEach(link => {
  link.addEventListener("click", apriFoto);
});


// ===== CONTACT: scroll al footer =====
const contactTarget = document.getElementById('contact');

document.querySelectorAll('a[href="#contact"], [data-anchor="contact"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // chiudi overlay eventualmente aperti
    if (typeof curriculumOverlay !== 'undefined') curriculumOverlay.classList.remove('active');
    if (typeof fotoOverlay !== 'undefined') fotoOverlay.classList.remove('active');

    // ri-mostra il side-index se era nascosto
    const sideIndexEl = document.querySelector('.side-index');
    if (sideIndexEl) sideIndexEl.style.display = '';

    // ripristina la top-bar dinamica
    if (typeof aggiornaTesto === 'function') aggiornaTesto();

    // scrolla al footer (fallback se manca l'ID)
    if (contactTarget) {
      contactTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  });
});



  // =======================
  // SCROLL DINAMICO TOP-BAR
  // =======================
  window.addEventListener("scroll", aggiornaTesto);
  aggiornaTesto();

  // =======================
  // RETURN UP (su "2025")
  // =======================
  const workSection = document.getElementById("work");
  window.addEventListener("scroll", () => {
    const workTop = workSection.getBoundingClientRect().top;
    if (workTop <= 0 && !curriculumOverlay.classList.contains("active") && !fotoOverlay.classList.contains("active")) {
      topRight.textContent = "Return Up";
    }
  });
  topRight.addEventListener("click", () => {
    if (topRight.textContent === "Return Up") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // =======================
  // CURSORE PERSONALIZZATO
  // =======================
  const cursor = document.querySelector(".cursor");
  let moved = false;

  document.addEventListener("mousemove", e => {
    if (!moved) {
      cursor.style.opacity = 1;
      moved = true;
    }
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";

    const interactive = ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"];
    const el = document.elementFromPoint(e.clientX, e.clientY);

    if (el && interactive.includes(el.tagName)) {
      cursor.classList.add("pulse");
    } else {
      cursor.classList.remove("pulse");
    }
  });

  // =======================
  // GESTIONE PROGETTI WORK
  // =======================
  document.querySelectorAll(".work-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const container = link.parentElement.nextElementSibling;

      if (container.classList.contains("open")) {
        container.style.height = 0;
        container.classList.remove("open");
      } else {
        const detail = container.querySelector(".work-detail");
        container.style.height = detail.scrollHeight + "px";
        container.classList.add("open");

        const workItem = link.closest(".work-item");
        const offset = workItem.getBoundingClientRect().top + window.scrollY - 190;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    });
  });

  // Chiudi progetto cliccando su "Close Project"
  document.addEventListener("click", e => {
    if (e.target.classList.contains("close-btn")) {
      const container = e.target.closest(".work-detail-container");
      const workItem = container.previousElementSibling;

      container.style.height = 0;
      container.classList.remove("open");

      const offset = workItem.getBoundingClientRect().top + window.scrollY - 190;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  });

  // =======================
  // VIMEO LAZY LOAD & AUTOPLAY
  // =======================
  const vimeoIframes = document.querySelectorAll("iframe.lazy-vimeo");
  const players = [];
  vimeoIframes.forEach(iframe => {
    const player = new Vimeo.Player(iframe);
    players.push({ iframe, player });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const playerObj = players.find(p => p.iframe === entry.target);
      if (!playerObj) return;

      if (entry.isIntersecting) {
        playerObj.player.play().catch(() => {});
      } else {
        playerObj.player.pause().catch(() => {});
      }
    });
  }, { threshold: 0.5 });

  vimeoIframes.forEach(iframe => observer.observe(iframe));

  // =======================
  // RESET SCROLL SU OVERLAY FOTO
  // =======================
  const fotoObserver = new MutationObserver(() => {
    if (fotoOverlay.classList.contains("active")) {
      fotoOverlay.scrollTop = 0;
      
    }
  });
  fotoObserver.observe(fotoOverlay, { attributes: true, attributeFilter: ["class"] });
});


// =======================
// GESTURE SWIPE PER CHIUDERE OVERLAY
// =======================

function abilitaSwipeChiudi(overlay) {
  let startX = 0, startY = 0;

  overlay.addEventListener("touchstart", e => {
    const touch = e.changedTouches[0];
    startX = touch.screenX;
    startY = touch.screenY;
  });

  overlay.addEventListener("touchend", e => {
    const touch = e.changedTouches[0];
    const diffX = touch.screenX - startX;
    const diffY = touch.screenY - startY;

    // Swipe orizzontale → verso destra
    if (Math.abs(diffX) > 80 && Math.abs(diffY) < 50 && diffX > 0) {
      overlay.classList.remove("active");
      document.body.classList.remove("photo-open"); // reset tema nero se fotografia
    }

    // Swipe verticale → verso il basso
    if (Math.abs(diffY) > 80 && diffY > 0 && Math.abs(diffX) < 50) {
      overlay.classList.remove("active");
      document.body.classList.remove("photo-open");
    }
  });
}

// Applichiamo la gesture sia a curriculum che fotografia
document.addEventListener("DOMContentLoaded", () => {
  const curriculum = document.getElementById("curriculum");
  const foto = document.getElementById("foto");

  if (curriculum) abilitaSwipeChiudi(curriculum);
  if (foto) abilitaSwipeChiudi(foto);
});





// THUMNAILS
// THUMBNAILS effetto scia solo su logo
document.addEventListener("DOMContentLoaded", () => {
  const thumbs = document.querySelectorAll(".asid-thumbs img");
  const logo = document.querySelector(".logo-asid");
  const thumbsContainer = document.querySelector(".asid-thumbs");
  let index = 0;
  let active = false;

  // attiva la scia quando entri sul logo
  logo.addEventListener("mouseenter", () => {
    active = true;
    thumbsContainer.style.zIndex = "1000"; // sotto al menu
  });

  // disattiva quando esci
  logo.addEventListener("mouseleave", () => {
    active = false;
  });

  // muovi solo se attivo
  document.addEventListener("mousemove", (e) => {
    if (!active) return;

    const x = e.clientX;
    const y = e.clientY;

    const img = thumbs[index];
    img.style.left = x + "px";
    img.style.top = y + "px";

    img.style.opacity = 1;
    img.style.transform = "translate(-50%, -50%) scale(1)";

    setTimeout(() => {
      img.style.opacity = 0;
      img.style.transform = "translate(-50%, -50%) scale(0.7)";
    }, 80);

    index = (index + 1) % thumbs.length;
  });
});
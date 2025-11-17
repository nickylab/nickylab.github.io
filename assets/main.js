(function () {
  const SECTIONS = ["research", "toolbox", "visualizations"];
  const elems = Object.fromEntries(SECTIONS.map(id => [id, document.getElementById(id)]));
  const heroCta = document.getElementById("hero-cta");
  const ctaBtns = heroCta ? Array.from(heroCta.querySelectorAll('a[data-target]')) : [];

  function showOnly(target) {
    const t = (target || "").toLowerCase();

    SECTIONS.forEach(id => {
      const el = elems[id];
      if (!el) return;
      if (t === "all" || t === "" || t === null) el.hidden = false;
      else el.hidden = (id !== t);
    });

    if (t && t !== "all" && elems[t]) {
      elems[t].scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    updateHeroActive(t || "all");
  }

  function updateHeroActive(target) {
    ctaBtns.forEach(btn => {
      const isActive = btn.dataset.target === target || (target === "all" && btn.dataset.target === "all");
      btn.classList.toggle("primary", isActive);
      btn.classList.toggle("secondary", !isActive);
      btn.setAttribute("aria-current", isActive ? "page" : "false");
    });
  }

  let initial = (location.hash || "").replace("#", "").toLowerCase();
  if (!SECTIONS.includes(initial)) initial = "all";
  showOnly(initial);

  window.addEventListener("hashchange", () => {
    let h = (location.hash || "").replace("#", "").toLowerCase();
    if (!SECTIONS.includes(h)) h = "all";
    showOnly(h);
  });

  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();
})();
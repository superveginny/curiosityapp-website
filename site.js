(() => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".site-menu");
  const backdrop = document.querySelector(".menu-backdrop");
  if (!toggle || !menu || !backdrop) return;

  const openMenu = () => {
    menu.hidden = false;
    backdrop.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
    requestAnimationFrame(() => {
      menu.classList.add("is-open");
      backdrop.classList.add("is-open");
    });
  };

  const closeMenu = () => {
    menu.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    window.setTimeout(() => {
      if (toggle.getAttribute("aria-expanded") === "false") {
        menu.hidden = true;
        backdrop.hidden = true;
      }
    }, 220);
  };

  toggle.addEventListener("click", () => {
    if (toggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.querySelectorAll("[data-menu-close]").forEach((control) => {
    control.addEventListener("click", closeMenu);
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      toggle.focus();
    }
  });
})();

(() => {
  const toc = document.querySelector(".toc");
  const layout = document.querySelector(".layout");
  const header = document.querySelector(".site-header");
  if (!toc || !layout || !header) return;

  const desktopQuery = window.matchMedia("(min-width: 641px)");
  let ticking = false;

  const resetToc = () => {
    toc.classList.remove("is-fixed");
    toc.style.removeProperty("--toc-fixed-left");
    toc.style.removeProperty("--toc-fixed-width");
  };

  const updateTocPosition = () => {
    ticking = false;

    if (!desktopQuery.matches) {
      resetToc();
      return;
    }

    const headerHeight = Math.ceil(header.getBoundingClientRect().height);
    const fixedGap = 24;
    const startY = layout.offsetTop - headerHeight - fixedGap;
    const layoutRect = layout.getBoundingClientRect();
    const shouldFix = window.scrollY >= startY;

    if (shouldFix) {
      toc.style.setProperty("--toc-fixed-left", `${Math.round(layoutRect.left)}px`);
      toc.style.setProperty("--toc-fixed-width", "260px");
      toc.classList.add("is-fixed");
    } else {
      resetToc();
    }
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateTocPosition);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("orientationchange", requestUpdate);
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", requestUpdate);
  } else {
    desktopQuery.addListener(requestUpdate);
  }
  window.addEventListener("load", requestUpdate);
  requestUpdate();
})();

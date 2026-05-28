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

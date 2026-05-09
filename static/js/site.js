(function () {
    const storageKey = "theme";
    const themes = ["system", "light", "dark"];

    const root = document.documentElement;
    const menu = document.querySelector("[data-theme-menu]");
    const button = document.querySelector("[data-theme-menu-button]");
    const list = document.querySelector("[data-theme-menu-list]");
    const options = document.querySelectorAll("[data-theme-option]");

    function getStoredTheme() {
        const value = localStorage.getItem(storageKey);
        return themes.includes(value) ? value : "system";
    }

    function applyTheme(theme) {
        if (theme === "system") {
            root.removeAttribute("data-theme");
        } else {
            root.setAttribute("data-theme", theme);
        }

        if (button) {
            button.dataset.theme = theme;
            button.title = `Theme: ${theme}`;
            button.setAttribute("aria-label", `Current theme: ${theme}. Choose color theme.`);
        }

        options.forEach((option) => {
            const selected = option.dataset.themeOption === theme;
            option.setAttribute("aria-checked", selected ? "true" : "false");
        });
    }

    function openMenu() {
        list.hidden = false;
        button.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
        list.hidden = true;
        button.setAttribute("aria-expanded", "false");
    }

    let currentTheme = getStoredTheme();
    applyTheme(currentTheme);

    if (!menu || !button || !list) return;

    button.addEventListener("click", () => {
        if (list.hidden) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    options.forEach((option) => {
        option.addEventListener("click", () => {
            const theme = option.dataset.themeOption;
            if (!themes.includes(theme)) return;

            currentTheme = theme;
            localStorage.setItem(storageKey, theme);
            applyTheme(theme);
            closeMenu();
        });
    });

    document.addEventListener("click", (event) => {
        if (!menu.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            button.focus();
        }
    });
})();

(function () {
    const storageKey = "theme";
    const themes = ["system", "light", "dark"];

    const root = document.documentElement;
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

        options.forEach((option) => {
            const selected = option.dataset.themeOption === theme;
            option.setAttribute("aria-checked", selected ? "true" : "false");
        });
    }

    applyTheme(getStoredTheme());

    options.forEach((option) => {
        option.addEventListener("click", () => {
            const theme = option.dataset.themeOption;
            if (!themes.includes(theme)) return;
            localStorage.setItem(storageKey, theme);
            applyTheme(theme);
        });
    });
})();

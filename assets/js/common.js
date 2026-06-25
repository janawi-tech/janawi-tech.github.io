document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // 1. Theme Toggle Management
    // -------------------------------------------------------------
    const themeToggle = document.getElementById("theme-toggle");
    const darkModeStyle = document.getElementById("dark-mode-style");

    // Default theme is dark
    let currentTheme = localStorage.getItem("theme");
    if (!currentTheme) {
        currentTheme = "dark";
        localStorage.setItem("theme", "dark");
    }

    const setDarkTheme = () => {
        if (darkModeStyle) {
            darkModeStyle.removeAttribute("disabled");
        }
        localStorage.setItem("theme", "dark");
    };

    const setLightTheme = () => {
        if (darkModeStyle) {
            darkModeStyle.setAttribute("disabled", "true");
        }
        localStorage.setItem("theme", "light");
    };

    // Initialize theme state
    if (currentTheme === "dark") {
        setDarkTheme();
    } else {
        setLightTheme();
    }

    // Toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            currentTheme = localStorage.getItem("theme");
            if (currentTheme === "dark") {
                setLightTheme();
            } else {
                setDarkTheme();
            }
        });
    }

    // -------------------------------------------------------------
    // 2. Navigation Tab Switcher
    // -------------------------------------------------------------
    const tabButtons = document.querySelectorAll(".nav-tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetTabId = button.getAttribute("data-tab");

            // Deactivate all buttons
            tabButtons.forEach(btn => btn.classList.remove("active"));
            // Hide all tab panes
            tabPanes.forEach(pane => pane.classList.remove("active"));

            // Activate current button
            button.classList.add("active");
            
            // Show target tab pane
            const targetPane = document.getElementById(targetTabId);
            if (targetPane) {
                targetPane.classList.add("active");
                
                // If switching to terminal tab, auto focus the terminal input
                if (targetTabId === "terminal") {
                    const termInput = document.getElementById("terminal-input");
                    if (termInput) {
                        setTimeout(() => termInput.focus(), 50);
                    }
                }
            }

            // Scroll to content on small devices
            if (window.innerWidth <= 1024) {
                const mainContent = document.querySelector(".main-content");
                if (mainContent) {
                    const offset = mainContent.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({
                        top: offset,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // -------------------------------------------------------------
    // 3. Ambient glow movement effect (micro-interaction)
    // -------------------------------------------------------------
    document.addEventListener("mousemove", (e) => {
        const glow1 = document.querySelector(".bg-glow-1");
        const glow2 = document.querySelector(".bg-glow-2");
        if (!glow1 || !glow2) return;

        const x = e.clientX;
        const y = e.clientY;

        // Move slightly relative to cursor position
        glow1.style.transform = `translate(${x * 0.03}px, ${y * 0.03}px)`;
        glow2.style.transform = `translate(${x * -0.02}px, ${y * -0.02}px)`;
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const regionSelect = document.getElementById("region");
    const stateSelector = document.getElementById("state-selector");
    const stateSelect = document.getElementById("state");
    const countdownElement = document.getElementById("countdown");

    // Show or hide state selector based on region
    regionSelect.addEventListener("change", () => {
        if (regionSelect.value === "us") {
            stateSelector.style.display = "block";
        } else {
            stateSelector.style.display = "none";
        }
        updateCountdown();
    });

    stateSelect.addEventListener("change", updateCountdown);

    function updateCountdown() {
        const now = new Date();
        const year = now.getFullYear();
        const christmas = new Date(year, 11, 25); // December 25

        // If it's already Christmas Day, set the countdown for next year
        if (now > christmas) {
            christmas.setFullYear(year + 1);
        }

        let timezoneOffset = now.getTimezoneOffset(); // Default offset in minutes

        if (regionSelect.value === "us") {
            const state = stateSelect.value;
            if (state === "Eastern Time") timezoneOffset = 300;
            else if (state === "Central Time") timezoneOffset = 360;
            else if (state === "Mountain Time") timezoneOffset = 420;
            else if (state === "Pacific Time") timezoneOffset = 480;
        }

        const localChristmas = new Date(christmas.getTime() - timezoneOffset * 60000);
        const interval = setInterval(() => {
            const now = new Date();
            const remaining = localChristmas - now;

            if (remaining <= 0) {
                countdownElement.textContent = "🎉 Merry Christmas! 🎉";
                clearInterval(interval);
                return;
            }

            const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

            countdownElement.textContent = `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
        }, 1000);
    }

    updateCountdown();
});

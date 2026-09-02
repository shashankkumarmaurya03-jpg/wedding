// ==========================================
// WEDDING INVITATION - SHASHANK & JYOTI
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // Opening animation
    const app = document.getElementById("app");

    if (app) {
        app.style.opacity = "0";

        setTimeout(() => {
            app.style.transition = "opacity 1.5s ease";
            app.style.opacity = "1";
        }, 300);
    }


    // ==========================================
    // WEDDING COUNTDOWN
    // ==========================================

    // Wedding Date:
    // 21 November 2026

    const weddingDate = new Date("November 21, 2026 00:00:00").getTime();

    function updateCountdown() {

        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance <= 0) {
            console.log("Wedding Day!");
            return;
        }

        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60)) /
            1000
        );

        const dayElement = document.getElementById("days");
        const hourElement = document.getElementById("hours");
        const minuteElement = document.getElementById("minutes");
        const secondElement = document.getElementById("seconds");

        if (dayElement) {
            dayElement.innerText = String(days).padStart(2, "0");
        }

        if (hourElement) {
            hourElement.innerText = String(hours).padStart(2, "0");
        }

        if (minuteElement) {
            minuteElement.innerText = String(minutes).padStart(2, "0");
        }

        if (secondElement) {
            secondElement.innerText = String(seconds).padStart(2, "0");
        }
    }

    updateCountdown();

    setInterval(updateCountdown, 1000);


    // ==========================================
    // SCROLL REVEAL
    // ==========================================

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        revealObserver.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

});

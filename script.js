// ==========================================
// SHASHANK & JYOTI WEDDING INVITATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const opening = document.getElementById("opening");
    const mainContent = document.getElementById("mainContent");
    const openButton = document.getElementById("openInvitation");


    // ==========================================
    // INITIAL STATE
    // ==========================================

    if (mainContent) {
        mainContent.style.opacity = "0";
        mainContent.style.visibility = "hidden";
    }


    // ==========================================
    // OPEN INVITATION
    // ==========================================

    if (openButton) {

        openButton.addEventListener("click", function () {

            openButton.disabled = true;

            if (opening) {

                opening.style.transition =
                    "opacity 1.5s ease, transform 1.5s ease";

                opening.style.opacity = "0";
                opening.style.transform = "scale(1.04)";

            }


            setTimeout(function () {

                if (opening) {
                    opening.style.display = "none";
                }

                if (mainContent) {

                    mainContent.style.visibility = "visible";

                    setTimeout(function () {

                        mainContent.style.transition =
                            "opacity 1.5s ease";

                        mainContent.style.opacity = "1";

                    }, 100);

                }

            }, 1500);

        });

    }


    // ==========================================
    // WEDDING COUNTDOWN
    // ==========================================

    const weddingDate =
        new Date("November 21, 2026 00:00:00").getTime();


    function updateCountdown() {

        const now = new Date().getTime();

        const distance = weddingDate - now;


        const daysElement =
            document.getElementById("days");

        const hoursElement =
            document.getElementById("hours");

        const minutesElement =
            document.getElementById("minutes");

        const secondsElement =
            document.getElementById("seconds");


        if (distance <= 0) {

            if (daysElement)
                daysElement.innerText = "00";

            if (hoursElement)
                hoursElement.innerText = "00";

            if (minutesElement)
                minutesElement.innerText = "00";

            if (secondsElement)
                secondsElement.innerText = "00";

            return;
        }


        const days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (distance %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (distance %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (distance %
                    (1000 * 60)) /
                1000
            );


        if (daysElement)
            daysElement.innerText =
                String(days).padStart(2, "0");


        if (hoursElement)
            hoursElement.innerText =
                String(hours).padStart(2, "0");


        if (minutesElement)
            minutesElement.innerText =
                String(minutes).padStart(2, "0");


        if (secondsElement)
            secondsElement.innerText =
                String(seconds).padStart(2, "0");

    }


    updateCountdown();

    setInterval(updateCountdown, 1000);


    // ==========================================
    // SCROLL REVEAL
    // ==========================================

    const revealElements =
        document.querySelectorAll(".reveal");


    if (revealElements.length > 0) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("active");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(function (element) {

            observer.observe(element);

        });

    }

});

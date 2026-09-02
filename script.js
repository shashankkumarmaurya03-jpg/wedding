// ==========================================
// SHASHANK & JYOTI WEDDING INVITATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const opening = document.getElementById("opening");

    const mainContent = document.getElementById("mainContent");

    const openButton = document.getElementById("openInvitation");

    const music = document.getElementById("backgroundMusic");

    const musicToggle = document.getElementById("musicToggle");


    // ==========================================
    // MUSIC SETTINGS
    // ==========================================

    if (music) {

        music.volume = 0.7;

        music.loop = true;

    }


    // ==========================================
    // INITIAL STATE
    // ==========================================

    if (mainContent) {

        mainContent.style.opacity = "0";

        mainContent.style.visibility = "hidden";

    }


    // ==========================================
    // MUSIC BUTTON
    // ==========================================

    if (musicToggle) {

        musicToggle.innerHTML = "🎵";

        musicToggle.setAttribute(
            "aria-label",
            "Turn music on or off"
        );

    }


    // ==========================================
    // OPEN INVITATION
    // ==========================================

    if (openButton) {

        openButton.addEventListener("click", function () {

            console.log("OPEN INVITATION clicked");


            // --------------------------------------
            // Prevent double click
            // --------------------------------------

            openButton.disabled = true;


            // --------------------------------------
            // START MUSIC
            // --------------------------------------

            if (music) {

                try {

                    music.currentTime = 0;

                    const playPromise = music.play();

                    if (playPromise !== undefined) {

                        playPromise
                            .then(function () {

                                console.log(
                                    "Wedding music started."
                                );

                                if (musicToggle) {
                                    musicToggle.innerHTML = "🎵";
                                }

                            })
                            .catch(function (error) {

                                console.log(
                                    "Music could not start:",
                                    error
                                );

                                /*
                                 * IMPORTANT:
                                 * Music error will NOT stop
                                 * invitation from opening.
                                 */

                            });

                    }

                } catch (error) {

                    console.log(
                        "Music error:",
                        error
                    );

                }

            }


            // --------------------------------------
            // OPENING FADE
            // --------------------------------------

            if (opening) {

                opening.style.transition =
                    "opacity 1.2s ease, transform 1.2s ease";

                opening.style.opacity = "0";

                opening.style.transform =
                    "scale(1.04)";

            }


            // --------------------------------------
            // SHOW MAIN CONTENT
            // --------------------------------------

            setTimeout(function () {

                if (opening) {

                    opening.style.display = "none";

                }


                if (mainContent) {

                    mainContent.style.visibility =
                        "visible";

                    mainContent.style.transition =
                        "opacity 1s ease";

                    /*
                     * Force browser to process
                     * visibility before opacity.
                     */

                    requestAnimationFrame(function () {

                        mainContent.style.opacity = "1";

                        mainContent.classList.add("show");

                    });

                }

            }, 1200);

        });

    }


    // ==========================================
    // MUSIC ON / OFF
    // ==========================================

    if (musicToggle) {

        musicToggle.addEventListener(
            "click",
            function () {

                if (!music) {

                    console.log(
                        "backgroundMusic element not found."
                    );

                    return;

                }


                // ----------------------------------
                // MUSIC OFF
                // ----------------------------------

                if (!music.paused) {

                    music.pause();

                    musicToggle.innerHTML = "🔇";

                    return;

                }


                // ----------------------------------
                // MUSIC ON
                // ----------------------------------

                const playPromise = music.play();

                if (playPromise !== undefined) {

                    playPromise
                        .then(function () {

                            musicToggle.innerHTML = "🎵";

                        })
                        .catch(function (error) {

                            console.log(
                                "Music playback error:",
                                error
                            );

                            musicToggle.innerHTML = "🔇";

                        });

                }

            }
        );

    }


    // ==========================================
    // WEDDING COUNTDOWN
    // ==========================================

    const weddingDate =
        new Date(
            "November 21, 2026 00:00:00"
        ).getTime();


    function updateCountdown() {

        const now =
            new Date().getTime();


        const distance =
            weddingDate - now;


        const daysElement =
            document.getElementById("days");

        const hoursElement =
            document.getElementById("hours");

        const minutesElement =
            document.getElementById("minutes");

        const secondsElement =
            document.getElementById("seconds");


        // --------------------------------------
        // WEDDING DATE PASSED
        // --------------------------------------

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


        // --------------------------------------
        // CALCULATE TIME
        // --------------------------------------

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


        // --------------------------------------
        // DISPLAY
        // --------------------------------------

        if (daysElement) {

            daysElement.innerText =
                String(days).padStart(2, "0");

        }

        if (hoursElement) {

            hoursElement.innerText =
                String(hours).padStart(2, "0");

        }

        if (minutesElement) {

            minutesElement.innerText =
                String(minutes).padStart(2, "0");

        }

        if (secondsElement) {

            secondsElement.innerText =
                String(seconds).padStart(2, "0");

        }

    }


    // ==========================================
    // START COUNTDOWN
    // ==========================================

    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


});

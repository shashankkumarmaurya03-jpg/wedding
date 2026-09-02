```javascript
// ==========================================
// SHASHANK & JYOTI WEDDING INVITATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // ELEMENTS
    // ==========================================

    const opening =
        document.getElementById("opening");

    const mainContent =
        document.getElementById("mainContent");

    const openButton =
        document.getElementById("openInvitation");

    const music =
        document.getElementById("backgroundMusic");

    const musicToggle =
        document.getElementById("musicToggle");


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

        musicToggle.style.position = "fixed";

        musicToggle.style.right = "20px";

        musicToggle.style.bottom = "20px";

        musicToggle.style.width = "50px";

        musicToggle.style.height = "50px";

        musicToggle.style.borderRadius = "50%";

        musicToggle.style.border = "none";

        musicToggle.style.cursor = "pointer";

        musicToggle.style.zIndex = "99999";

        musicToggle.style.fontSize = "22px";

        musicToggle.style.background = "#ffffff";

        musicToggle.style.boxShadow =
            "0 5px 20px rgba(0,0,0,0.20)";

    }


    // ==========================================
    // OPEN INVITATION
    // ==========================================

    if (openButton) {

        openButton.addEventListener(
            "click",
            function () {


                // Prevent double click

                openButton.disabled = true;


                // ==================================
                // START MUSIC
                // ==================================

                if (music) {

                    music.currentTime = 0;

                    music.play()
                        .then(function () {

                            console.log(
                                "Wedding music started successfully."
                            );

                            if (musicToggle) {

                                musicToggle.innerHTML =
                                    "🎵";

                            }

                        })
                        .catch(function (error) {

                            console.log(
                                "Music playback error:",
                                error
                            );

                        });

                }


                // ==================================
                // OPENING FADE + ZOOM
                // ==================================

                if (opening) {

                    opening.style.transition =
                        "opacity 1.5s ease, transform 1.5s ease";

                    opening.style.opacity = "0";

                    opening.style.transform =
                        "scale(1.04)";

                }


                // ==================================
                // SHOW MAIN CONTENT
                // ==================================

                setTimeout(function () {


                    if (opening) {

                        opening.style.display =
                            "none";

                    }


                    if (mainContent) {

                        mainContent.style.visibility =
                            "visible";


                        setTimeout(function () {

                            mainContent.style.transition =
                                "opacity 1.5s ease";

                            mainContent.style.opacity =
                                "1";

                        }, 100);

                    }


                }, 1500);


            }
        );

    }


    // ==========================================
    // MUSIC ON / OFF
    // ==========================================

    if (musicToggle) {

        musicToggle.addEventListener(
            "click",
            function () {


                if (!music) {
                    return;
                }


                // MUSIC OFF

                if (!music.paused) {

                    music.pause();

                    musicToggle.innerHTML =
                        "🔇";

                }


                // MUSIC ON

                else {

                    music.play()
                        .then(function () {

                            musicToggle.innerHTML =
                                "🎵";

                        })
                        .catch(function (error) {

                            console.log(
                                "Music playback error:",
                                error
                            );

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


    setInterval(
        updateCountdown,
        1000
    );


});
```

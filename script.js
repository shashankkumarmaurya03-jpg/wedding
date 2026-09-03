```javascript
document.addEventListener("DOMContentLoaded", function () {


    /* ==================================================
       ELEMENTS
    ================================================== */

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


    /* ==================================================
       MUSIC
    ================================================== */

    if (music) {

        music.loop = true;

        music.volume = 0.7;

    }


    /* ==================================================
       OPEN INVITATION
    ================================================== */

    if (openButton) {

        openButton.addEventListener(
            "click",
            function () {


                openButton.disabled = true;


                /* START MUSIC */

                if (music) {

                    music.play()
                        .then(function () {

                            if (musicToggle) {

                                musicToggle.innerHTML =
                                    "♫";

                            }

                        })
                        .catch(function (error) {

                            console.log(
                                "Music waiting for interaction:",
                                error
                            );

                        });

                }


                /* CINEMATIC EXIT */

                if (opening) {

                    opening.classList.add(
                        "opening-exit"
                    );

                    opening.style.transition =
                        "opacity 1.8s ease, transform 1.8s ease";

                    opening.style.opacity = "0";

                    opening.style.transform =
                        "scale(1.06)";

                }


                /* SHOW MAIN */

                setTimeout(
                    function () {


                        if (opening) {

                            opening.style.display =
                                "none";

                        }


                        if (mainContent) {

                            mainContent.style.visibility =
                                "visible";


                            mainContent.style.transition =
                                "opacity 1.8s ease";


                            setTimeout(
                                function () {

                                    mainContent.style.opacity =
                                        "1";

                                },
                                100
                            );

                        }


                    },
                    1800
                );

            }
        );

    }



    /* ==================================================
       MUSIC BUTTON
    ================================================== */

    if (musicToggle) {

        musicToggle.addEventListener(
            "click",
            function () {


                if (!music) {
                    return;
                }


                if (music.paused) {


                    music.play()
                        .then(function () {

                            musicToggle.innerHTML =
                                "♫";

                        });


                } else {


                    music.pause();

                    musicToggle.innerHTML =
                        "🔇";

                }

            }
        );

    }



    /* ==================================================
       COUNTDOWN
    ================================================== */

    const weddingDate =
        new Date(
            "November 21, 2026 00:00:00"
        ).getTime();


    function updateCountdown() {


        const now =
            new Date().getTime();


        const distance =
            weddingDate - now;


        const days =
            document.getElementById("days");

        const hours =
            document.getElementById("hours");

        const minutes =
            document.getElementById("minutes");

        const seconds =
            document.getElementById("seconds");


        if (distance <= 0) {

            if (days)
                days.innerText = "00";

            if (hours)
                hours.innerText = "00";

            if (minutes)
                minutes.innerText = "00";

            if (seconds)
                seconds.innerText = "00";

            return;

        }


        const d =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );


        const h =
            Math.floor(
                (distance %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );


        const m =
            Math.floor(
                (distance %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );


        const s =
            Math.floor(
                (distance %
                    (1000 * 60)) /
                1000
            );


        if (days)
            days.innerText =
                String(d).padStart(2, "0");


        if (hours)
            hours.innerText =
                String(h).padStart(2, "0");


        if (minutes)
            minutes.innerText =
                String(m).padStart(2, "0");


        if (seconds)
            seconds.innerText =
                String(s).padStart(2, "0");

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );



    /* ==================================================
       SCROLL REVEAL
    ================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (revealElements.length > 0) {


        const observer =
            new IntersectionObserver(
                function (entries) {


                    entries.forEach(
                        function (entry) {


                            if (
                                entry.isIntersecting
                            ) {


                                entry.target.classList.add(
                                    "active"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(
            function (element) {

                observer.observe(element);

            }
        );

    }



    /* ==================================================
       SCRATCH CARD
    ================================================== */

    const canvas =
        document.getElementById(
            "scratchCanvas"
        );


    if (canvas) {


        const ctx =
            canvas.getContext("2d");


        function setupScratch() {


            const rect =
                canvas.getBoundingClientRect();


            const ratio =
                window.devicePixelRatio || 1;


            canvas.width =
                rect.width * ratio;


            canvas.height =
                rect.height * ratio;


            ctx.scale(
                ratio,
                ratio
            );


            /* SCRATCH COVER */

            ctx.fillStyle =
                "#b28a5c";


            ctx.fillRect(
                0,
                0,
                rect.width,
                rect.height
            );


            /* COVER TEXT */

            ctx.fillStyle =
                "#fffaf2";


            ctx.font =
                "14px Arial";


            ctx.textAlign =
                "center";


            ctx.textBaseline =
                "middle";


            ctx.fillText(
                "SCRATCH TO REVEAL",
                rect.width / 2,
                rect.height / 2
            );


            ctx.globalCompositeOperation =
                "destination-out";

        }


        setupScratch();


        window.addEventListener(
            "resize",
            setupScratch
        );


        let scratching = false;


        function scratch(x, y) {


            ctx.beginPath();


            ctx.arc(
                x,
                y,
                24,
                0,
                Math.PI * 2
            );


            ctx.fill();

        }


        function getPosition(event) {


            const rect =
                canvas.getBoundingClientRect();


            if (
                event.touches &&
                event.touches.length
            ) {


                return {

                    x:
                        event.touches[0].clientX -
                        rect.left,

                    y:
                        event.touches[0].clientY -
                        rect.top

                };

            }


            return {

                x:
                    event.clientX -
                    rect.left,

                y:
                    event.clientY -
                    rect.top

            };

        }


        canvas.addEventListener(
            "mousedown",
            function (event) {

                scratching = true;

                const pos =
                    getPosition(event);

                scratch(
                    pos.x,
                    pos.y
                );

            }
        );


        canvas.addEventListener(
            "mousemove",
            function (event) {

                if (!scratching) {
                    return;
                }

                const pos =
                    getPosition(event);

                scratch(
                    pos.x,
                    pos.y
                );

            }
        );


        window.addEventListener(
            "mouseup",
            function () {

                scratching = false;

            }
        );


        canvas.addEventListener(
            "touchstart",
            function (event) {

                event.preventDefault();

                scratching = true;

                const pos =
                    getPosition(event);

                scratch(
                    pos.x,
                    pos.y
                );

            },
            {
                passive: false
            }
        );


        canvas.addEventListener(
            "touchmove",
            function (event) {

                event.preventDefault();

                if (!scratching) {
                    return;
                }

                const pos =
                    getPosition(event);

                scratch(
                    pos.x,
                    pos.y
                );

            },
            {
                passive: false
            }
        );


        canvas.addEventListener(
            "touchend",
            function () {

                scratching = false;

            }
        );

    }


});
```

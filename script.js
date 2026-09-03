```javascript
document.addEventListener("DOMContentLoaded", function () {

    const opening = document.getElementById("opening");
    const mainContent = document.getElementById("mainContent");
    const openButton = document.getElementById("openInvitation");

    const music = document.getElementById("backgroundMusic");
    const musicToggle = document.getElementById("musicToggle");


    /* ===============================
       OPEN INVITATION
    =============================== */

    if (openButton) {

        openButton.onclick = function () {

            console.log("OPEN INVITATION clicked");


            /* MUSIC */

            if (music) {

                music.play().catch(function () {
                    console.log("Music could not autoplay");
                });

            }


            /* OPENING ANIMATION */

            if (opening) {

                opening.style.transition =
                    "opacity 1.5s ease, transform 1.5s ease";

                opening.style.opacity = "0";

                opening.style.transform = "scale(1.05)";

            }


            /* SHOW MAIN PAGE */

            setTimeout(function () {

                if (opening) {

                    opening.style.display = "none";

                }


                if (mainContent) {

                    mainContent.style.visibility = "visible";

                    mainContent.style.opacity = "1";

                }


                /* PAGE TOP */

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });


            }, 1500);

        };

    }



    /* ===============================
       MUSIC BUTTON
    =============================== */

    if (musicToggle && music) {

        musicToggle.onclick = function () {

            if (music.paused) {

                music.play();

                musicToggle.innerHTML = "♫";

            } else {

                music.pause();

                musicToggle.innerHTML = "🔇";

            }

        };

    }



    /* ===============================
       COUNTDOWN
    =============================== */

    const weddingDate =
        new Date("November 21, 2026 00:00:00").getTime();


    function updateCountdown() {

        const now =
            new Date().getTime();

        const distance =
            weddingDate - now;


        if (distance <= 0) {
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


        const d = document.getElementById("days");
        const h = document.getElementById("hours");
        const m = document.getElementById("minutes");
        const s = document.getElementById("seconds");


        if (d)
            d.innerText = String(days).padStart(2, "0");

        if (h)
            h.innerText = String(hours).padStart(2, "0");

        if (m)
            m.innerText = String(minutes).padStart(2, "0");

        if (s)
            s.innerText = String(seconds).padStart(2, "0");

    }


    updateCountdown();

    setInterval(updateCountdown, 1000);



    /* ===============================
       SCROLL REVEAL
    =============================== */

    const reveals =
        document.querySelectorAll(".reveal");


    const observer =
        new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        }, {
            threshold: 0.15
        });


    reveals.forEach(function (element) {

        observer.observe(element);

    });



    /* ===============================
       SCRATCH CARD
    =============================== */

    const canvas =
        document.getElementById("scratchCanvas");


    if (canvas) {

        const ctx =
            canvas.getContext("2d");


        function resizeCanvas() {

            const rect =
                canvas.getBoundingClientRect();

            const ratio =
                window.devicePixelRatio || 1;


            canvas.width =
                rect.width * ratio;

            canvas.height =
                rect.height * ratio;


            ctx.setTransform(
                ratio,
                0,
                0,
                ratio,
                0,
                0
            );


            ctx.globalCompositeOperation =
                "source-over";


            ctx.fillStyle =
                "#b28a5c";


            ctx.fillRect(
                0,
                0,
                rect.width,
                rect.height
            );


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


        resizeCanvas();


        window.addEventListener(
            "resize",
            resizeCanvas
        );


        let scratching = false;


        function scratch(event) {

            const rect =
                canvas.getBoundingClientRect();


            let x;
            let y;


            if (event.touches) {

                x =
                    event.touches[0].clientX -
                    rect.left;

                y =
                    event.touches[0].clientY -
                    rect.top;

            } else {

                x =
                    event.clientX -
                    rect.left;

                y =
                    event.clientY -
                    rect.top;

            }


            ctx.beginPath();

            ctx.arc(
                x,
                y,
                25,
                0,
                Math.PI * 2
            );

            ctx.fill();

        }


        canvas.addEventListener(
            "mousedown",
            function (event) {

                scratching = true;

                scratch(event);

            }
        );


        canvas.addEventListener(
            "mousemove",
            function (event) {

                if (scratching) {

                    scratch(event);

                }

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

                scratch(event);

            },
            {
                passive: false
            }
        );


        canvas.addEventListener(
            "touchmove",
            function (event) {

                event.preventDefault();

                if (scratching) {

                    scratch(event);

                }

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

```javascript
document.addEventListener("DOMContentLoaded", function () {

    const button = document.getElementById("openInvitation");
    const opening = document.getElementById("opening");
    const main = document.getElementById("mainContent");

    if (!button) {
        alert("OPEN INVITATION button नहीं मिला!");
        return;
    }

    button.addEventListener("click", function () {

        /* Opening screen hide */
        if (opening) {
            opening.style.transition =
                "opacity 1.5s ease, transform 1.5s ease";

            opening.style.opacity = "0";
            opening.style.transform = "scale(1.05)";
        }

        /* Main page show */
        setTimeout(function () {

            if (opening) {
                opening.style.display = "none";
            }

            if (main) {
                main.style.visibility = "visible";
                main.style.opacity = "1";
            }

            window.scrollTo(0, 0);

        }, 1500);

    });

});
```

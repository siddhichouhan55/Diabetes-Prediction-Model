// ===============================
// Diabetes Prediction System
// script.js
// ===============================

// Wait until page loads
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("predictionForm");
    const inputs = document.querySelectorAll("input");

    // ==========================
    // Validate Inputs
    // ==========================

    form.addEventListener("submit", function (e) {

        let valid = true;

        inputs.forEach(function (input) {

            if (input.value.trim() === "") {

                valid = false;

                input.style.border = "2px solid red";

            } else {

                input.style.border = "2px solid #00d4ff";

            }

        });

        if (!valid) {

            alert("Please fill all the fields.");

            e.preventDefault();

            return;
        }

        // Show Loading Button

        const btn = document.querySelector(".predict-btn");

        btn.innerHTML =
            "<i class='fa-solid fa-spinner fa-spin'></i> Predicting...";

        btn.disabled = true;

    });

    // ==========================
    // Number Validation
    // ==========================

    inputs.forEach(function (input) {

        input.addEventListener("input", function () {

            if (Number(this.value) < 0) {

                this.value = "";

                alert("Negative values are not allowed.");

            }

        });

    });

    // ==========================
    // Smooth Input Focus
    // ==========================

    inputs.forEach(function (input) {

        input.addEventListener("focus", function () {

            this.style.transform = "scale(1.02)";

        });

        input.addEventListener("blur", function () {

            this.style.transform = "scale(1)";

        });

    });

    // ==========================
    // Reset Form
    // ==========================

    const resetBtn = document.querySelector(".reset-btn");

    resetBtn.addEventListener("click", function () {

        inputs.forEach(function (input) {

            input.style.border = "none";

        });

        // Remove Result Card after Reset

        const result = document.querySelector(".result-card");

        if (result) {

            result.style.display = "none";

        }

    });

});


// ===================================
// Auto Scroll to Prediction Result
// ===================================

window.onload = function () {

    const result = document.querySelector(".result-card");

    if (result) {

        result.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }

};

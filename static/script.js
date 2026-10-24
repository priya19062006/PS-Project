// ===========================
// Loading Animation
// ===========================

const button = document.getElementById("predictBtn");

if (button) {

    button.addEventListener("click", function () {

        button.innerHTML = "⏳ Predicting...";

        button.disabled = true;

    });

}

// ===========================
// Fade-in Animation
// ===========================

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});

// ===========================
// Dashboard Card Hover Effect
// ===========================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px) scale(1.03)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0) scale(1)";

    });

});

// ===========================
// Smooth Scroll
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ===========================
// Progress Bar Animation
// ===========================

window.addEventListener("load", () => {

    const bar = document.querySelector(".progress-bar");

    if (bar) {

        const width = bar.style.width;

        bar.style.width = "0%";

        setTimeout(() => {

            bar.style.width = width;

        }, 300);

    }

});

// ===========================
// Floating Image Effect
// ===========================

const image = document.querySelector(".right img");

if (image) {

    image.addEventListener("mousemove", () => {

        image.style.transform = "scale(1.03)";

    });

    image.addEventListener("mouseleave", () => {

        image.style.transform = "scale(1)";

    });

}

// ===========================
// Welcome Message
// ===========================

console.log("🌸 Iris Flower Prediction System Loaded Successfully");
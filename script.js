const navLinks = document.querySelectorAll(".nav-link");
const categories = document.querySelectorAll(".category");
const nav = document.querySelector("nav");
const newB = document.querySelector(".new");

const visibleItems = new Map();

let currentActiveLink = null;

function updateActiveLink() {
    let currentItem = null;
    let largestRatio = 0;

    visibleItems.forEach((ratio, item) => {
        if (ratio > largestRatio) {
            largestRatio = ratio;
            currentItem = item;
        }
    });

    if (!currentItem) return;

    const activeLink = document.querySelector(
        `.nav-link[href="#${currentItem.id}"]`
    );

    if (!activeLink) return;

    if (activeLink === currentActiveLink) {
        return;
    }

    navLinks.forEach((link) => {
        link.classList.remove("active");
    });

    activeLink.classList.add("active");

    currentActiveLink = activeLink;

    nav.scrollTo({
        left:
            activeLink.offsetLeft -
            nav.clientWidth / 2 +
            activeLink.clientWidth / 2,
        behavior: "smooth"
    });
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                visibleItems.set(
                    entry.target,
                    entry.intersectionRatio
                );
            } else {
                visibleItems.delete(entry.target);
            }
        });

        updateActiveLink();
    },
    {
        rootMargin: "-10% 0px -10% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
    }
);

categories.forEach((category) => {
    observer.observe(category);
});

// Transition του New στις Προσφορές και μετά από λίγο εξαφάνιση του
window.addEventListener("load", () => {


    const animation = newB.animate(
        [
            { transform: "scale(1.5) rotate(-30deg)" },
            { transform: "scale(2.5) rotate(-30deg)" }
        ],
        {
            easing: "ease-in-out",
            iterations: Infinity,
            duration: 1500
        }
    );

    setTimeout(() => {
        animation.cancel();
    }, 5000);
});
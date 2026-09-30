// LOGO INF SCROLL

const scrollLogo = document.querySelector(".scroll-logo");
const marquee = document.querySelector(".logo-marquee");

const logos = [...scrollLogo.children];

logos.forEach((logo) => {
  scrollLogo.appendChild(logo.cloneNode(true));
});

let position = 0;
let speed = 1.2;
let isPaused = false;

function infiniteScroll() {
  if (!isPaused) {
    position -= speed;

    const halfWidth = scrollLogo.scrollWidth / 2;

    if (Math.abs(position) >= halfWidth) {
      position = 0;
    }

    scrollLogo.style.transform = `translateX(${position}px)`;
  }

  requestAnimationFrame(infiniteScroll);
}

marquee.addEventListener("mouseenter", () => {
  isPaused = true;
});

marquee.addEventListener("mouseleave", () => {
  isPaused = false;
});

infiniteScroll();

// SHOW BIO or HIDE BIO

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  const showBtn = card.querySelector(".show-btn");
  const bio = card.querySelector(".bio");
  const bioText = card.querySelector(".text-bio");
  const verticalIcon = card.querySelector(".plus-vertical");

  showBtn.addEventListener("click", () => {
    const isOpen = bio.classList.contains("visible");

    bio.classList.toggle("top-[1px]");
    bio.classList.toggle("top-full");

    bio.classList.toggle("opacity-100");
    bio.classList.toggle("opacity-0");

    bio.classList.toggle("visible");
    bio.classList.toggle("invisible");

    bio.classList.toggle("translate-y-0");
    bio.classList.toggle("translate-y-5");

    bioText.textContent = !isOpen ? "HIDE BIO" : "SHOW BIO";

    verticalIcon.classList.toggle("opacity-0", !isOpen);

    if (!isOpen) {
      showBtn.classList.remove("bg-dark-peach");
      showBtn.classList.add("bg-peach");
    } else {
      showBtn.classList.remove("bg-peach");
      showBtn.classList.add("bg-dark-peach");
    }
  });
});

// SLIDER CARDS (Swiper)

const sliderLeftBtn = document.querySelector("#left-button");
const sliderRightBtn = document.querySelector("#right-button");

const cardsSwiper = new Swiper(".cards-swiper", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 28,
  enabled: true,
  speed: 500,

  rewind: true,

  breakpoints: {
    769: {
      enabled: true,
      slidesPerView: "auto",
      centeredSlides: false,
      loop: true,
      spaceBetween: 28,
    },
    1230: {
      enabled: false,
      slidesPerView: "auto",
      loop: true,
      centeredSlides: false,
      spaceBetween: 28,
    },
  },

  on: {
    breakpoint(swiper) {
      if (!swiper.enabled) {
        swiper.wrapperEl.style.transform = "translate3d(0,0,0)";
      }
    },
  },
});

function showTemporaryOpacity(button) {
  if (!button) return;

  button.classList.add("opacity-30");

  setTimeout(() => {
    button.classList.remove("opacity-30");
  }, 300);
}

function moveRight() {
  if (!cardsSwiper.enabled) return;

  cardsSwiper.slideNext();

  showTemporaryOpacity(sliderRightBtn);
  sliderLeftBtn?.classList.remove("opacity-30");
}

function moveLeft() {
  if (!cardsSwiper.enabled) return;

  cardsSwiper.slidePrev();

  showTemporaryOpacity(sliderLeftBtn);
  sliderRightBtn?.classList.remove("opacity-30");
}

window.moveRight = moveRight;
window.moveLeft = moveLeft;

// ACCORDION

       const faqItems = document.querySelectorAll(".faq-item");

        faqItems.forEach((faq) => {
            const summary = faq.querySelector("summary");
            const content = faq.querySelector(".faq-content");

            summary.addEventListener("click", (e) => {
                e.preventDefault();

                if (faq.open) {

                    content.style.maxHeight = content.scrollHeight + "px";


                    content.offsetHeight;


                    requestAnimationFrame(() => {
                        content.style.maxHeight = "0px";
                    });

                    content.addEventListener(
                        "transitionend",
                        () => {
                            faq.open = false;
                        },
                        { once: true }
                    );

                }

                else {
                    faq.open = true;
                    content.style.maxHeight = "0px";
                    requestAnimationFrame(() => {
                        content.style.maxHeight =
                            content.scrollHeight + "px";
                    });
                }
            });
        });

        faqItems.forEach((faq) => {
            const content = faq.querySelector(".faq-content");

            if (faq.open) {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });

// YEAR FUNCTION

const yearElement = document.getElementById("year");

yearElement.innerText = new Date().getFullYear();

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

    bio.classList.toggle("top-0");
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

// SLIDER CARDS

const sliderTrack = document.querySelector(".cards");
      const sliderItems = document.querySelectorAll(".cards > .card");
      const sliderLeftBtn = document.querySelector("#left-button");
      const sliderRightBtn = document.querySelector("#right-button");

      let sliderIndex = 0;

      function isSliderEnabled() {
        return window.innerWidth < 1024;
      }

      function showTemporaryOpacity(button) {
        if (!button) return;

        button.classList.add("opacity-30");

        setTimeout(() => {
          button.classList.remove("opacity-30");
        }, 300);
      }

      function updateSlider() {
        if (!sliderTrack || !sliderItems.length) return;

        if (!isSliderEnabled()) {
          sliderTrack.style.transform = "translateX(0)";
          sliderIndex = 0;
          return;
        }

        const cardWidth = sliderItems[0].getBoundingClientRect().width;
        const cardGap = parseFloat(getComputedStyle(sliderTrack).gap) || 0;

        const slideAmount = cardWidth + cardGap;

        sliderTrack.style.transform = `translateX(-${
          sliderIndex * slideAmount
        }px)`;
      }

      function moveRight() {
        if (!isSliderEnabled() || !sliderItems.length) return;

        sliderIndex++;

        if (sliderIndex >= sliderItems.length) {
          sliderIndex = 0;
        }

        updateSlider();

        showTemporaryOpacity(sliderRightBtn);

        if (sliderLeftBtn) {
          sliderLeftBtn.classList.remove("opacity-30");
        }
      }

      function moveLeft() {
        if (!isSliderEnabled() || !sliderItems.length) return;

        sliderIndex--;

        if (sliderIndex < 0) {
          sliderIndex = sliderItems.length - 1;
        }

        updateSlider();

        showTemporaryOpacity(sliderLeftBtn);

        if (sliderRightBtn) {
          sliderRightBtn.classList.remove("opacity-30");
        }
      }

      window.moveRight = moveRight;
      window.moveLeft = moveLeft;

      window.addEventListener("resize", updateSlider);

      updateSlider();

// ACCORDIONS

const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  const header = accordion.querySelector(".accordion-header");
  const content = accordion.querySelector(".accordion-content");

  if (accordion.classList.contains("active")) {
    header.classList.remove("pb-[22px]");

    content.classList.remove("grid-rows-[0fr]");
    content.classList.add("grid-rows-[1fr]");

    accordion.classList.remove("rounded-full", "border-transparent");
    accordion.classList.add("rounded-16", "border-dark-peach");
  } else {
    header.classList.add("pb-[22px]");

    content.classList.remove("grid-rows-[1fr]");
    content.classList.add("grid-rows-[0fr]");

    accordion.classList.remove("rounded-16", "border-dark-peach");
    accordion.classList.add("rounded-full", "border-transparent");
  }

  header.addEventListener("click", () => {
    const isActive = accordion.classList.contains("active");

    accordions.forEach((item) => {
      item.classList.remove("active", "rounded-16", "border-dark-peach");

      item.classList.add("rounded-full", "border-transparent");

      const itemHeader = item.querySelector(".accordion-header");
      const itemContent = item.querySelector(".accordion-content");

      itemHeader.classList.add("pb-[22px]");

      itemContent.classList.remove("grid-rows-[1fr]");
      itemContent.classList.add("grid-rows-[0fr]");
    });

    if (!isActive) {
      accordion.classList.add("active");

      accordion.classList.remove("rounded-full", "border-transparent");

      accordion.classList.add("rounded-16", "border-dark-peach");

      header.classList.remove("pb-[22px]");

      content.classList.remove("grid-rows-[0fr]");
      content.classList.add("grid-rows-[1fr]");
    }
  });
});

// YEAR FUNCTION

const yearElement = document.getElementById("year");

yearElement.innerText = new Date().getFullYear();

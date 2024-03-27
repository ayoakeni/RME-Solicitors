// Loading Screen
window.addEventListener('load', function() {
  setTimeout(function() {
    // Hide the loading screen and  Remove the loading-screen index when content has finished loading
    let loadIndex = document.querySelector('.loading-screen');
    loadIndex.style.opacity = '0';
    loadIndex.style.zIndex = '-1';
    // Show the content
    document.querySelector('.content').style.opacity = '1';
  }, 2000); // Delay in milliseconds (2000ms = 2 seconds)
});

// Swiper slide
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 40,
  cssMode: true,
  autoplay:{delay: 3000},
  // slidesPerView: 1,
  // spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  800: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
    1045: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1115: {
      slidesPerView: 1,
      spaceBetween: 50,
    },
    1366: {
      slidesPerView: 2,
      spaceBetween: 40,
    }
  },
  mousewheel: true,
  keyboard: true,
});

// Question-answer
const qClick = document.querySelectorAll(".question-click");
const qCont = document.querySelectorAll(".q-content");

qClick.forEach((click, index) => {
  click.addEventListener("click", () =>{
    qCont[index].classList.toggle("show");
  });
});


// Whatsapp Chat-box
const whatsapp = document.getElementById("whatsapp-btn");
const whatsappBox = document.querySelector(".whatsapp-box");
const cancel = document.querySelector(".whatsapp-close");
const messageBox = document.querySelector(".whatsapp-box-message");
const timeElement = document.querySelector(".whatsapp-time");
const textElement = document.getElementById("text");
let initialText = "Typically replies within an hour";
let hasTyped = false;

whatsapp.addEventListener("click", () => {
  whatsappBox.classList.toggle("active");

  if (whatsappBox.classList.contains("active") && !hasTyped) {
    typeText(initialText);
    hasTyped = true;

    // Show the message box with the loading state
    messageBox.innerHTML = `<div class="whatsapp-loading-animation">
     <div class="whatsapp-loading-circle"></div>
     <div class="whatsapp-loading-circle"></div>
     <div class="whatsapp-loading-circle"></div>
    </div>`;

    // Simulate a delay before showing the actual message
    setTimeout(() => {
      messageBox.innerHTML = `<span class="whatsapp-message-title">Rme Solicitors</span>
      <span class="whatsapp-content-message">Hi there 👋<br><br> How can i help you?</span>
      <span class="whatsapp-time">00:00</span>`;
      updateTime();
    }, 2500);
  }
});

cancel.addEventListener("click", () => {
  whatsappBox.classList.remove("active");
});

function typeText(text) {
  let index = 0;
  function typeNextCharacter() {
    if (index < text.length) {
      textElement.textContent += text[index];
      index++;
      setTimeout(typeNextCharacter, 50); // Adjust the speed here (milliseconds)
    }
  }
  typeNextCharacter();
}

function updateTime() {
  // Update the time to the current time
  let now = new Date();
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  document.querySelector(".whatsapp-time").textContent = `${hours}:${minutes}`;
}


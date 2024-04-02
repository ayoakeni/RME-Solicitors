window.addEventListener('load', function() {
  // Hide the loading screen after the images are halfway loaded
  let images = document.querySelectorAll('img');
  let loadedCount = 0;
  let halfwayCount = Math.ceil(images.length / 2);

  images.forEach(function(image) {
    image.addEventListener('load', function() {
      loadedCount++;
      if (loadedCount >= halfwayCount) {
        // If at least half of the images are loaded, hide the loading screen
        let loadIndex = document.querySelector('.loading-screen');
        loadIndex.style.opacity = '0';
        loadIndex.style.zIndex = '-1';
        // Show the content
        document.querySelector('.content').style.opacity = '1';
      }
    });
  });

  // Fallback: Hide the loading screen after 3 seconds
  setTimeout(function() {
    let loadIndex = document.querySelector('.loading-screen');
    loadIndex.style.opacity = '0';
    loadIndex.style.zIndex = '-1';
    // Show the content
    document.querySelector('.content').style.opacity = '1';
  }, 3000); // 3 seconds delay
});

// Check if the content has been loaded
document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    // If the content is fully loaded before the 3-second delay, hide the loading screen immediately
    let loadIndex = document.querySelector('.loading-screen');
    loadIndex.style.opacity = '0';
    loadIndex.style.zIndex = '-1';
    // Show the content
    document.querySelector('.content').style.opacity = '1';
  }
};

// Smooth scroll to anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Check if the URL contains an ID parameter
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  // Function to scroll to the target element
  function scrollToElement(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  // Scroll to the element if ID is present in the URL
  if (id) {
    scrollToElement(id);
  }
  // Add click event listeners to all anchor tags with href starting with '#'
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent the default link behavior
      const targetId = this.getAttribute('href').substring(1); // Get the target ID from the link's href attribute
      scrollToElement(targetId); // Scroll to the target element
    });
  });
});

// Nav bar for mobile when clicked outside the menu-bar "close the menu bar"
var menuToggle = document.getElementById("menu-toggle");
var menu = document.querySelector(".menu-bar");
var content = document.querySelector("nav ul");

document.addEventListener("click", function(event) {
  var target = event.target;
  var isClickInsideMenu = menu.contains(target);
  var isClickInsideContent = content.contains(target);

  if (!isClickInsideMenu && !isClickInsideContent && target !== menuToggle && target !== menuToggle.nextElementSibling) {
    menuToggle.checked = false;
  }
});

// Swiper slide
var swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    600: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    941: {
      slidesPerView: 1.4,
      spaceBetween: 30,
    },
    970: {
      slidesPerView: 1.4,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 1.6,
      spaceBetween: 30,
    },
    1349: {
      slidesPerView: 2.4,
      spaceBetween: 130,
    },
    1440: {
      slidesPerView: 2.1,
      spaceBetween: 30,
    },
  },
});

// Question-answer
const qClick = document.querySelectorAll(".question-click");
const qCont = document.querySelectorAll(".q-content");

qClick.forEach((click, index) => {
  click.addEventListener("click", () =>{
    qCont[index].classList.toggle("show");
    click.classList.toggle("rotate");
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

// Whatsapp icon chat widget for moving only with mouse
let isDragging = false;
let offsetX, offsetY;

whatsapp.addEventListener('mousedown', startDrag);
whatsapp.addEventListener('touchstart', startDrag);

document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag);

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

function startDrag(e) {
  isDragging = true;
  offsetX = (e.clientX || e.touches[0].clientX) - whatsapp.getBoundingClientRect().left;
  offsetY = (e.clientY || e.touches[0].clientY) - whatsapp.getBoundingClientRect().top;
}

function drag(e) {
  if (!isDragging) return;
  e.preventDefault();
  
  const x = e.clientX || e.touches[0].clientX;
  const y = e.clientY || e.touches[0].clientY;

  whatsapp.style.left = (x - offsetX) + 'px';
  whatsapp.style.top = (y - offsetY) + 'px';
}

function endDrag() {
  isDragging = false;
}
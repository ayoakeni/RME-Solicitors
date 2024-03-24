// Loading Screen
window.addEventListener('load', function() {
  // Hide the loading screen
  document.querySelector('.loading-screen').style.opacity = '0';
  // Show the content
  document.querySelector('.content').style.opacity = '1';
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

// Popup message for sucessfull submit
let Popup = document.getElementById("popup");

function openPopup(){
  Popup.classList.add("openPopup");
}
function closePopup(){
  Popup.classList.remove("openPopup");
}

// Email Authentication
const form = document.querySelector("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const surname = document.getElementById("surname");
const phone = document.getElementById("phone");
const message = document.getElementById("message");
const pop = document.querySelector(".pop-back");

function sendEmail() {
const bodyMessage = `Full Name: ${name.value}<br> Email: ${email.value}
<br> Surname: ${surname.value}<br> Phone Number: ${phone.value}<br>Message: ${message.value}`;

  Email.send({
    SecureToken : "a692a79d-6d31-4195-96b6-443d33dc1958",
    Host : "smtp.elasticemail.com",
    Username : "akeniayowunmi@gmail.com",
    Password : "F4751978190A460064BA7FB1B0ADF3401306",
    To : 'akeniayowunmi@gmail.com',
    From : "akeniayowunmi@gmail.com",
    Subject : "Enquiry from Rme Solicitors",
    Body : bodyMessage
  }).then(
    message => {
      if (message == "OK") {
        openPopup();
      }
      else{
        Swal.fire({
          title: "Oops!",
          text: "Unable to send emails. Please try again later.",
          icon: "error"
        })
      }
    }
  );
}
// For errors or wrong inputs
function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    })

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      }
      else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}
// For wrong email or invalid email
function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

  const errorTxtEmail = document.querySelector(".error-text.email");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTxtEmail.innerHTML = " Enter a valid email address";
    }
    else{
      errorTxtEmail.innerHTML = "Email Address can't be blank";
    }
  }
  else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}
// Submit button
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (!name.classList.contains("error") && !email.classList.contains("error")
  && !phone.classList.contains("error") && !surname.classList.contains("error")
  && !message.classList.contains("error")) {
    sendEmail();

    form.reset();
    return false;
  }
});

// Whatsapp Chat-box
const whatsapp = document.getElementById("whatsapp");
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


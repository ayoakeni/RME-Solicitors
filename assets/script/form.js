// Popup message for sucessfull submit
const closePopup = document.getElementById("close-btn");

function openPopup(){
  pop.classList.add("openPopup");
}
closePopup.addEventListener("click", () => {
  pop.classList.remove("openPopup");
});


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
    SecureToken : "72112595-5e01-408e-963c-c0809cbee30d",
    To : 'rme_solicitors@yahoo.com',
    From : "info@rmesolicitors.com",
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
          text: "Unable to send emails. Please try again.",
          icon: "error"
        })       
      }
    }
  ).catch(_error => {
    Swal.fire({
      title: "Oops!",
      text: "Unable to send. Please check your internet connection or try again later.",
      icon: "error"
    }) 
  });
    if (!navigator.onLine) {
      Swal.fire({
        title: "Oops!",
        text: "Failed to send. No_internet Connection.",
        icon: "error"
      }) 
    return;
  }
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
// For Phone number
phone.addEventListener('keydown', function(event) {
  // Allow backspace, delete, arrow keys, and numbers
  if (event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || (event.key >= '0' && event.key <= '9')) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
});
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
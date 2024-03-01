var swiper = new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 40,
  cssMode: true,
  autoplay:{delay: 3000},
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // breakpoints:{
  //   0: {
  //     slidesPerView: 1,
  //   }
  // },
  mousewheel: true,
  keyboard: true,
});

// Popup Script
let Popup = document.getElementById("popup");

function openPopup(){
  Popup.classList.add("openPopup");
}
function closePopup(){
  Popup.classList.remove("openPopup");
}
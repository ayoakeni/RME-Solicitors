var swiper = new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 40,
  cssMode: true,
  autoplay:{delay: 3000},
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
});
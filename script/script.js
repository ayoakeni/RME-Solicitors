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
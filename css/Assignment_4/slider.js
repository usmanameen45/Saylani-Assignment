var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 12,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  speed: 750,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  loop: true,
  watchSlidesProgress: true,
  bulletClass: "swiper-pagination-bullet",
  bulletActiveClass: "swiper-pagination-bullet-active",
});

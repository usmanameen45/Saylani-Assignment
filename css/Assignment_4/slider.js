let swiper = new Swiper(".mySwiper", {
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
// marquee script
let marquee = new Swiper(".myMarquee", {
  slidesPerView: "auto",
  loop: true,
  spaceBetween: 12,
  speed: 4000, // lower = slower, higher = faster
  allowTouchMove: false, // prevent user drag
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
});

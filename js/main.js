


const gallerySliderContainer = document.querySelector('.gallery-slider');
if(gallerySliderContainer){
  const gallerySwiper = new Swiper(gallerySliderContainer, {
    // Default parameters
    slidesPerView: 2,
    enteredSlides: true,
    spaceBetween: 40,
    loop: true,
    // loopedSlides: 3,
    wrapperClass: 'gallery-slider-wrapper',
    slideClass: 'gallery-slider-slide',
    allowTouchMove: false,
    autoplay: {
      delay: 5000,
    },
    nextButton: '.next-slide',
    prevButton: '.prev-slide',
    navigation: {
        nextEl: '.next-slide',
        prevEl: '.prev-slide',
      },


    // Responsive breakpoints
    breakpoints:{
      0:{
        slidesPerView: 1,
        allowTouchMove: true,
      },
      768:{
        slidesPerView: 2,
        allowTouchMove: false,
      }
    }
  })

}



const bgSliderContainer = document.querySelector('.bg-slider');
if(bgSliderContainer){
  const bgSwiper = new Swiper(bgSliderContainer, {
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    wrapperClass: 'bg-slider-wrapper',
    slideClass: 'bg-slide',
    autoplay: {
      delay: 5000,
    },

    effect: 'fade',
      fadeEffect: {
        crossFade: true
    },

  });
}


const popupBtns = document.querySelectorAll('.popup-link');
if(popupBtns){
    popupBtns.forEach((link) => {
        link.addEventListener('click', function(e){
          e.preventDefault();
          document.querySelector('.popup-wrapper').classList.add('open');
        })
    })
    document.querySelector('.popup-close').addEventListener('click', function(){
      document.querySelector('.popup-wrapper').classList.remove('open');
    })
    
}




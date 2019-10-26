import Flickity from 'flickity';
import 'flickity-imagesloaded';

export default function Global() {
  $(document).ready(function() {

    $('.js-scroll-meals').click(function(e) {
      $('html, body').animate({ scrollTop: $('.carousels').offset().top }, 1000);
    });


    const chefSelector = document.querySelector('.chef-carousel');
    const chefCarousel = new Flickity(chefSelector, {
      // options
      imagesLoaded: true,
      freeScroll: true,
      autoPlay: true,
      freeScrollFriction: 0.15,
      on: {
        ready: touchFix
      }
    });
  
    const cateringSelector = document.querySelector('.catering-carousel');
    const cateringCarousel = new Flickity(cateringSelector, {
      // options
      imagesLoaded: true,
      freeScroll: true,
      autoPlay: true
    });

    const mealsSelector = document.querySelector('.meals-carousel');
    const mealsCarousel = new Flickity(mealsSelector, {
      // options
      imagesLoaded: true,
      freeScroll: true,
      autoPlay: true,

    });
  
    function touchFix() {
      let touchingCarousel = false;
      let touchStartCoords = null;
      console.log('hi')

      document.body.addEventListener('touchstart', e => {
        if (e.target.closest('.flickity-slider')) {
          touchingCarousel = true;
        } else {
          touchingCarousel = false;
          return;
        }
    
        touchStartCoords = {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY,
        };
      });
    
      document.body.addEventListener(
        'touchmove',
        e => {
          if (!(touchingCarousel && e.cancelable)) {
            return;
          }
    
          const moveVector = {
            x: e.touches[0].pageX - touchStartCoords.x,
            y: e.touches[0].pageY - touchStartCoords.y,
          };
    
          if (Math.abs(moveVector.x) > 7) e.preventDefault();
        },
        { passive: false },
      );    
    }

  });

  
}

$(document).ready(function() {
  $('.js-scroll-about').click(function(e) {
    $('html, body').animate({ scrollTop: $('.about-section').offset().top }, 1000);
  });
});


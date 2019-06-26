$(document).ready(function() {
  $('.js-scroll-meals').click(function(e) {
    $('html, body').animate({ scrollTop: $('.section-meals').offset().top }, 1000);
  });
});


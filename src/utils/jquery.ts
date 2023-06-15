function jqueryCC() {
  // Hide preheader & move navbar when scroll
  $(window).scroll(function () {
    const windowScrollTop = $(this).scrollTop();

    if (windowScrollTop > 200 && $('.navbar_bg-scrolled').css('display') === 'block') {
      $('.navbar_bg-scrolled').css({
        transform: 'translateY(0rem)',
        height: '100%',
      });
      $('.navbar_component').css({
        height: '3.5rem',
      });
    } else {
      $('.navbar_bg-scrolled').css({
        transform: 'translateY(-5.5rem)',
        height: '100%',
      });
      $('.navbar_component').css({
        height: '5.5rem',
      });
    }
  });
}
export { jqueryCC };

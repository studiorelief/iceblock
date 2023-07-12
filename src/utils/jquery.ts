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
      // Check if URL does not contain '/blog' before executing this block
      if (!window.location.href.includes('blog')) {
        $('.navbar_bg-scrolled').css({
          transform: 'translateY(-10rem)',
          height: '100%',
        });
      }
      $('.navbar_component').css({
        height: '5.5rem',
      });
    }
  });

  // Mirror clic on form
  $(document).ready(function () {
    $('#individual, #asset-manager, #bank, #vc, #start-investing, #advisory, #partnership').on(
      'click',
      function () {
        $('.right-arrow').trigger('click');
      }
    );
  });
}
export { jqueryCC };

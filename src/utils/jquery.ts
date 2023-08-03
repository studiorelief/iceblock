function jqueryCC() {
  // Hide preheader & move navbar when scroll
  $(window).scroll(function () {
    const windowScrollTop = $(this).scrollTop();

    if (windowScrollTop > 50 && $('.navbar_bg-scrolled').css('display') === 'block') {
      $('.navbar_bg-scrolled').css({
        transform: 'translateY(0rem)',
        height: '100%',
      });
      $('.navbar_component').css({
        height: '3.5rem',
      });
    } else {
      // Check if URL does not contain '/blog' before executing this block
      if (
        !window.location.href.includes('blog') &&
        !window.location.href.includes('privacy-policy') &&
        !window.location.href.includes('terms')
      ) {
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
    $('#individual, #asset-manager, #bank, #VC, #start-investing, #advisory, #partnership').on(
      'click',
      function () {
        $('.right-arrow').trigger('click');
      }
    );
  });

  // toggle is-active class
  $(document).ready(function () {
    $('.live-performance_tabs').click(function () {
      $('.live-performance_tabs').removeClass('is-active');
      $(this).addClass('is-active');
    });
  });

  // tabs performance
  const tabs = ['innovation', 'vision', 'dynamic'];

  tabs.forEach((tab) => {
    $(`.live-performance_tabs.is-${tab}`).click(function () {
      tabs.forEach((otherTab) => {
        const zIndex = otherTab === tab ? '10' : '0';
        $(`.chart-wrapper.is-live-performance.is-looker.is-${otherTab}.w-embed.w-iframe`).css(
          'z-index',
          zIndex
        );
      });
    });
  });
}
export { jqueryCC };

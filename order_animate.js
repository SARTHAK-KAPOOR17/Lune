
  $('.order').click(function(e) {
    let button = $(this);

    if (!button.hasClass('animate')) {
      button.addClass('animate');

      setTimeout(() => {
        button.removeClass('animate');
        window.location.href = "main.html";
      }, 10000); // match this with CSS animation timing
    }
  });


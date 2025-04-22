
  $('.order').click(function(e) {
    let button = $(this);

    if (!button.hasClass('animate')) {
      button.addClass('animate');

      setTimeout(() => {
        button.removeClass('animate');
        window.location.href = "index.html";
      }, 10000); // match this with CSS animation timing
    }
  });

  alert("✅ Please click on the complete order button to confirm your order.");
  alert("✅ Payment Successful! Thank you for your purchase.");
  // Simulate payment logic
  


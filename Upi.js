let isPaymentSuccessful = false;

  // Handle Payment
  function handlePayment() {
    const upiID = document.getElementById('upi-id').value.trim();
    const upiPIN = document.getElementById('upi-pin').value;
    const payButton = document.getElementById('pay-button');

    if (!upiID || upiPIN.length !== 6) {
      alert('Please enter a valid UPI ID and 6-digit PIN.');
      return;
    }

    payButton.innerHTML = "Processing...";
    payButton.disabled = true;

    setTimeout(() => {
      const isSuccess = Math.random() < 0.8;

      if (isSuccess) {
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('success-container').style.display = 'flex';
        document.getElementById('success-sound').play();
        isPaymentSuccessful = true;

        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });

        setTimeout(() => {
          document.getElementById('thankyou-sound').play();
        }, 1000);
      } else {
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('failure-container').style.display = 'flex';
        document.getElementById('error-sound').play();
        isPaymentSuccessful = false;

        openChatbot();
      }

      payButton.innerHTML = "Pay Now";
      payButton.disabled = false;
    }, 3000);
  }

  // Retry Payment
  function retryPayment() {
    document.getElementById('failure-container').style.display = 'none';
    document.getElementById('form-container').style.display = 'block';
  }

  // Open Chatbot
  function openChatbot() {
    document.getElementById('chatbot').style.display = 'block';
    const chatMessages = document.getElementById('chat-messages');
    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user-message');
    userMessage.textContent = "Hello, I need help!";
    chatMessages.appendChild(userMessage);

    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    botMessage.textContent = isPaymentSuccessful ? "Your payment was successful!" : "There was an issue with your payment. Would you like to retry?";
    chatMessages.appendChild(botMessage);
  }

  // Chatbot Message Sending
  document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const userInput = this.value;
      this.value = '';

      const chatMessages = document.getElementById('chat-messages');
      const userMessage = document.createElement('div');
      userMessage.classList.add('chat-message', 'user-message');
      userMessage.textContent = userInput;
      chatMessages.appendChild(userMessage);

      // Bot Response
      const botMessage = document.createElement('div');
      botMessage.classList.add('chat-message', 'bot-message');
      if (userInput.toLowerCase().includes("retry")) {
        botMessage.textContent = "Okay, let's try again!";
        retryPayment();
      } else {
        botMessage.textContent = "Thank you for your message! We'll assist you shortly.";
      }
      chatMessages.appendChild(botMessage);
      
      // Scroll to the bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });
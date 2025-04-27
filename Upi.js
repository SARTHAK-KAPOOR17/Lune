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
      const isSuccess = Math.random() < 0.8; // 80% chance success, 20% chance fail (smart fallback)

      if (isSuccess) {
        // SUCCESS
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('success-container').style.display = 'flex';
        document.getElementById('success-sound').play();
        setTimeout(() => {
          document.getElementById('thankyou-sound').play();
        }, 1000);

        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });

        const history = JSON.parse(localStorage.getItem('paymentHistory')) || [];
        history.push({ upiID: upiID, time: new Date().toLocaleString() });
        localStorage.setItem('paymentHistory', JSON.stringify(history));

        setTimeout(() => {
          generateReceipt(upiID);
        }, 2000);

      } else {
        // FAIL
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('failure-container').style.display = 'flex';
        document.getElementById('error-sound').play();
      }

      payButton.innerHTML = "Pay Now";
      payButton.disabled = false;
    }, 3000);
  }

  function retryPayment() {
    document.getElementById('failure-container').style.display = 'none';
    document.getElementById('form-container').style.display = 'block';
  }

  function generateReceipt(upiID) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Payment Receipt", 20, 20);
    doc.setFontSize(16);
    doc.text(`UPI ID: ${upiID}`, 20, 40);
    doc.text(`Transaction ID: ${Math.floor(Math.random() * 1000000000)}`, 20, 55);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 70);

    doc.save("payment_receipt.pdf");
  }
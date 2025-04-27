function handlePayment() {
    const upiID = document.getElementById('upi-id').value.trim();
    const upiPIN = document.getElementById('upi-pin').value;
    const payButton = document.getElementById('pay-button');
    
    if (!upiID || upiPIN.length !== 6) {
      alert('Please enter valid UPI ID and 6-digit PIN.');
      return;
    }

    payButton.innerHTML = "Processing...";
    payButton.disabled = true;

    setTimeout(() => {
      document.getElementById('form-container').style.display = 'none';
      document.getElementById('success-container').style.display = 'flex';

      // Play Success Sound
      document.getElementById('success-sound').play();

      // Save to localStorage (Payment History)
      const history = JSON.parse(localStorage.getItem('paymentHistory')) || [];
      history.push({ upiID: upiID, time: new Date().toLocaleString() });
      localStorage.setItem('paymentHistory', JSON.stringify(history));

    }, 3000); // Simulated delay
  }

  function downloadReceipt() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const upiID = document.getElementById('upi-id').value.trim();
    const date = new Date().toLocaleString();

    doc.text('Payment Receipt', 20, 20);
    doc.text('-----------------------------', 20, 30);
    doc.text(`UPI ID: ${upiID}`, 20, 50);
    doc.text(`Transaction Time: ${date}`, 20, 60);
    doc.text('Status: Successful ✅', 20, 80);

    doc.save('Payment_Receipt.pdf');
  }
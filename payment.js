// Method Toggle
const cardBtn = document.getElementById('card-btn');
const upiBtn = document.getElementById('upi-btn');
const cardPreview = document.getElementById('card-preview');
const upiPreview = document.getElementById('upi-preview');
const cardFields = document.getElementById('card-fields');
const upiFields = document.getElementById('upi-fields');
cardBtn.addEventListener('click', () => {
  cardBtn.classList.add('active'); upiBtn.classList.remove('active');
  cardPreview.classList.add('active'); upiPreview.classList.remove('active');
  cardFields.style.display = 'block'; upiFields.style.display = 'none';
});
upiBtn.addEventListener('click', () => {
  upiBtn.classList.add('active'); cardBtn.classList.remove('active');
  upiPreview.classList.add('active'); cardPreview.classList.remove('active');
  upiFields.style.display = 'block'; cardFields.style.display = 'none';
});

// Card Preview Updates
const cardNumber = document.getElementById('card-number');
const previewNumber = document.getElementById('preview-card-number');
cardNumber.addEventListener('input', (e) => {
  let val = e.target.value.replace(/\D/g, '');
  val = val.match(/.{1,4}/g)?.join(' ') || '';
  e.target.value = val;
  previewNumber.innerText = val || 'XXXX XXXX XXXX XXXX';
});
const expiry = document.getElementById('expiry-date');
const previewExpiry = document.getElementById('preview-expiry');
expiry.addEventListener('input', (e) => {
  let val = e.target.value.replace(/\D/g, '');
  if (val.length > 2) val = val.slice(0,2) + '/' + val.slice(2,4);
  e.target.value = val;
  previewExpiry.innerText = val || 'MM/YY';
});
const nameInput = document.getElementById('name');
const previewName = document.getElementById('preview-name');
nameInput.addEventListener('input', (e) => {
  previewName.innerText = e.target.value || 'Name';
});

// Submit & Loading + Success
const form = document.getElementById('payment-form');
const overlay = document.getElementById('overlay');
const successPopup = document.getElementById('success-popup');
const spinner = document.getElementById('spinner');
const buttonText = document.getElementById('button-text');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // show spinner
  spinner.style.display = 'inline-block';
  buttonText.innerText = 'Processing';
  document.getElementById('pay-button').disabled = true;
  // simulate 5s loading
  setTimeout(() => {
    spinner.style.display = 'none';
    buttonText.innerText = 'Pay Now';
    document.getElementById('pay-button').disabled = false;
    // show success
    overlay.style.display = 'block';
    successPopup.style.display = 'block';
    setTimeout(() => {
      overlay.style.display = 'none';
      successPopup.style.display = 'none';
      form.reset();
      previewNumber.innerText = 'XXXX XXXX XXXX XXXX';
      previewExpiry.innerText = 'MM/YY';
      previewName.innerText = 'Name';
    }, 3000);
  }, 5000);
});
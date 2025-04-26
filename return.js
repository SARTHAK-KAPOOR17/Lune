document.addEventListener("DOMContentLoaded", function () {
    const returnMethod = document.getElementById('returnMethod');
    const pickupDetails = document.getElementById('pickupDetails');
    const form = document.querySelector('form');
    const pickupDate = document.getElementById('pickupDate');
    const pickupAddress = document.getElementById('pickupAddress');
    const photoInput = document.getElementById('photo');

    function togglePickupDetails() {
        if (returnMethod.value === 'pickup') {
            pickupDetails.classList.add('show');
        } else {
            pickupDetails.classList.remove('show');
        }
    }

    returnMethod.addEventListener('change', togglePickupDetails);
    togglePickupDetails();

    function showTooltip(input, message) {
        let tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.innerText = message;
        input.parentNode.appendChild(tooltip);
        input.classList.add('input-error');
        setTimeout(() => {
            tooltip.remove();
            input.classList.remove('input-error');
        }, 3000);
    }

    form.addEventListener('submit', function (e) {
        let valid = true;
        if (returnMethod.value === 'pickup') {
            if (!pickupDate.value.trim()) {
                showTooltip(pickupDate, "Pickup date is required.");
                valid = false;
            }
            if (!pickupAddress.value.trim()) {
                showTooltip(pickupAddress, "Pickup address is required.");
                valid = false;
            }
        }
        if (!form.checkValidity() || !valid) {
            e.preventDefault();
        }
    });

    photoInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                let preview = document.getElementById('photoPreview');
                if (!preview) {
                    preview = document.createElement('img');
                    preview.id = 'photoPreview';
                    preview.style.maxWidth = '200px';
                    preview.style.marginTop = '10px';
                    preview.style.border = '2px solid #ccc';
                    preview.style.borderRadius = '8px';
                    preview.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    photoInput.parentNode.appendChild(preview);
                }
                preview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});


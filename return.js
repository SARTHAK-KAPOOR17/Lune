document.addEventListener("DOMContentLoaded", function () {
    const returnMethod = document.getElementById('returnMethod');
    const pickupDetails = document.getElementById('pickupDetails');
    const form = document.querySelector('form');
    const pickupDate = document.getElementById('pickupDate');
    const pickupAddress = document.getElementById('pickupAddress');

    returnMethod.addEventListener('change', function () {
        if (this.value === 'pickup') {
            pickupDetails.classList.add('show');
        } else {
            pickupDetails.classList.remove('show');
        }
    });

    form.addEventListener('submit', function (e) {
        if (returnMethod.value === 'pickup') {
            if (!pickupDate.value.trim() || !pickupAddress.value.trim()) {
                alert("Please provide both pickup date and pickup address.");
                e.preventDefault();
            }
        }
    });

    const photoInput = document.getElementById('photo');
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
                    photoInput.parentNode.appendChild(preview);
                }
                preview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});

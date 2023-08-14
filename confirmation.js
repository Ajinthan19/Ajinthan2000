
    document.addEventListener("DOMContentLoaded", function () {
        const confirmationData = document.getElementById("confirmationData");
        const formData = JSON.parse(localStorage.getItem("formData"));

        if (formData) {
            const html = `
                <p><strong>Card Number:</strong> ${formData.cardNumber}</p>
                <p><strong>Expiry Date:</strong> ${formData.expiryDate}</p>
                <p><strong>Name on Card:</strong> ${formData.nameOnCard}</p>
            `;
            confirmationData.innerHTML = html;
        }
    });

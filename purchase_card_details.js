document.addEventListener('DOMContentLoaded', function () {
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvcInput = document.getElementById('cvc');
    const nameOnCardInput = document.getElementById('nameOnCard');
    const payButton = document.getElementById('payButton');
    const amountSpan = document.getElementById('amount');
  
    cardNumberInput.addEventListener('input', validateForm);
    expiryDateInput.addEventListener('input', validateForm);
    cvcInput.addEventListener('input', validateForm);
    nameOnCardInput.addEventListener('input', validateForm);
  
    function validateForm() {
      const cardNumber = cardNumberInput.value;
      const expiryDate = expiryDateInput.value;
      const cvc = cvcInput.value;
      const nameOnCard = nameOnCardInput.value;
  
      if (cardNumber.length === 16 && expiryDate.match(/^\d{2}\/\d{2}$/) && cvc.length === 3 && nameOnCard.length > 0) {
        payButton.disabled = false;
      } else {
        payButton.disabled = true;
      }
    }
  
    payButton.addEventListener('click', function () {
      const cardNumber = cardNumberInput.value;
      const expiryDate = expiryDateInput.value;
      const cvc = cvcInput.value;
      const nameOnCard = nameOnCardInput.value;
  
      if (cardNumber.length === 16 && expiryDate.match(/^\d{2}\/\d{2}$/) && cvc.length === 3 && nameOnCard.length > 0) {
        const paymentData = {
          cardNumber: cardNumber,
          expiryDate: expiryDate,
          cvc: cvc,
          nameOnCard: nameOnCard,
          amount: amountSpan.textContent
        };
  
        // This is just a placeholder for demonstration purposes
        // In a real application, you would send this data securely to a server for processing
        console.log('Payment data:', paymentData);
  
        // Redirect to confirmation page
        window.location.href = 'confirmation.html';
      }
    });
  });
  

  
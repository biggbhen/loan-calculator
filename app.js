// add eventListener to the submit button
document
  .getElementById('loan-form')
  .addEventListener('submit', calculateResults);

// calculate Results
function calculateResults(e) {
  const UIamount = document.getElementById('amount');
  const UIinterest = document.getElementById('interest');
  const UIyears = document.getElementById('years');
  const UImonthlyPayment = document.getElementById('monthly-payment');
  const UItotalPayment = document.getElementById('total-payment');
  const UItotalInterest = document.getElementById('total-interest');

  const principal = parseFloat(UIamount.value);

  const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(UIyears.value) * 12;
  // compute the monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    UImonthlyPayment.value = monthly.toFixed(2);
    UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
    UItotalInterest.value = (monthly * calculatedPayments - principal).toFixed(
      2
    );
  } else {
    showError('please check your numbers');
  }

  e.preventDefault();
}

function showError(error) {
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  // insert error div before the heading of loan calculator
  card.insertBefore(errorDiv, heading);
  // clear error after 2s
  setTimeout(clearError, 2500);
}
function clearError() {
  document.querySelector('.alert').remove();
}

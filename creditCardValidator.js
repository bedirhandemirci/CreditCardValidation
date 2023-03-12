function luhnCheck(value) {
  let sum = 0;
  let shouldDouble = false;
  for (let i = value.length - 1; i >= 0; i--) {
    let digit = parseInt(value.charAt(i));
    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export default function validateCreditCard(cardNumber, cardholderName, expirationDate, cvv) {
  if (!luhnCheck(cardNumber)) {
    return false;
  }

  if (!cardholderName || cardholderName.trim().length < 5) {
    return false;
  }

  const [expirationMonth, expirationYear] = expirationDate.split('/');
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  if (
    !expirationMonth ||
    !expirationYear ||
    parseInt(expirationMonth) < 1 ||
    parseInt(expirationMonth) > 12 ||
    parseInt(expirationYear) < currentYear ||
    (parseInt(expirationYear) === currentYear && parseInt(expirationMonth) < currentMonth)
  ) {
    return false;
  }

  if (!cvv || cvv.trim().length < 3 || cvv.trim().length > 4) {
    return false;
  }

  return true;
}


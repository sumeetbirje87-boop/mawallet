export function getCurrencySymbol(currency: string) {
  try {
    return (0).toLocaleString(undefined, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).replace(/\d/g, '').replace(/[.,]/g, '').trim();
  } catch (e) {
    return "$";
  }
}

export function formatCurrencyVal(amount: number, currency: string = "USD", includeFractions: boolean = true) {
  try {
    return new Intl.NumberFormat(undefined, { 
      style: 'currency', 
      currency,
      minimumFractionDigits: includeFractions ? 2 : 0,
      maximumFractionDigits: includeFractions ? 2 : 0
    }).format(amount);
  } catch(e) {
    return `$${amount.toLocaleString()}`;
  }
}

const CurrencyFormatter = ({ amount }) => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(amount);
};

export default CurrencyFormatter;

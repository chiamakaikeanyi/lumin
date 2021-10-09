/**
 * Compose a number of styles together easily
 * @param {String} styles Classes/styles to be applied
 * @returns {String} Combined classes
 */
export const composeClasses = (...styles) => {
  let classes = '';

  styles.forEach(arg => {
    if (arg) classes += `${arg} `;
  });

  return classes.trim();
};

/**
 * Format price to 2 decimal places
 * Look for a digit followed by 3 digits before a dot and insert a comma after it E.g. 7200.00 is formatted to 7,200.00
 * @param {Number} price
 * @returns {String} price
 */
export const formatPrice = price => {
  if (price === 0) return '0.00';
  return (
    price &&
    Number(price)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
  );
};

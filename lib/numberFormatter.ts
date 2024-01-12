export const numberFormatter = (number: number) => {
  if (isNaN(number)) {
    return "Invalid Number";
  }
  const numString = number.toString();
  const formattedNumber = numString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedNumber;
};

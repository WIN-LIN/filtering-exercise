export function addComma(num) {
  const strNum = num.toString();
  if (isNaN(strNum)) {
    return "NaN";
  }
  const parts = strNum.split(".");
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const floatPart = parts[1] || "";
  return floatPart ? `${intPart}.${floatPart}` : intPart;
}

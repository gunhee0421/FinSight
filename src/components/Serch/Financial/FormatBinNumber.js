import BigNumber from "bignumber.js";

export default function FormatBinNumber(number) {
  const word = ["", "만", "억", "조"];

  const text = number.toString();

  const cn1 = text.toString()
  .replace(/\B(?<!\.\d*)(?=(\d{4})+(?!\d))/g, ",");

  const len = (cn1.match(/,/g) || []).length;

  let index = cn1.indexOf(',');

  let result;
  if (index != -1) {
    const frontPart = cn1.slice(0, index);
    const backPart = cn1.slice(index + 1);
    
    result = `${frontPart}.${backPart.slice(0,2)}`; 
  } else {
    result = text;
  } 

  return `${result}${word[len]}`;
}

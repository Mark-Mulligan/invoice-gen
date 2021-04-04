export const formatMonthsArr = (arr) => {
  if (arr) {
    let result = '';
  arr.forEach((item, index) => {
    result += (index !== arr.length - 1) ? result += `${item}/` : item;
  });
  return result;
  } else {
    return '';
  }
}
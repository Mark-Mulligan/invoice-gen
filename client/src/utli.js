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

export const formatPDFTitle = (studentName, months) => {
  let formattedName = studentName.trim().split(' ').join('');
  let formattedDates = months.join('_');
  return `${formattedName}-${formattedDates}-invoice.pdf`;
}
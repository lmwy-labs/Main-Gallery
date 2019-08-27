const convertDate = (ISOdate, punc) => {
  const date = {
    m: Number(ISOdate.substring(5, 7)),
    d: Number(ISOdate.substring(8, 10)),
    y: Number(ISOdate.substring(0, 4)),
  };
  const { m, d, y } = date;
  let reformattedDate = '';
  if (m === 1) {
    reformattedDate += 'January';
  } else if (m === 2) {
    reformattedDate += 'February';
  } else if (m === 3) {
    reformattedDate += 'March';
  } else if (m === 4) {
    reformattedDate += 'April';
  } else if (m === 5) {
    reformattedDate += 'May';
  } else if (m === 6) {
    reformattedDate += 'June';
  } else if (m === 7) {
    reformattedDate += 'July';
  } else if (m === 8) {
    reformattedDate += 'August';
  } else if (m === 9) {
    reformattedDate += 'September';
  } else if (m === 10) {
    reformattedDate += 'October';
  } else if (m === 11) {
    reformattedDate += 'November';
  } else {
    reformattedDate += 'December';
  }

  return `${reformattedDate} ${d}${punc} ${y}`;
};

module.exports = convertDate;

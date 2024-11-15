import moment from "moment-jalaali";

const getNowPersianDate = () => {
  const date = moment();
  let year = date.jYear();
  let month = date.jMonth() + 1;
  let day = date.jDate();

  let strDate = year + "/";
  if (month < 10) strDate += "0" + month;
  else strDate += month;
  strDate += "/";

  if (day < 10) strDate += "0" + day;
  else strDate += day;
  return strDate;
};
const getPersianDate = (date) => {
  let year = date.jYear();
  let month = date.jMonth() + 1;
  let day = date.jDate();

  let strDate = year + "/";
  if (month < 10) strDate += "0" + month;
  else strDate += month;
  strDate += "/";

  if (day < 10) strDate += "0" + day;
  else strDate += day;
  return strDate;
};

export { getNowPersianDate, getPersianDate };

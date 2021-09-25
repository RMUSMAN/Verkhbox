import moment from "moment";

export const monthsOfYear = [
  { label: "January", value: "Jan" },
  { label: "February", value: "Feb" },

  { label: "March", value: "Mar" },
  { label: "April", value: "Apr" },
  { label: "May", value: "May" },
  { label: "June", value: "Jun" },
  { label: "July", value: "Jul" },
  { label: "August", value: "Aug" },
  { label: "September", value: "Sep" },
  { label: "October", value: "Oct" },
  { label: "November", value: "Nov" },
  { label: "December", value: "Dec" },
];
export function generateYearsList(start, end) {
  let years = [];
  for (let i = end; i >= start; i--) {
    years.push({ label: i, value: i });
  }
  return years;
}
export const convertMinsToHrsMins = (mins) => {
  let mins_num = parseFloat(mins, 10); // don't forget the second param
  let hours = Math.floor(mins_num / 60);
  let minutes = Math.floor(mins_num - (hours * 3600) / 60);
  let seconds = Math.floor(mins_num * 60 - hours * 3600 - minutes * 60);

  // Appends 0 when unit is less than 10
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};
export function calculateDifferenceBetweenDays(date1, date2) {
  let difference = date2.getTime() - date1.getTime();
  
  const minutes = Number(difference / (1000 * 60)).toFixed(2);

  return convertMinsToHrsMins(minutes);
}
export function calculateDifferenceBetweenTimes(time1, time2) {
  let startTime = moment(time1, "HH:mm:ss");

  let endTime = moment(time2, "HH:mm:ss");

  // calculate total duration
  let duration = moment.duration(endTime.diff(startTime));

  return duration.hours() + ":" + duration.minutes() + ":" + duration.seconds();
}
export function calculateMinsFromHms(hms) {
  
  let a = hms.split(":"); // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  let seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

  let minutes = seconds / 60;
  return +(Math.round(minutes + "e+2") + "e-2");
  
}

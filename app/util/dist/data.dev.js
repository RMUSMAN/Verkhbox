"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateYearsList = generateYearsList;
exports.calculateDifferenceBetweenDays = calculateDifferenceBetweenDays;
exports.calculateDifferenceBetweenTimes = calculateDifferenceBetweenTimes;
exports.monthsOfYear = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var monthsOfYear = [{
  label: "January",
  value: "Jan"
}, {
  label: "February",
  value: "Feb"
}, {
  label: "March",
  value: "Mar"
}, {
  label: "April",
  value: "Apr"
}, {
  label: "May",
  value: "May"
}, {
  label: "June",
  value: "Jun"
}, {
  label: "July",
  value: "Jul"
}, {
  label: "August",
  value: "Aug"
}, {
  label: "September",
  value: "Sep"
}, {
  label: "October",
  value: "Oct"
}, {
  label: "November",
  value: "Nov"
}, {
  label: "December",
  value: "Dec"
}];
exports.monthsOfYear = monthsOfYear;

function generateYearsList(start, end) {
  var years = [];

  for (var i = end; i >= start; i--) {
    years.push({
      label: i,
      value: i
    });
  }

  return years;
}

var convertMinsToHrsMins = function convertMinsToHrsMins(mins) {
  var h = Math.floor(mins / 60);
  var m = mins % 60;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  return "".concat(h, ":").concat(m);
};

function calculateDifferenceBetweenDays(date1, date2) {
  var difference = date2.getTime() - date1.getTime(); 

  var minutes = Number(difference / (1000 * 60)).toFixed(2);
  return convertMinsToHrsMins(minutes);
}

function calculateDifferenceBetweenTimes(time1, time2) {
  
  var startTime = (0, _moment["default"])(time1, "HH:mm:ss");
  var endTime = (0, _moment["default"])(time2, "HH:mm:ss"); // calculate total duration

  var duration = _moment["default"].duration(endTime.diff(startTime));

  
  return duration.hours() ? duration.hours() : "00" + ":" + duration.minutes() + ":" + duration.seconds();
}
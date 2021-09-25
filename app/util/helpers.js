import moment from "moment";

function addTimes(time1, time2) {
  let [hours1, minutes1, seconds1] = time1.split(":");
  let [hours2, minutes2, seconds2] = time2.split(":");
  return moment({ hours: hours1, minutes: minutes1, seconds: seconds1 })
    .add({ hours: hours2, minutes: minutes2, seconds: seconds2 })
    .format("hh:mm:ss");
}

export function addListOfTimes(timeList) {
  const sum = timeList.reduce(
    (acc, time) => acc.add(moment.duration(time)),
    moment.duration()
  );
  
  return [Math.floor(sum.asHours()), sum.minutes(),sum.seconds()].join(":");
}

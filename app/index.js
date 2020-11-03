import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { me as appbit } from "appbit";
import { display } from "display";

if (display.aodAvailable && appbit.permissions.granted("access_aod")) {
  // no other changes required for AOD, already updating once per minute
  display.aodAllowed = true;
}

// Update the clock every minute
clock.granularity = "minutes";


// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  const minute_display = document.getElementById("minute"),
        hour_display = document.getElementById("hour");
  minute_display.text = "", hour_display.text = "";
  let today = evt.date;
  let hour = today.getHours(),
      minute = today.getMinutes();

  // hour = 13, minute = 3;

  if (minute >= 33) {
    hour += 1;
  }
  
  let hour_label = ["TWELVE", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN"][hour % 12];
  if (hour == 0) {
    hour_label = "MIDNIGHT";
  } else if (hour == 12) {
    hour_label = "MIDDAY";
  } else if (hour < 12) {
    hour_label = hour_label + " AM";
  } else {
    hour_label = hour_label + " PM";
  }
  if (minute >= 58 || minute <= 2) { // xx:58 - xx:02
    let temp = hour_display;
    hour_display = minute_display;
  } else if (minute >= 3 && minute <= 7) { // xx:03 - xx:07
    minute_display.text = "FIVE PAST";
  } else if (minute >= 8 && minute <= 12) { // xx:08 - xx:12
    minute_display.text = "TEN PAST";
  } else if (minute >= 13 && minute <= 17) { // xx:13 - xx:17
    minute_display.text = "A QUARTER PAST";
  } else if (minute >= 18 && minute <= 22) { // xx:18 - xx:22
    minute_display.text = "TWENTY PAST";
  } else if (minute >= 23 && minute <= 27) { // xx:23 - xx:27
    minute_display.text = "TWENTY FIVE PAST";
  } else if (minute >= 28 && minute <= 32) { // xx:28 - xx:32
    minute_display.text = "HALF PAST";
  } else if (minute >= 33 && minute <= 37) { // xx:33 - xx:37
    minute_display.text = "TWENTY FIVE TO";
  } else if (minute >= 38 && minute <= 42) { // xx:38 - xx:42
    minute_display.text = "TWENTY TO";
  } else if (minute >= 43 && minute <= 47) { // xx:43 - xx:47
    minute_display.text = "A QUARTER TO";
  } else if (minute >= 48 && minute <= 52) { // xx:48 - xx:52
    minute_display.text = "TEN TO";
  } else if (minute >= 53 && minute <= 57) { // xx:53 - xx:57
    minute_display.text = "FIVE TO";
  }
  hour_display.text = hour_label;
}

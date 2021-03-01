import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import dayjs from "dayjs";

const styles = StyleSheet.create({});

export default function AccountsScreen() {
  return (
    <View>
      <Calendar
        // Initially visible month. Default = Date()
        current={dayjs().format("YYYY-MM-DD")}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate="2012-05-10"
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate="2012-05-30"
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat="MM yyyy"
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        // Show week numbers to the left. Default = false
        showWeekNumbers
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths
      />
      <View>
        <Text> Add new expense and income here </Text>
      </View>
    </View>
  );
}

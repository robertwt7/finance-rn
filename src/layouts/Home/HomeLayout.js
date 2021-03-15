import React, { useCallback, useState, useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import dayjs from "dayjs";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { moderateScale } from "../../helpers";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedDayText: {
    fontSize: moderateScale(20),
    marginVertical: 8,
    fontWeight: "500",
  },
  contentContainer: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 8,
    marginTop: 8,
  },
});

export default function HomeLayout() {
  const [markedDate, setMarkedDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const navigation = useNavigation();

  const handleClick = useCallback(
    (day) => {
      setMarkedDate({
        [day.dateString]: {
          selected: true,
          marked: true,
          selectedColor: "#3f51b5",
        },
      });

      // Use this later to set previous selected date as false when marking date in markedDate
      setSelectedDate(day.dateString);
    },
    [markedDate]
  );

  const handleIncomeCLick = useCallback(() => {
    navigation.push("IncomeOutcome");
  }, []);

  return (
    <View style={styles.container}>
      <Calendar
        // Initially visible month. Default = Date()
        current={dayjs().format("YYYY-MM-DD")}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={handleClick}
        markedDates={markedDate}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat="MMM yyyy"
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false

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
      <View style={styles.contentContainer}>
        <Text style={styles.selectedDayText}>
          {dayjs(selectedDate).format("DD MMM YYYY")}
        </Text>
        <Text>
          There is nothing here.. please add expense or income for selected day{" "}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Add Income/Outcome"
            style={{ padding: 8 }}
            onPress={handleIncomeCLick}
          />
        </View>
      </View>
    </View>
  );
}

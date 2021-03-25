import React, { useCallback, useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import dayjs from "dayjs";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { executeSQL } from "db/methods";
import * as lodash from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { actions as dateActions } from "store/ducks/date.duck";
import { moderateScale } from "../../helpers";
import TransactionList from "./TransactionList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedDayText: {
    fontSize: moderateScale(20),
    marginVertical: 8,
    fontWeight: "500",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    padding: 8,
  },
  buttonContainer: {
    padding: 8,
    marginTop: 8,
  },
  textCenter: {
    textAlign: "center",
    marginVertical: 8,
  },
});

export default function HomeLayout() {
  const [markedDate, setMarkedDate] = useState({});
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const dispatch = useDispatch();
  const { selectedDate } = useSelector((state) => state.date);

  const handleClick = useCallback(
    (day) => {
      setMarkedDate({
        ...markedDate,
        [selectedDate]: {
          ...markedDate[selectedDate],
          selected: false,
        },
        [day.dateString]: {
          ...markedDate[day.dateString],
          selected: true,
          selectedColor: "#3f51b5",
        },
      });

      // Use this later to set previous selected date as false when marking date in markedDate
      dispatch(dateActions.changeDate(day.dateString));

      setFilteredTransactions(
        transactions.filter((item) => item.date === day.dateString)
      );
    },
    [markedDate, selectedDate]
  );

  const handleIncomeCLick = () => {
    navigation.push("IncomeOutcome", { selectedDate });
  };

  useEffect(() => {
    const query =
      "SELECT t.*, c.name AS category_name FROM transactions t LEFT JOIN categories c ON t.category_id = c.id;";
    executeSQL(query, undefined, (_, { rows: { _array } }) => {
      // Set marked date
      // All same date data will be removed though
      const processedData = lodash.keyBy(_array, (item) => item.date);
      Object.keys(processedData).forEach((item) => {
        processedData[item] = {
          ...processedData[item],
          marked: true,
        };
      });
      setMarkedDate({
        ...markedDate,
        ...processedData,
      });

      // Set transactions
      setTransactions(_array);
    });
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
        {filteredTransactions.length > 0 ? (
          <View>
            <TransactionList
              data={transactions.filter((item) => item.date !== selectedDate)}
            />
          </View>
        ) : (
          <Text style={styles.textCenter}>
            There is nothing here.. please add expense or income for selected
            day
          </Text>
        )}

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

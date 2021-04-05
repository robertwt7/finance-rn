import React, { useCallback, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Calendar,
  useTheme,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { useIsFocused } from "@react-navigation/native";
import { executeSQL } from "db/methods";
import { useSelector, useDispatch } from "react-redux";
import { actions as dateActions } from "store/ducks/date.duck";
import { ThemedView } from "components";
import { actions as messageActions } from "store/ducks/message.duck";
import { Entypo } from "@expo/vector-icons";
import { formatDateToDbTime } from "helpers";
import { moderateScale } from "../../helpers";
import TransactionList from "./TransactionList";

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  selectedDayText: {
    fontSize: moderateScale(20),
    marginVertical: 8,
    fontWeight: "500",
    textAlign: "center",
  },
  flex1: {
    flex: 1,
  },
  backgroundBasic: {
    backgroundColor: "color-basic-100",
  },
  buttonContainer: {
    padding: 8,
    marginTop: 8,
  },
  textCenter: {
    textAlign: "center",
    marginVertical: 8,
  },
  textLg: {
    fontSize: 16,
  },
  text3xl: {
    fontSize: 28,
  },
  textSemibold: {
    fontWeight: "400",
  },
  m8: {
    margin: 8,
  },
  ml16: {
    marginLeft: 16,
  },
  w100: {
    width: "100%",
  },
  dayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
  },
  value: {
    fontSize: 12,
    fontWeight: "400",
  },
});

const DayCell = (transactions, theme) => ({ date }, style) => {
  const hasTransaction =
    transactions.filter((item) => item.date === formatDateToDbTime(date))
      .length > 0;
  return (
    <View style={[themedStyles.dayContainer, style.container]}>
      <Text style={style.text}>{`${date.getDate()}`}</Text>
      <Entypo
        name="dot-single"
        color={hasTransaction ? theme["color-success-500"] : "transparent"}
      />
    </View>
  );
};

export default function HomeLayout() {
  const styles = useStyleSheet(themedStyles);
  const [markedDate, setMarkedDate] = useState(new Date());
  const isFocused = useIsFocused();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const dispatch = useDispatch();
  const { selectedDate } = useSelector((state) => state.date);

  const theme = useTheme();

  const getTransactions = () => {
    const query =
      "SELECT t.*, c.name AS category_name FROM transactions t LEFT JOIN categories c ON t.category_id = c.id;";
    if (isFocused) {
      executeSQL(query, undefined, (_, { rows: { _array } }) => {
        // Set transactions
        setTransactions(_array);
      });
    }
  };

  useEffect(() => {
    getTransactions();
  }, [setTransactions, isFocused]);

  const handleDeleteItem = (id) => () => {
    const deleteQuery = "DELETE FROM transactions WHERE id = ?;";
    executeSQL(deleteQuery, [id], (_, { rowsAffected }) => {
      if (rowsAffected) {
        dispatch(messageActions.showMessage({ message: "Delete success" }));
        getTransactions();
      }
    });
  };

  const handleClick = useCallback(
    (nextDate) => {
      // Set marked date
      setMarkedDate(nextDate);

      // Format javascript date to YYYY-MM-DD
      const formattedDate = formatDateToDbTime(nextDate);
      // Use this later to set previous selected date as false when marking date in markedDate
      dispatch(dateActions.changeDate(formattedDate));

      setFilteredTransactions(
        transactions.filter((item) => item.date === formattedDate)
      );
    },
    [transactions]
  );

  return (
    <View style={styles.container}>
      <Calendar
        onSelect={handleClick}
        date={markedDate}
        renderDay={DayCell(transactions, theme)}
        style={[styles.w100, styles.backgroundBasic]}
      />
      <View style={styles.flex1}>
        {filteredTransactions.length > 0 ? (
          <ThemedView style={styles.flex1}>
            <Text
              style={[styles.text3xl, styles.textBold, styles.m8, styles.ml16]}
              status="basic"
            >
              Transactions
            </Text>
            <Text status="basic" style={[styles.ml16]}>
              {selectedDate}
            </Text>
            <ThemedView style={[styles.m8, styles.flex1]}>
              <TransactionList
                data={filteredTransactions}
                handleDeleteItem={handleDeleteItem}
              />
            </ThemedView>
          </ThemedView>
        ) : (
          <View style={{ height: "100%", justifyContent: "center" }}>
            <Text style={[styles.textCenter, styles.textLg]}>
              There is nothing here.. please add expense or income for selected
              day
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

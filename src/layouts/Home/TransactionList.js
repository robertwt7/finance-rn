import React from "react";
import { List, ListItem, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { AppleStyleSwipeableRow } from "components";
import { executeSQL } from "db/methods";
import { useDispatch } from "react-redux";
import { actions as messageActions } from "store/ducks/message.duck";
import { useNavigation } from "@react-navigation/native";

TransactionList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  handleDeleteItem: PropTypes.func,
};

const renderAmount = (income, amount) => () => (
  <Text category="s1">
    {income ? "+" : "-"}${amount}
  </Text>
);

export default function TransactionList({ data, handleDeleteItem }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderItemIcon = (income) => (props) => (
    <Ionicons
      name={income ? "caret-up-circle" : "caret-down-circle"}
      size={24}
      color={income ? "green" : "red"}
    />
  );

  const handleEdit = (id) => () => {
    const selectQuery = "SELECT * FROM transactions WHERE id = ?;";

    executeSQL(selectQuery, [id], (_, { rows: { _array } }) => {
      const result = _array[0];
      if (result) {
        navigation.navigate("IncomeOutcome", { income: result.income, result });
      }
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <AppleStyleSwipeableRow
        key={item.id}
        onDelete={handleDeleteItem(item.id)}
        onEdit={handleEdit(item.id)}
      >
        <ListItem
          title={`${item.name}`}
          description={`${item.category_name}`}
          accessoryLeft={renderItemIcon(item.income)}
          accessoryRight={renderAmount(item.income, item.amount)}
        />
      </AppleStyleSwipeableRow>
    );
  };

  console.log("Data received");
  console.log(data);

  return <List style={styles.container} data={data} renderItem={renderItem} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  w100: {
    width: "100%",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  flexRow: {
    flexDirection: "row",
  },
});

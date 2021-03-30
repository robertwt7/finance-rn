import React from "react";
import { Button, Icon, List, ListItem, Text } from "@ui-kitten/components";
import { StyleSheet, Pressable, View } from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { GmailStyleSwipeableRow } from "components";

TransactionList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

const renderAmount = (income, amount) => () => (
  <Text category="s1">
    {income ? "+" : "-"}${amount}
  </Text>
);

export default function TransactionList({ data }) {
  const renderItemIcon = (income) => (props) => (
    <Ionicons
      name={income ? "caret-up-circle" : "caret-down-circle"}
      size={24}
      color={income ? "green" : "red"}
    />
  );

  const renderItem = ({ item, index }) => (
    <GmailStyleSwipeableRow>
      <ListItem
        title={`${item.name}`}
        description={`${item.category_name}`}
        accessoryLeft={renderItemIcon(item.income)}
        accessoryRight={renderAmount(item.income, item.amount)}
      />
    </GmailStyleSwipeableRow>
  );

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

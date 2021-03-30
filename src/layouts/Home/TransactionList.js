import React from "react";
import { Button, Icon, List, ListItem } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";

TransactionList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default function TransactionList({ data }) {
  const renderItemIcon = (income) => (props) => (
    <Ionicons
      name={income ? "caret-up-circle" : "caret-down-circle"}
      size={24}
      color={income ? "green" : "red"}
    />
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.name} ${item.amount}`}
      description={`${item.category_name}`}
      accessoryLeft={renderItemIcon(item.income)}
    />
  );

  return <List style={styles.container} data={data} renderItem={renderItem} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./styles";

function Item({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

function MonthList({ budgetList }) {
  return (
    <FlatList
      data={budgetList}
      renderItem={({ item }) => <Item title={item.name} />}
      keyExtractor={(item) => item.index}
    />
  );
}

MonthList.propTypes = {
  budgetList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => {
  const { budgetList } = state.budget;
  return {
    budgetList,
  };
};

export default connect(mapStateToProps)(MonthList);

import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import styles from "./styles";

function Item({ title }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("BudgetDetail", {
          itemId: title.key,
        });
      }}
      style={styles.container}
      underlayColor="#DDDDDD"
    >
      <View>
        <Text style={styles.text}>{title.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

Item.propTypes = {
  title: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
};

function MonthList({ budgetList }) {
  return (
    <SwipeListView
      useFlatList
      data={budgetList}
      renderItem={(rowData) => <Item title={rowData.item} />}
      keyExtractor={(item) => item.index}
      renderHiddenItem={(rowData, rowMap) => (
        <View style={styles.rowBack}>
          <TouchableOpacity onPress={() => rowMap[rowData.item.key].closeRow()}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      )}
      leftOpenValue={75}
      rightOpenValue={-75}
      onRowOpen={(rowKey, rowMap) => {
        setTimeout(() => {
          rowMap[rowKey].closeRow();
        }, 2000);
      }}
    />
  );
}

MonthList.propTypes = {
  budgetList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => {
  const { budgetList } = state.budget;
  return {
    budgetList,
  };
};

export default connect(mapStateToProps)(MonthList);

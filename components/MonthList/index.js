import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./styles";

function MonthList({ budgetList }) {
  return (
    <>
      {budgetList.map((values, index) => (
        <View style={styles.container} key={index}>
          <Text style={styles.text}>{values}</Text>
        </View>
      ))}
    </>
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

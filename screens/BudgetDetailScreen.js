import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

function BudgetDetailScreen({ route, navigation }) {
  const { itemId } = route.params;

  return (
    <View>
      <Text> Hello this is budget:{itemId}!</Text>
    </View>
  );
}

BudgetDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.number),
  }).isRequired,
};

export default BudgetDetailScreen;

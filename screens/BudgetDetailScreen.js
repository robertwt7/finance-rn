import React from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Button } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

function BudgetDetailScreen({ route, navigation }) {
  const { itemId } = route.params;

  return (
    <View style={styles.container}>
      <Text> Hello this is budget:{itemId}!</Text>
      <Button title="Add Income" type="outline" />
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

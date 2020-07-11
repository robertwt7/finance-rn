import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Button, Card, ListItem, Icon } from "react-native-elements";
import Wallet from "../assets/images/undraw_wallet.svg";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

const users = [{ name: "Income1" }, { name: "Income2" }, { name: "Income3" }];

function BudgetDetailScreen({ route, navigation }) {
  const { itemId } = route.params;

  return (
    <View style={styles.container}>
      <View>
        <Wallet style={styles.image} />
      </View>
      <View>
        <Text> Hello this is budget:{itemId}!</Text>
      </View>
      <Card title="Outcome">
        {users.map((u, i) => {
          return (
            <View key={i} style={styles.user}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: require("../assets/images/icon.png") }}
              />
              <Text style={styles.name}>{u.name}</Text>
            </View>
          );
        })}
        <Button
          icon={<Icon name="thumbs-down" type="entypo" color="#ffffff" />}
          buttonStyle={{ borderRadius: 0, marginRight: 0, marginBottom: 0 }}
          title="Add Outcome"
        />
      </Card>
      <Card title="Income">
        {users.map((u, i) => {
          return (
            <View key={i} style={styles.user}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: require("../assets/images/icon.png") }}
              />
              <Text style={styles.name}>{u.name}</Text>
            </View>
          );
        })}
        <Button
          icon={<Icon name="thumbs-up" type="entypo" color="#ffffff" />}
          buttonStyle={{ borderRadius: 0, marginRight: 0, marginBottom: 0 }}
          title="Add Income"
        />
      </Card>
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

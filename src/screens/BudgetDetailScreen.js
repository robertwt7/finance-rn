import React from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { Button, Card, ListItem, Icon } from "react-native-elements";
import UndrawWallet from "assets/images/svg/undraw_wallet";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonStyle: {
    borderRadius: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 10,
  },
});

const users = [{ name: "Income1" }, { name: "Income2" }, { name: "Income3" }];

function BudgetDetailScreen({ route, navigation }) {
  const { itemId } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <UndrawWallet width={windowWidth * 0.3} height={windowHeight * 0.3} />
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
                source={{ uri: "../assets/images/icon.png" }}
              />
              <Text style={styles.name}>{u.name}</Text>
            </View>
          );
        })}
        <Button
          icon={<Icon name="thumbs-down" type="entypo" color="#ffffff" />}
          buttonStyle={styles.buttonStyle}
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
                source={{ uri: "../assets/images/icon.png" }}
              />
              <Text style={styles.name}>{u.name}</Text>
            </View>
          );
        })}
        <Button
          icon={<Icon name="thumbs-up" type="entypo" color="#ffffff" />}
          buttonStyle={styles.buttonStyle}
          title="Add Income"
        />
      </Card>
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

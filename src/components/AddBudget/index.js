import React, { useState } from "react";
import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { actions } from "../../store/ducks/budget.duck";

function AddBudget({ addBudget }) {
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const handleClick = () => {
    setName("");
    addBudget(name);
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.margin}>
          <Input
            style={styles.input}
            placeholder="Budget Name"
            onChangeText={(text) => {
              setName(text);
            }}
            value={name}
          />
        </View>
        <View style={styles.margin}>
          <Button
            title="Add Budget"
            onPress={handleClick}
            style={styles.button}
            type="clear"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

AddBudget.propTypes = {
  addBudget: PropTypes.func.isRequired,
};

export default connect(null, actions)(AddBudget);

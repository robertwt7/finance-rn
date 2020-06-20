import React, { useState } from "react";
import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { actions } from "../../store/ducks/budget.duck";

function IncomeOutcomeForm({ addFunction, type }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const navigation = useNavigation();
  const handleClick = () => {
    setName("");
    addFunction({ name, amount });
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.margin}>
          <Input
            style={styles.input}
            placeholder={`${type} Name`}
            onChangeText={(text) => {
              setName(text);
            }}
            value={name}
          />
        </View>
        <View style={styles.margin}>
          <Input
            style={styles.input}
            placeholder={`${type} Amount`}
            onChangeText={(text) => {
              setAmount(parseInt(text, 10));
            }}
            value={amount}
          />
        </View>
        <View style={styles.margin}>
          <Button
            title={`Add ${type}`}
            onPress={handleClick}
            style={styles.button}
            type="clear"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

IncomeOutcomeForm.propTypes = {
  addFunction: PropTypes.func,
  type: PropTypes.string,
};

export default connect(null, actions)(IncomeOutcomeForm);

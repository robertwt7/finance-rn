import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./styles";
import { actions } from "../../store/ducks/budget.duck";

function AddBudget({ addBudget }) {
  const [name, setName] = useState("");
  const handleClick = () => {
    setName("");
    addBudget(name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          placeholder="Add Budget Name"
          onChangeText={(text) => {
            setName(text);
          }}
          value={name}
        />
      </View>
      <View style={styles.viewButton}>
        <Button
          title="Add Budget"
          onPress={handleClick}
          style={styles.button}
        />
      </View>
    </View>
  );
}

AddBudget.propTypes = {
  addBudget: PropTypes.func.isRequired,
};

export default connect(null, actions)(AddBudget);

import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./styles";

function AddBudget({ addBudget }) {
  const [text, setText] = useState("");
  const handleClick = () => {
    addBudget(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          placeholder="Add Budget Name"
          onChange={(v) => {
            setText(v);
          }}
          defaultValue={text}
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
  addBudget: PropTypes.func,
};

const mapDispatchToProps = (state) => {
  return state.budget.actions;
};

export default connect(null, mapDispatchToProps)(AddBudget);

import React, { useState, useCallback } from "react";
import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { Formik, Form } from "formik";
import {
  validationTransaction,
  formValues,
} from "constants/forms/TransactionConst";
import { insertData } from "db/methods";
import { TextField, Switch } from "components/forms";
import styles from "./styles";
import { actions } from "../../store/ducks/budget.duck";

function IncomeOutcomeLayout({ addFunction, type }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [initial, setInitial] = useState(formValues);
  const navigation = useNavigation();

  const handleFormSubmit = useCallback((values) => {
    // Insert data here
    const query =
      "INSERT INTO transactions (name, income, amount, category_id) VALUES (?,?,?,?)";
    insertData(query, args);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Formik
        enableReinitialize
        onSubmit={handleFormSubmit}
        initialValues={initial}
        validationSchema={validationTransaction}
      >
        {({ isSubmitting, values, handleSubmit }) => (
          <Form>
            <View style={styles.container}>
              <View style={styles.margin}>
                <Switch
                  name="income"
                  label={values.income ? "Income" : "Expense"}
                />
              </View>
              <View style={styles.margin}>
                <TextField name="name" label="Name" />
              </View>
              <View style={styles.margin}>
                <TextField name="amount" label="Amount" />
              </View>
              <View style={styles.margin}>
                <Button
                  title={`Add `}
                  onPress={handleSubmit}
                  style={styles.button}
                  disabled={isSubmitting}
                  type="clear"
                />
              </View>
            </View>
          </Form>
        )}
      </Formik>
    </TouchableWithoutFeedback>
  );
}

IncomeOutcomeLayout.propTypes = {
  addFunction: PropTypes.func,
  type: PropTypes.string,
};

export default connect(null, actions)(IncomeOutcomeLayout);

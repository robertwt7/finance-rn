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
  const [initial, setInitial] = useState(formValues);
  const navigation = useNavigation();

  const handleFormSubmit = useCallback((values) => {
    // TODO: Set category later
    // Insert data here
    const query =
      "INSERT INTO transactions (name, income, amount, category_id) VALUES (?,?,?,?)";
    insertData(query, [values.name, values.income, values.amount, 0]);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Formik
          enableReinitialize
          onSubmit={handleFormSubmit}
          initialValues={initial}
          validationSchema={validationTransaction}
        >
          {({ isSubmitting, values, handleSubmit }) => (
            <>
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
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

IncomeOutcomeLayout.propTypes = {
  addFunction: PropTypes.func,
  type: PropTypes.string,
};

export default connect(null, actions)(IncomeOutcomeLayout);

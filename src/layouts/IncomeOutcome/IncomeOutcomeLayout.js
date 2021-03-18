import React, { useState, useCallback } from "react";
import { Text, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik, Form } from "formik";
import {
  validationTransaction,
  formValues,
} from "constants/forms/TransactionConst";
import { insertData } from "db/methods";
import { TextField, Switch } from "components/forms";
import { actions as messageActions } from "store/ducks/message.duck";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@ui-kitten/components";
import styles from "./styles";

function IncomeOutcomeLayout(props) {
  const [initial, setInitial] = useState(formValues);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  console.log(route.params.selectedDate);

  const handleFormSubmit = (values) => {
    // TODO: Set category later
    // Insert data here
    const query =
      "INSERT INTO transactions (name, income, amount, category_id, date) VALUES (?,?,?,?)";
    insertData(
      query,
      [values.name, values.income, values.amount, 0, route.params.selectedDate],
      (_, { rowsAffected }) => {
        if (rowsAffected) {
          dispatch(
            messageActions.showMessage({ message: "Transaction inserted" })
          );
          setTimeout(() => navigation.goBack(), 1000);
        }
      }
    );
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Formik
            enableReinitialize
            onSubmit={handleFormSubmit}
            initialValues={initial}
            validationSchema={validationTransaction}
          >
            {({ isSubmitting, values, handleSubmit }) => (
              <>
                <View style={styles.my8}>
                  <Text style={styles.selectedDayText}>
                    Date: {route.params.selectedDate}
                  </Text>
                </View>

                <View style={styles.margin}>
                  <TextField name="name" label="Name" />
                </View>
                <View style={styles.margin}>
                  <TextField name="amount" label="Amount" />
                </View>
                <View style={styles.margin}>
                  <Switch
                    name="income"
                    label={values.income ? "Income" : "Expense"}
                  />
                </View>
                <View style={styles.margin}>
                  <Button onPress={handleSubmit} disabled={isSubmitting}>
                    Add
                  </Button>
                </View>
              </>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

export default IncomeOutcomeLayout;

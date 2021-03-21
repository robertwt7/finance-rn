import React, { useState, useEffect } from "react";
import { Text, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import {
  validationTransaction,
  formValues,
} from "constants/forms/TransactionConst";
import { executeSQL } from "db/methods";
import { TextField, Switch, Select } from "components/forms";
import { actions as messageActions } from "store/ducks/message.duck";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@ui-kitten/components";
import styles from "./styles";

function IncomeOutcomeLayout(props) {
  const [initial, setInitial] = useState(formValues);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const handleAddCategory = () => {
    navigation.push("CategoryForm");
  };

  const handleFormSubmit = (values) => {
    // TODO: Set category later
    // Insert data here
    const query =
      "INSERT INTO transactions (name, income, amount, category_id, date) VALUES (?,?,?,?,?)";
    executeSQL(
      query,
      [
        values.name,
        values.income,
        values.amount,
        values.category,
        route.params.selectedDate,
      ],
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

  useEffect(() => {
    const query = "SELECT * from categories;";
    executeSQL(query, undefined, (_, { rows: { _array } }) => {
      setCategories(_array);
    });
  }, []);

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
                  <Select name="category" label="Category" data={categories} />
                </View>
                <View style={styles.margin}>
                  <Button onPress={handleAddCategory}>Add Category</Button>
                </View>
                <View style={styles.margin}>
                  <Switch
                    name="income"
                    label={values.income ? "Income" : "Expense"}
                  />
                </View>
                <View style={styles.margin}>
                  <Button onPress={handleSubmit} disabled={isSubmitting}>
                    Submit
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

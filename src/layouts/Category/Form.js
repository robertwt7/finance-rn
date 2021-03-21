import React, { useState, useCallback } from "react";
import { Text, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import {
  validationTransaction,
  formValues,
} from "constants/forms/TransactionConst";
import { executeSQL } from "db/methods";
import { TextField } from "components/forms";
import { actions as messageActions } from "store/ducks/message.duck";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@ui-kitten/components";
import styles from "./styles";

function IncomeOutcomeLayout(props) {
  const [initial, setInitial] = useState(formValues);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleFormSubmit = (values) => {
    const query = "INSERT INTO categories (name) VALUES (?)";
    executeSQL(query, [values.name], (_, { rowsAffected }) => {
      if (rowsAffected) {
        dispatch(messageActions.showMessage({ message: "Categories created" }));
        setTimeout(() => navigation.goBack(), 1000);
      }
    });
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
            {({ isSubmitting, handleSubmit }) => (
              <>
                <View style={styles.margin}>
                  <TextField name="name" label="Name" />
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

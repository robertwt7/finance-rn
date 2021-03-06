import React, { useState, useEffect } from "react";
import { Text, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { Formik } from "formik";
import {
  validationTransaction,
  formValues,
} from "constants/forms/TransactionConst";
import { executeSQL } from "db/methods";
import {
  TextField,
  Switch,
  Select as FormikSelect,
  DatePicker,
} from "components/forms";
import { actions as messageActions } from "store/ducks/message.duck";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Select, SelectItem, IndexPath } from "@ui-kitten/components";
import dayjs from "dayjs";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";

const repeatOption = [
  { id: 0, name: "Never" },
  { id: 1, name: "Every Day" },
  { id: 2, name: "Every Week" },
  { id: 3, name: "Every Fortnight" },
  { id: 4, name: "Every Month" },
  { id: 5, name: "Every Year" },
];

function IncomeOutcomeLayout(props) {
  const route = useRoute();
  const { selectedDate } = useSelector((state) => state.date);
  const [initial, setInitial] = useState({
    ...formValues,
    date: dayjs(selectedDate),
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const handleAddCategory = () => {
    navigation.push("CategoryForm");
  };
  const isFocused = useIsFocused();
  const [ready, setReady] = useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(1));
  const [displayValue, setDisplayValue] = useState(repeatOption[0].name);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    setDisplayValue(repeatOption[index.row].name);
  };

  useEffect(() => {
    if (route.params && route.params.result) {
      setInitial({
        ...route.params.result,
        categoryId: route.params.result.category_id,
      });
      setReady(true);
    }
  }, [route]);

  useEffect(() => {
    const query = "SELECT * from categories;";
    executeSQL(query, undefined, (_, { rows: { _array } }) => {
      setCategories(_array);
    });

    setReady(true);
  }, [isFocused]);

  const handleFormSubmit = (values) => {
    const isUpdate = route.params && route.params.result;
    let submitQuery =
      "INSERT INTO transactions (name, income, amount, category_id, date) VALUES (?,?,?,?,?);";
    if (isUpdate) {
      submitQuery = `UPDATE transactions SET name = ?, income = ?, amount = ?, category_id = ?, date = ? WHERE id = ${route.params.result.id};`;
    }

    executeSQL(
      submitQuery,
      [
        values.name,
        route.params.income,
        values.amount,
        values.categoryId,
        dayjs(values.date).format("YYYY-MM-DD"),
      ],
      (_, { rowsAffected }) => {
        if (rowsAffected) {
          dispatch(
            messageActions.showMessage({
              message: isUpdate ? "Transaction updated" : "Transaction created",
            })
          );
          setTimeout(() => navigation.goBack(), 1000);
        }
      }
    );
  };

  return (
    ready && (
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
                    <DatePicker name="date" label="Date" />
                  </View>
                  <View style={styles.my8}>
                    <TextField name="name" label="Name" />
                  </View>
                  <View style={styles.my8}>
                    <TextField
                      name="amount"
                      label="Amount"
                      accessoryLeft={() => (
                        <FontAwesome5 name="dollar-sign" size={12} />
                      )}
                    />
                  </View>
                  <View style={styles.my8}>
                    <FormikSelect
                      name="categoryId"
                      label="Category"
                      data={categories}
                    />
                  </View>
                  <View style={styles.my8}>
                    <Button onPress={handleAddCategory} appearance="outline">
                      Add New Category
                    </Button>
                  </View>
                  <View style={styles.my8}>
                    <Select
                      selectedIndex={selectedIndex}
                      onSelect={handleSelect}
                      value={displayValue}
                      label="Repeat"
                    >
                      {repeatOption.map((item) => (
                        <SelectItem title={item.name} key={item.id} />
                      ))}
                    </Select>
                  </View>
                  {selectedIndex.row !== 0 && (
                    <View style={styles.my8}>
                      <DatePicker
                        name="endRepeatDate"
                        label="End Repeat Date"
                      />
                    </View>
                  )}
                  <View style={styles.my8}>
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
    )
  );
}

export default IncomeOutcomeLayout;

import React from "react";
import { Calendar, Text } from "@ui-kitten/components";
import { useFormikContext, useField } from "formik";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { moderateScale } from "helpers";

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(16),
    fontWeight: "400",
  },
});

const FormikCalendar = ({ name, label }) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField(name);

  const handleSelect = (nextDate) => {
    setFieldValue(name, nextDate);
    setFieldTouched(name, true);
  };

  return (
    field.value && (
      <>
        <Text style={styles.title}>{label}</Text>
        <Text style={styles.title}>
          Selected date: {dayjs(field.value).format("DD MMM YYYY")}
        </Text>

        <Calendar date={new Date(field.value)} onSelect={handleSelect} />
      </>
    )
  );
};

FormikCalendar.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

export default FormikCalendar;

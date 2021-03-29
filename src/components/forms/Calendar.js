import React, { useState } from "react";
import { Calendar, Button, Text, Popover } from "@ui-kitten/components";
import { Pressable, StyleSheet } from "react-native";
import { useFormikContext, useField } from "formik";
import dayjs from "dayjs";
import PropTypes from "prop-types";

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
  const [visible, setVisible] = useState(false);

  const handleSelect = (nextDate) => {
    setFieldValue(name, nextDate);
    setFieldTouched(name, true);
  };

  const renderToggleCalendar = () => (
    <Pressable
      onPress={() => setVisible(true)}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgba(63, 81, 181, 0.08)" : "transparent",
          paddingVertical: 8,
        },
      ]}
    >
      <Text style={styles.title}>
        {label}: {dayjs(field.value).format("DD MMM YYYY")}
      </Text>
    </Pressable>
  );

  return (
    field.value && (
      <>
        <Popover
          anchor={renderToggleCalendar}
          visible={visible}
          placement="bottom"
          onBackdropPress={() => setVisible(false)}
        >
          <Calendar date={new Date(field.value)} onSelect={handleSelect} />
        </Popover>
      </>
    )
  );
};

FormikCalendar.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

export default FormikCalendar;

import React from "react";
import { Calendar, Text } from "@ui-kitten/components";
import { useFormikContext, useField } from "formik";
import dayjs from "dayjs";
import PropTypes from "prop-types";

FormikCalendar.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const FormikCalendar = ({ name, label }) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField(name);

  const handleSelect = (nextDate) => {
    setFieldValue(name, nextDate);
    setFieldTouched(name, true);
  };

  return (
    <>
      <Text category="h5">{label}</Text>
      <Text category="h6">
        Selected date: {dayjs(field.value).format("DD MMM YYYY")}
      </Text>

      <Calendar date={field.value} onSelect={handleSelect} />
    </>
  );
};

export default FormikCalendar;

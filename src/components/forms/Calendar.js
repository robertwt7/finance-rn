import React from "react";
import { Calendar, Text } from "@ui-kitten/components";
import { useFormikContext } from "formik";

const FormikCalendar = ({ name, label }) => {
  const [date, setDate] = React.useState(new Date());
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const handleSelect = (nextDate) => {
    setDate(nextDate);
    setFieldValue(name, nextDate);
    setFieldTouched(name, true);
  };

  return (
    <>
      <Text category="h5">{label}</Text>
      <Text category="h6">Selected date: {date.toLocaleDateString()}</Text>

      <Calendar date={date} onSelect={handleSelect} />
    </>
  );
};

export default FormikCalendar;

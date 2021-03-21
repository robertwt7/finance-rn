import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

FormikSelect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
};

export default function FormikSelect({ data, name }) {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [displayValue, setDisplayValue] = useState("");
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const handleSelect = (index) => {
    setSelectedIndex(index);
    setFieldTouched(name, true);
    setFieldValue(name, data[index.row].id);
    setDisplayValue(data[index.row].name);
  };

  return (
    <Select
      selectedIndex={selectedIndex}
      onSelect={handleSelect}
      value={displayValue}
      size="medium"
    >
      {data.map((item) => (
        <SelectItem title={item.name} key={item.id} />
      ))}
    </Select>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
});

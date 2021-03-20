import React from "react";
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

  const { setFieldValue, setFieldTouched } = useFormikContext();

  const handleSelect = (index) => {
    setSelectedIndex(index);
    setFieldTouched(name, true);
    setFieldValue(name, data[selectedIndex.row].id);
  };

  return (
    <Layout style={styles.container} level="1">
      <Select
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
        value={data[selectedIndex.row].name}
      >
        {data.map((item) => (
          <SelectItem title={item.name} key={item.id} />
        ))}
      </Select>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
});

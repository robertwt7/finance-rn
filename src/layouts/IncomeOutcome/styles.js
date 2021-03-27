import { StyleSheet } from "react-native";

import { moderateScale } from "../../helpers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    fontSize: 20,
  },
  input: {
    height: 20,
    paddingLeft: 15,
    textAlign: "center",
  },
  my8: {
    marginVertical: 8,
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: "400",
  },
  selectedDayText: {
    fontSize: moderateScale(16),
    fontWeight: "400",
  },
});

export default styles;

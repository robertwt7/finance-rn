import { StyleSheet } from "react-native";

import { moderateScale } from "../../helpers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    fontSize: 20,
    marginBottom: 1,
  },
  margin: {
    alignSelf: "stretch",
    marginTop: 8,
    marginBottom: 8,
  },
  my8: {
    marginVertical: 8,
  },
  selectedDayText: {
    fontSize: moderateScale(16),
    fontWeight: "500",
  },
});

export default styles;

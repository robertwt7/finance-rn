import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 20,
  },
  button: {
    textAlign: "right",
  },
  input: {
    height: 20,
    paddingLeft: 10,
  },
  viewInput: { flex: 4 },
  viewButton: { flex: 2 },
});

export default styles;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 20,
    marginBottom: 1,
    height: 40,
  },
  button: {
    textAlign: "right",
  },
  input: {
    height: 20,
    paddingLeft: 15,
  },
  viewInput: { flex: 4 },
  viewButton: { flex: 2 },
});

export default styles;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  rowFront: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCC",
    height: 50,
  },

  text: {
    textAlign: "center",
    padding: 1,
    fontSize: 20,
  },
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 15,
    height: 50,
    backgroundColor: "red",
    paddingRight: 8,
  },
  deleteText: {
    color: "white",
    fontSize: 20,
  },
});

export default styles;

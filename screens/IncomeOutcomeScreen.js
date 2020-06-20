import React from "react";
import { IncomeOutcomeForm } from "../components";

function IncomeOutcomeScreen({ route, navigation }) {
  const { addFunction, type } = route.params;

  return <IncomeOutcomeForm addFunction={addFunction} type={type} />;
}

export default IncomeOutcomeScreen;

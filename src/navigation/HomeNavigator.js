import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import IncomeOutcomeScreen from "../screens/IncomeOutcomeScreen";

const HomeStack = createStackNavigator();

export default function Routes() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="IncomeOutcome"
        component={IncomeOutcomeScreen}
        options={{ title: "Form" }}
      />
    </HomeStack.Navigator>
  );
}

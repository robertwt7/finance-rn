import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import IncomeOutcomeScreen from "../screens/IncomeOutcomeScreen";
import { CategoryFormScreen, CategoryListSCreen } from "../screens/Category";

const HomeStack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="IncomeOutcome"
        component={IncomeOutcomeScreen}
        options={{ title: "Income Outcome Form" }}
      />
      <HomeStack.Screen
        name="CategoryList"
        component={CategoryFormScreen}
        options={{ title: "Category List" }}
      />
      <HomeStack.Screen
        name="CategoryForm"
        component={CategoryListSCreen}
        options={{ title: "Category Form" }}
      />
    </HomeStack.Navigator>
  );
}

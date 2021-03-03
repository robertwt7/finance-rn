import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { TabBarIcon } from "../components";
import BudgetScreen from "../screens/BudgetScreen";
import LinksScreen from "../screens/LinksScreen";
import HomeScreen from "../screens/HomeScreen";
import { moderateScale } from "../helpers";
import Colors from "../constants/Colors";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
    headerRight: getRightHeaderOptions(route),
  });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name="account-balance-wallet"
              ionIcons={false}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Budgets"
        component={BudgetScreen}
        options={{
          title: "Budgets",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name="account-balance"
              ionIcons={false}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: "Resources",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" ionIcons />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Dashboard";
    case "Budgets":
      return "Budgets";
    case "Bills":
      return "Bills";
    case "Links":
      return "Links to learn more";
    default:
      return "Page";
  }
}

function getRightHeaderOptions(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return () => (
        <Button
          type="outlined"
          containerStyle={{ padding: 8 }}
          icon={
            <MaterialCommunityIcons
              name="plus"
              size={moderateScale(8)}
              color={Colors.secondary}
            />
          }
        />
      );
    default:
      return undefined;
  }
}

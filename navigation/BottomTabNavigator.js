import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import {TabBarIcon} from "../components";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import AccountsScreen from "../screens/AccountsScreen";
import BillScreen from "../screens/BillScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
	// Set the header title on the parent stack navigator depending on the
	// currently active tab. Learn more in the documentation:
	// https://reactnavigation.org/docs/en/screen-options-resolution.html
	navigation.setOptions({ headerTitle: getHeaderTitle(route) });

	return (
		<BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
			<BottomTab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: "Budgets",
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
				name="Accounts"
				component={AccountsScreen}
				options={{
					title: "Accounts",
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
				name="Bills"
				component={BillScreen}
				options={{
					title: "Bills",
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} name="attach-money" ionIcon={false} />
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
			return "Monthly Budget";
		case "Accounts":
			return "Accounts List";
		case "Bills":
			return "Bills";
		case "Links":
			return "Links to learn more";
	}
}

import React, { useCallback, useState, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native";
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
  useTheme,
  MenuItem,
  OverflowMenu,
} from "@ui-kitten/components";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { HomeLayout } from "../layouts/Home";

export default function AccountsScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const MenuIcon = (props) => (
    <MaterialIcons
      name="add"
      size={24}
      color={theme["color-primary-default"]}
    />
  );

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleAdd = (income) => () => {
    setMenuVisible(false);
    navigation.navigate("IncomeOutcome", { income });
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <OverflowMenu
      anchor={renderMenuAction}
      visible={menuVisible}
      onBackdropPress={toggleMenu}
    >
      <MenuItem title="Add Income" onPress={handleAdd(1)} />
      <MenuItem title="Add Outcome" onPress={handleAdd(0)} />
    </OverflowMenu>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Home"
        alignment="center"
        accessoryRight={renderRightActions}
      />
      <Divider />
      <HomeLayout />
    </SafeAreaView>
  );
}

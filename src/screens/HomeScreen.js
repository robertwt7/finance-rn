import React, { useCallback, useState, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native";
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from "@ui-kitten/components";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { HomeLayout } from "../layouts/Home";

export default function AccountsScreen() {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleAdd = () => {
    navigation.navigate("IncomeOutcome");
  };
  const renderRightActions = () => (
    <TopNavigationAction
      icon={() => (
        <MaterialIcons
          name="add"
          size={24}
          color={theme["color-primary-default"]}
        />
      )}
      onPress={handleAdd}
    />
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

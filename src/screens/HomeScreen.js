import React, { useCallback, useState, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";
import { HomeLayout } from "../layouts/Home";

export default function AccountsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="MyApp" alignment="center" />
      <Divider />
      <HomeLayout />
    </SafeAreaView>
  );
}

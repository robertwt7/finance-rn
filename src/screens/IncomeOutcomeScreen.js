import React from "react";
import { SafeAreaView } from "react-native";
import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IncomeOutcomeLayout } from "../layouts/IncomeOutcome";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function IncomeOutcomeScreen() {
  const navigation = useNavigation();
  const navigateBack = () => {
    navigation.goBack();
  };
  const route = useRoute();

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={`${route.params.income ? "Income" : "Outcome"} Form`}
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <IncomeOutcomeLayout />
    </SafeAreaView>
  );
}

export default IncomeOutcomeScreen;

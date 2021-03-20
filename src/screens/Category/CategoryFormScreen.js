import React from "react";
import { SafeAreaView } from "react-native";
import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import CategoryFormLayout from "../../layouts/Category/Form";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function CategoryFormScreen() {
  const navigation = useNavigation();
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Category Form"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <CategoryFormLayout />
    </SafeAreaView>
  );
}

export default CategoryFormScreen;

import React from "react";
import { SafeAreaView } from "react-native";
import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import CategoryListLayout from "../../layouts/Category/List";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function CategoryListSCreen() {
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
        title="Category List"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <CategoryListLayout />
    </SafeAreaView>
  );
}

export default CategoryListSCreen;

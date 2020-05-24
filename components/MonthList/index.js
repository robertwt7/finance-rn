import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import styles from "./styles";

function Item({ title, rowTranslate }) {
  const navigation = useNavigation();
  const [height, setHeight] = useState({});
  useEffect(() => {
    if (rowTranslate) {
      setHeight(
        rowTranslate.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 50],
        })
      );
    }
  }, [rowTranslate]);
  return (
    <Animated.View
      styles={[
        styles.container,
        {
          height,
        },
      ]}
    >
      <TouchableHighlight
        onPress={() => {
          navigation.push("BudgetDetail", {
            itemId: title.key,
          });
        }}
        style={styles.container}
        underlayColor="#AAA"
      >
        <View>
          <Text style={styles.text}>{title.name}</Text>
        </View>
      </TouchableHighlight>
    </Animated.View>
  );
}

Item.propTypes = {
  title: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  rowTranslate: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.func])
  ).isRequired,
};

function MonthList({ budgetList }) {
  const [rowTranslateAnimatedValues] = useState({});

  useEffect(() => {
    budgetList.forEach((_) => {
      console.log(_);
      rowTranslateAnimatedValues[_.key] = new Animated.Value(1);
    });
  }, [budgetList]);

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value < -Dimensions.get("window").width && !this.animationIsRunning) {
      this.animationIsRunning = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
      }).start(() => {
        const newData = [...listData];
        const prevIndex = listData.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        setListData(newData);
        this.animationIsRunning = false;
      });
    }
  };

  const renderHiddenItem = (rowData, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity onPress={() => rowMap[rowData.item.key].closeRow()}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SwipeListView
      useFlatList
      disableRightSwipe
      data={budgetList}
      renderItem={(rowData) => (
        <Item
          title={rowData.item}
          rowTranslate={rowTranslateAnimatedValues[rowData.item.key]}
        />
      )}
      keyExtractor={(item) => item.index}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-75}
      onSwipeValueChange={onSwipeValueChange}
    />
  );
}

MonthList.propTypes = {
  budgetList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => {
  const { budgetList } = state.budget;
  return {
    budgetList,
  };
};

export default connect(mapStateToProps)(MonthList);

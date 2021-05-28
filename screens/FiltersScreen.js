import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import CustomHeaderButton from "../component/CustomHeaderButton";
import { setFilters } from "../store/actions/meals";

const Filters = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch value={props.state} onValueChange={props.Value} />
    </View>
  );
};

const FiltersScreen = (props) => {
  const { navigation } = props;
  const [isGlutenFree, setisGlutenFree] = useState(false);
  const [isLactoseFree, setisLactoseFree] = useState(false);
  const [isVegan, setisVegan] = useState(false);
  const [isVeg, setisVeg] = useState(false);
  const dispatch = useDispatch();

  const savedFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      veg: isVeg,
    };
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVeg, dispatch]);

  useEffect(() => {
    navigation.setParams({ save: savedFilters });
  }, [savedFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Filter Available!</Text>
      <Filters
        label="Gluten-Free"
        state={isGlutenFree}
        Value={(newValue) => setisGlutenFree(newValue)}
      />
      <Filters
        label="Lactose-Free"
        state={isLactoseFree}
        Value={(newValue) => setisLactoseFree(newValue)}
      />
      <Filters
        label="Vegan"
        state={isVegan}
        Value={(newValue) => setisVegan(newValue)}
      />
      <Filters
        label="Veg"
        state={isVeg}
        Value={(newValue) => setisVeg(newValue)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
  },
});

FiltersScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Filter Meals",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navigationData.navigation.getParam("save")}
        />
      </HeaderButtons>
    ),
  };
};

export default FiltersScreen;

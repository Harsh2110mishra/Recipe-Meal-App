import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavouritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

import Colors from "../constant/Colors";

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      path: "mealapp",
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
      path: "/:categoryId",
    },
    MealDetail: {
      screen: MealDetailScreen,
      path: "/:categoryId/:mealId",
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      headerTintColor: "white",
    },
  }
);

const filterNavigator = createStackNavigator(
  {
    MealsFav: FiltersScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      headerTintColor: "white",
    },
  }
);

const favNavigator = createStackNavigator(
  {
    Favourite: FavouritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      headerTintColor: "white",
    },
  }
);

const mealsTabNavigator = createBottomTabNavigator(
  {
    Meals: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-restaurant"
              size={28}
              style={{ marginTop: 12 }}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Favourite: {
      screen: favNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-star" size={28} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.primaryColor,
      inactiveTintColor: "black",
    },
  }
);

const mainSideDrawer = createDrawerNavigator({
  Meals: mealsTabNavigator,
  Filter: filterNavigator,
});

const prefix = Linking.makeUrl("/");

const MainApp = () => <MealsNavigator uriPrefix={prefix} />;

export default createAppContainer(MealsNavigator);

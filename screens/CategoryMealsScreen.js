import React from "react";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../Data/Dummy-Data";
import MealListData from "../component/mealListData";

const CategoryMealScreen = (props) => {
  const catId = props.navigation.getParam("categoryId");
  const availableMeals = useSelector((state) => state.meals.filteredMeals);
  const DisplayedMeal = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  return (
    <MealListData
      listData={DisplayedMeal}
      catId={catId}
      navigation={props.navigation}
    />
  );
};
CategoryMealScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMealScreen;

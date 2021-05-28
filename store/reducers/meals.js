import { MEALS } from "../../Data/Dummy-Data";
import { TOGGLE_FAVOURITE, SET_FILTERS } from "../actions/meals.js";
import MealDetailScreen from "../../screens/MealDetailScreen";

const intialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  FavouriteMeals: [],
};

const mealsReducer = (state = intialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      const existingIndex = state.FavouriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.FavouriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, FavouriteMeals: updatedFavMeals };
      } else {
        const meals = state.meals.find((meal) => meal.id === action.mealId);
        return { ...state, FavouriteMeals: state.FavouriteMeals.concat(meals) };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter((meals) => {
        if (appliedFilters.glutenFree && !meals.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meals.isLactoseFree) {
          return false;
        }
        if (appliedFilters.veg && !meals.isVeg) {
          return false;
        }
        if (appliedFilters.vegan && !meals.isVegan) {
          return false;
        }
        return true;
      });
      return { ...state, filteredMeals: updatedFilteredMeals };

    default:
      return state;
  }
};

export default mealsReducer;

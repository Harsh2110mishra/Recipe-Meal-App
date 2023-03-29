import React, { useEffect, useCallback } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../component/CustomHeaderButton";
import ListItemDetail from "../component/ListItemDetail";
import { toggleFavourite } from "../store/actions/meals";

const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam("mealId");
  const catId = props.navigation.getParam("catId");

  const isMealFav = useSelector((state) => state.meals.FavouriteMeals).some(
    (meal) => meal.id === mealId
  );
  const availableMeals = useSelector((state) => state.meals.meals);
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();
  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavouriteHandler });
  }, [toggleFavouriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: isMealFav });
  }, [isMealFav]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.detail}>
        <Text>{selectedMeal.duration}</Text>
        <Text>{selectedMeal.complexity.toUpperCase()}</Text>
        <Text>{selectedMeal.affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredients) => (
        <ListItemDetail key={ingredients}>{ingredients}</ListItemDetail>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((steps) => (
        <ListItemDetail key={steps}>{steps}</ListItemDetail>
      ))}
      <Text
        style={{
          fontSize: 12,
          color: "black",
          fontWeight: "bold",
          marginHorizontal: 50,
        }}
      >
        Long press the text to copy.
      </Text>
      <View
        style={{
          backgroundColor: "lightgrey",
          marginHorizontal: 50,
          borderRadius: 20,
          marginVertical: 10,
          marginBottom: 100,
        }}
      >
        <Text
          selectable
          style={{
            backgroundColor: "lightgrey",
            textAlign: "center",
            marginTop: 3,
            marginLeft: 15,
            marginBottom: 3,
            marginRight: 10,
          }}
        >
          {`exp:/192.168.0.105:19000/--/mealapp/${catId}/${mealId}`}
        </Text>
      </View>
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFavourite = navigationData.navigation.getParam("toggleFav");
  const isFavouriteMeal = navigationData.navigation.getParam("isFav");
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Fav"
          iconName={isFavouriteMeal ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavourite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  detail: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
});

export default MealDetailScreen;

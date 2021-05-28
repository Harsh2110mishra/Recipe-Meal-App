import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from "react-native";

const CategoryGrid = (props) => {
  return (
    <TouchableOpacity style={styles.gridItems} onPress={props.onSelect}>
      <View>
        <ImageBackground
          source={props.imgUrl}
          style={styles.imgStyle}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.imgStyle}>
            <Text style={styles.Title}>{props.title}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridItems: {
    flex: 1,
    margin: 15,
    height: 150,
  },
  imgStyle: {
    width: "100%",
    height: "100%",
  },
  Title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    color: "white",
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default CategoryGrid;

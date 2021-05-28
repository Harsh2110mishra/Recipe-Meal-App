import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ListItemDetail = (props) => {
  return (
    <View style={styles.List}>
      <Text> {props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  List: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default ListItemDetail;

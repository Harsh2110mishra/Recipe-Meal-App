import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constant/Colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={24}
      style={{ marginLeft: 6, marginTop: 6 }}
      color={Colors.accentColor}
    ></HeaderButton>
  );
};

export default CustomHeaderButton;

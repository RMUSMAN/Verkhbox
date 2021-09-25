import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor, PurpleColor } from "../../../config";

export default StyleSheet.create({
  orderBtn: {
    margin: 5,
    backgroundColor: PurpleColor.lightPrimaryColor,
  },
  btnContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  outlineBtn: {
    backgroundColor: "white",
    borderColor: PurpleColor.lightPrimaryColor,
    borderWidth: 1.3
  },
});

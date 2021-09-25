import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor, PurpleColor } from "../../../../config";

export default StyleSheet.create({
  // orderItem: {
  //   borderWidth: 1,
  //   borderColor: BaseColor.grayColor,
  //   width: "50%",
  //   padding: 20,
  // },
  btnLight: {
    backgroundColor: PurpleColor.lightPrimaryColor,
    marginVertical: 5,
    justifyContent: "center",
    
  },
  lightText: {
    color: "white",
  },
  orderItemWithBorder: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.dividerColor,
    marginBottom: 10,
    paddingBottom: 5,
  },
  orderItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  leftItem: { width: "38%", marginRight: 20 },
});

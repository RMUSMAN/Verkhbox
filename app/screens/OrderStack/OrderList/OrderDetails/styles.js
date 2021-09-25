import React from "react";
import { StyleSheet, Platform } from "react-native";
import { BaseColor, PinkColor } from "../../../../config";
export default StyleSheet.create({
  saveArea: {
    flex: 1,
    backgroundColor: "white",
  },
  orderItemWithBorder: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BaseColor.dividerColor,
    marginBottom: 10,
    paddingBottom: 5,
    flex: 1,
  },
  orderItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  leftItem: { width: "43%", marginRight: 10, flexWrap: "wrap" },
});

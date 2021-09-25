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
  },
  btnLight: {
    backgroundColor: BaseColor.fieldColor,
    marginVertical: 5,
    justifyContent: "center",
    maxWidth: 170,
  },
  orderItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  leftItem: { width: "38%", marginRight: 20 },
  // head: { height: 40, backgroundColor: "#f1f8ff" },
  // text: { margin: 6 },
  head: { height: 40 },
  text: { margin: 20 },
  preview: {
    height: 114,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    flex: 1,
  },
  previewImage: {
    width: 335,
    height: 114,
    resizeMode: "contain",
  },
  btn: { width: 58, height: 18, borderRadius: 2 },
  btnText: { textAlign: "center", textDecorationLine: "underline" },
  tableBorder: { borderColor: "transparent" },
  row: {
    flexDirection: "row",
    borderBottomColor: BaseColor.dividerColor,
    borderBottomWidth: 1,
  },
});

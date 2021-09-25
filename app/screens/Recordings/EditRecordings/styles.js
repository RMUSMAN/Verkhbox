import { StyleSheet } from "react-native";
import { BaseColor } from "../../../config";

export default StyleSheet.create({
  tabbar: {
    backgroundColor: "white",
    height: 40,
  },  saveArea: {
    flex: 1,
    backgroundColor: "white",
  },
  tab: {
    width: 100,
  },
  indicator: {
    height: 0,
  },
  label: {
    fontWeight: "400",
  },
  containProfileItem: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingTop: 20,
  },

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
  orderItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  leftItem: { width: "38%", marginRight: 20 },
  // head: { height: 40, backgroundColor: "#f1f8ff" },
  // text: { margin: 6 },
  head: { height: 40 },
  text: { margin: 20 },

  btn: { width: 58, height: 18, borderRadius: 2 },
  btnText: { textAlign: "center", textDecorationLine: "underline" },
  tableBorder: { borderColor: "transparent" },
  row: {
    flexDirection: "row",
    borderBottomColor: BaseColor.dividerColor,
    borderBottomWidth: 1,
  },
  categoryBorder: {
    // borderWidth: 1,
    // borderColor: BaseColor.dividerColor,
    height: 200,
    padding: 10,
  },
  searchInput: {
    paddingHorizontal: 5,
    backgroundColor: "white",
    borderColor: BaseColor.dividerColor,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius:0,
    borderBottomRightRadius:0,
    borderRightColor:'red'
  },
  quantityInput: {
    borderRadius: 0,
  },
});

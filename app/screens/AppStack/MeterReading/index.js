import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import {
  Header,
  Icon,
  Text,
  CustomDropDown,
  Button,
  CustomTextInput,
} from "../../../components";
import { BaseColor, BaseStyle, PurpleColor } from "../../../config";
import { Cell, Table, TableWrapper } from "react-native-table-component";
import RecordMeter from "./RecordMeter";
import NavigationService from "../../../navigation/NavigationService";
import styles from "./styles";
import StringsOfLanguages from "../../../util/stringsOfLanguage";

const MeterReading = (props) => {
  const { navigation } = props;

  const [showRecordMeter, setShowRecordMeter] = useState(false);
  const [sortCreationDate, setSortCreationDate] = useState("az");
  const [sortOrder, setSortOrder] = useState("");
  const [sortAlphabetically, setSortAlphabetically] = useState("asc");
  const [columnVisibility, setColumnVisibility] = useState([
    { label: "Sno#", value: "Sno#" },
    { label: "Order Number", value: "OrderNumber" },
    { label: "Meter Number", value: "MeterNumber" },
    { label: "Reading", value: "Reading" },
    { label: "Document", value: "Document" },
    { label: "Created At", value: "CreatedAt" },
    { label: "Action", value: "Action" },
  ]);
  const [showRows, setShowRows] = useState(25);
  const [tableData, setTableData] = useState([
    [
      "Auf-/Abbau Fotos",
      "1620384122",
      "Auf-/Abbau Fotos",
      "1620384122",
      "1620384122",
      "07-May-2021",
      "https://p578382.mittwaldserver.info/order-documents/1620384122.jpg",
    ],
    [
      "Auf-/Abbau Fotos",
      "1620384122",
      "Auf-/Abbau Fotos",
      "1620384122",
      "1620384122",
      "07-May-2021",
      "https://p578382.mittwaldserver.info/order-documents/1620384122.jpg",
    ],
    [
      "Auf-/Abbau Fotos",
      "1620384122",
      "Auf-/Abbau Fotos",
      "1620384122",
      "1620384122",
      "07-May-2021",
      "https://p578382.mittwaldserver.info/order-documents/1620384122.jpg",
    ],
    [
      "Auf-/Abbau Fotos",
      "1620384122",
      "Auf-/Abbau Fotos",
      "1620384122",
      "1620384122",
      "07-May-2021",
      "https://p578382.mittwaldserver.info/order-documents/1620384122.jpg",
    ],
    [
      "Auf-/Abbau Fotos",
      "1620384122",
      "Auf-/Abbau Fotos",
      "1620384122",
      "1620384122",
      "07-May-2021",
      "https://p578382.mittwaldserver.info/order-documents/1620384122.jpg",
    ],
    [
      "Auf-/Abbau Fotos",
      "1620384122",
      "Auf-/Abbau Fotos",
      "1620384122",
      "1620384122",
      "07-May-2021",
      "https://p578382.mittwaldserver.info/order-documents/1620384122.jpg",
    ],
    [
      "Auf-/Abbau Fotos",
      "1620384122",
      "Auf-/Abbau Fotos",
      "1620384122",
      "1620384122",
      "07-May-2021",
      "https://p578382.mittwaldserver.info/order-documents/1620384122.jpg",
    ],
    [
      "Auf-/Abbau Fotos",
      "1620384122",
      "Auf-/Abbau Fotos",
      "1620384122",
      "1620384122",
      "07-May-2021",
      "https://p578382.mittwaldserver.info/order-documents/1620384122.jpg",
    ],
    [
      "Auf-/Abbau Fotos",
      "1620384122",
      "Auf-/Abbau Fotos",
      "1620384122",
      "1620384122",
      "07-May-2021",
      "https://p578382.mittwaldserver.info/order-documents/1620384122.jpg",
    ],
    [
      "Auf-/Abbau Fotos",
      "1620384122",
      "Auf-/Abbau Fotos",
      "1620384122",
      "1620384122",
      "07-May-2021",
      "https://p578382.mittwaldserver.info/order-documents/1620384122.jpg",
    ],
  ]);
  const [tableHead, setTableHead] = useState([
    "Sno#",
    "Order Number",
    "Meter Number",
    "Reading",
    "Document",
    "Created At",
    "Action",
  ]);

  const actionElement = (data, index) => (
    <TouchableOpacity onPress={() => _alertIndex(index)}>
      <View style={styles.btn}>
        <Text body2 style={styles.btnText}>
          {StringsOfLanguages.View}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const rowElement = (data, index) => (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 3,
        alignItems: "center",
      }}
    >
      <Text body2 caption1>
        {data}
      </Text>
    </View>
  );
  const headElement = (data) => (
    <View style={{ padding: 3, alignItems: "center" }}>
      <Text body2 semibold>
        {data}
      </Text>
    </View>
  );
  function _alertIndex(index) {
    alert(`This is row ${index + 1}`);
  }

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { backgroundColor: "white" }]}
      forceInset={{ top: "always" }}
    >
      <Header
        title={StringsOfLanguages.meterReading}
        whiteColor
        style={{ backgroundColor: PurpleColor.primaryColor }}
        onPressLeft={() => {
          
          navigation.toggleDrawer();
        }}
        renderLeft={() => {
          return (
            <Icon name="menu" iconFamily="Ionicons" size={24} color="white" />
          );
        }}
      />
      
      <RecordMeter
        visible={showRecordMeter}
        handleClose={() => setShowRecordMeter(false)}
      />
      
    </SafeAreaView>
  );
};

export default MeterReading;

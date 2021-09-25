import React, { useState, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  BackHandler,
} from "react-native";
import { Cell, Table, TableWrapper } from "react-native-table-component";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  CustomDropDown,
  CustomTextInput,
  Icon,
  Text,
  Header,
} from "../../../../components";
import moment from "moment";

import { BaseColor, PurpleColor } from "../../../../config";
import NavigationService from "../../../../navigation/NavigationService";
import { updateTaskProduct } from "../../../../Redux/store/actions/product";
import StringsOfLanguages from "../../../../util/stringsOfLanguage";
import styles from "./styles";

const width = Dimensions.get("screen").width;

const ProductInfo = ({ navigation, ...props }) => {
  const taskLoading = useSelector((state) => state.productReducer.taskLoading);

  const contactList = useSelector((state) => state.productReducer.contactList);

  const [productType, setProductType] = useState("Delivered");

  const activeTaskId = useSelector((state) => state.productReducer.activeTask);
  const signatureInfo = useSelector(
    (state) => state.productReducer.signatureInfo
  );
  const [contactPerson, setContactPerson] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState([
    StringsOfLanguages.product,
    StringsOfLanguages.quantity,
    StringsOfLanguages.quantity,
    StringsOfLanguages.Status,
  ]);
  const [activeTask, setActiveTask] = useState({});
  const [contactDropdown, setContactDropdown] = useState([]);
  const dispatch = useDispatch();
  const taskListStoreValue = useSelector(
    (state) => state.productReducer.taskList
  );
  const rowElement = (data, index) => (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 3,
      }}
    >
      <Text body2 caption1>
        {data}
      </Text>
    </View>
  );
  const headElement = (data) => (
    <View style={{ padding: 3, alignItems: "center" }}>
      <Text footnote semibold>
        {data}
      </Text>
    </View>
  );

  useEffect(() => {
    const requiredTask = taskListStoreValue?.tasks?.find(
      (elem) => elem.id === activeTaskId
    );
    if (requiredTask) {
      setActiveTask(requiredTask);
      if (requiredTask?.order?.get_contact_name?.id) {
        setContactPerson(requiredTask?.order?.get_contact_name?.id);
      }
    }

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);
  useEffect(() => {
    setTableData(signatureInfo.tableData);
    setProductType(signatureInfo.type);
  }, [signatureInfo]);
  useEffect(() => {
    if (contactList?.length > 0) {
      const contactListCopy = contactList
        .map((elem) => {
          return {
            label: elem.name,
            value: elem.id,
          };
        })
        .filter((elem) => elem);
      setContactDropdown([...contactListCopy]);
    }
  }, [contactList]);
  const handleBackButton = () => {
    NavigationService.navigate("OrderMask");
    return true;
  };

  const getRowData = (rowData, index) => {
    const elements = rowData
      .map((cellData, cellIndex) => {
        if (cellIndex >= 4) return undefined;
        if (cellIndex === 1)
          return (
            <Cell
              key={cellIndex}
              data={null}
              textStyle={styles.text}
              width={cellIndex < 1 ? 120 : 70}
            />
          );
        return (
          <Cell
            key={cellIndex}
            data={
              cellIndex === 3
                ? rowElement(productType, index)
                : rowElement(cellData, index)
            }
            textStyle={styles.text}
            width={cellIndex < 1 ? 120 : 70}
          />
        );
      })
      .filter((elem) => elem);
    return elements;
  };
  const getHeadData = (headData) => {
    const elements = headData
      .map((cellData, cellIndex) => {
        if (cellIndex >= 4 || cellIndex === 1) return undefined;
        return (
          <Cell
            key={cellIndex}
            data={headElement(cellData)}
            style={{ alignItems: "flex-start" }}
            textStyle={styles.text}
            width={cellIndex < 1 ? 0.5 * width : 70}
          />
        );
      })
      .filter((elem) => elem);
    return elements;
  };
  return (
    <SafeAreaView style={styles.saveArea}>
      <Header
        whiteColor
        title={StringsOfLanguages.signDocuments}
        onPressLeft={() => {
          navigation.navigate("OrderMask");
        }}
        renderLeft={() => (
          <Icon
            name="close"
            color="white"
            iconFamily="MaterialCommunityIcons"
            size={30}
            style={{ marginLeft: 10 }}
          />
        )}
        style={{ backgroundColor: PurpleColor.primaryColor }}
      />
      <View
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: "black",
          flexDirection: "row",
          marginBottom: 10,
          paddingHorizontal: 20,
        }}
      >
        <Text body2 semibold style={{ width: "50%" }}>
          {StringsOfLanguages.Order} :{" "}
          <Text body2 regular>
            {activeTask?.order?.order_number}
          </Text>
        </Text>
        <Text body2 semibold>
          {StringsOfLanguages.date} :{" "}
          <Text body2 regular>
            {moment().format("DD.MM.YYYY")}
          </Text>
        </Text>
      </View>
      <View
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: "black",
          marginBottom: 20,
        }}
      >
        <Text body2 style={{ marginBottom: 15 }}>
          {StringsOfLanguages.recipient}
        </Text>
        <CustomDropDown
          itemList={contactDropdown}
          handleSelected={setContactPerson}
          placeholder="Contact Person"
          initialValue={activeTask?.order?.get_contact_name?.id}
          dropDownContainerStyle={{
            height: "auto",
            zIndex: 1000,
            backgroundColor: "white",
            height: 90,
          }}
        />
        <View style={{ paddingVertical: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Text body2 style={{ width: "45%" }}>
              {StringsOfLanguages.customerName}:
            </Text>
            <Text body2 style={{ width: "60%" }}>
              {activeTask?.order?.get_customer?.customer_name}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text body2 style={{ width: "45%" }}>
              {StringsOfLanguages.customerCity}:
            </Text>
            <Text body2 style={{ width: "60%" }}>
              {activeTask?.order?.get_customer?.Location}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text body2 style={{ width: "45%" }}>
              {StringsOfLanguages.customerAddress}:
            </Text>
            <Text body2 style={{ width: "60%" }}>
              {activeTask?.order?.get_customer?.address}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        style={{ flex: 1, padding: 10, zIndex: 1 }}
      >
        <View>
          <Text body2 semibold>
            {StringsOfLanguages.performedWork}
          </Text>
        </View>
        <ScrollView horizontal={true}>
          <Table borderStyle={styles.tableBorder}>
            <TableWrapper style={[styles.row, { borderBottomColor: "black" }]}>
              {getHeadData(tableHead)}
            </TableWrapper>

            {tableData?.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {getRowData(rowData, index)}
              </TableWrapper>
            ))}
          </Table>
        </ScrollView>
        <Button
          style={{
            marginVertical: 10,
            marginBottom: 30,
            backgroundColor: PurpleColor.lightPrimaryColor,
            justifyContent: "center",
          }}
          loadingColor={"grey"}
          onPress={() => {
            NavigationService.navigate("MakeSignature");
          }}
        >
          <Text body1 whiteColor>
            {StringsOfLanguages.sign}
          </Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductInfo;

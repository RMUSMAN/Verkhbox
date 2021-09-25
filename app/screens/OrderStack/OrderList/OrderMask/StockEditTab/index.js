import React, { Component, useEffect, useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import { Cell, Table, TableWrapper } from "react-native-table-component";
import { useSelector, useDispatch } from "react-redux";
import { CustomTextInput, Icon, Text, Button } from "../../../../../components";
import {
  deleteTaskProduct,
  updateTaskProduct,
} from "../../../../../Redux/store/actions/product";
import styles from "../styles";
import groupBy from "lodash/groupBy";
import { PurpleColor,BaseColor } from "../../../../../config";
import StringsOfLanguages from "../../../../../util/stringsOfLanguage";
const width = Dimensions.get("screen").width;

/**
 * @description Show when tab Return activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class StockTab
 * @extends {Component}
 */
const StockTab = (props) => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState([
    StringsOfLanguages.productName,
    StringsOfLanguages.stockQty,
    StringsOfLanguages.quantity,
    StringsOfLanguages.action,
  ]);
  const [updateDeposition, setUpdateDeposition] = useState([]);
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
  function _alertIndex(index) {
    // alert(`This is row ${index + 1}`);
  }

  const actionElement = (data, index, productItemData) => (
    <TouchableOpacity
      onPress={() => {
        productItemData;
        const dataValue = { id: productItemData.id };
        dispatch(deleteTaskProduct(dataValue));
      }}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
      disabled={taskLoading}
    >
      <Icon name="close-circle-outline" iconFamily="Ionicons" size={24} />
    </TouchableOpacity>
  );
  const quantityInput = (data, index, taskData) => {
    const handleValueChange = (elem) => {
      if (parseInt(elem) !== parseInt(data)) {
        const depositionValue = {
          id: taskData.id,
          product_id: taskData.product.id,
          plan_qty: parseInt(elem),
          added_by_employee: true,
          disposition_type: "plan_delivery",
        };
        const depositionListCopy = Object.assign([], updateDeposition);
        if (depositionListCopy?.length > 0) {
          const desIndex = depositionListCopy.findIndex(
            (val) => val.id === depositionValue.id
          );
          if (desIndex >= 0) {
            depositionListCopy[desIndex] = depositionValue;
          } else {
            depositionListCopy.push(depositionValue);
          }
        } else {
          depositionListCopy.push(depositionValue);
        }

        setUpdateDeposition(depositionListCopy);
      }
    };
    return (
      <CustomTextInput
        style={styles.quantityInput}
        inputStyle={{
          backgroundColor: "white",
          width: "100%",
          color: "black",
          borderColor: BaseColor.dividerColor,
          borderWidth: 1,
        }}
        placeholder={`${data}`}
        onChangeText={handleValueChange}
        value={data}
        defaultValue={data}
        keyboardType="numeric"
      />
    );
  };

  const taskList = useSelector((state) => state.productReducer.taskList);
  const taskLoading = useSelector((state) => state.productReducer.taskLoading);
  const activeTask = useSelector((state) => state.productReducer.activeTask);

  useEffect(() => {
    if (taskList?.tasks?.length > 0) {
      const requiredTask = taskList?.tasks?.find(
        (elem) => elem.id === activeTask
      );
      if (!requiredTask) return;
      let dispositions = JSON.parse(JSON.stringify(requiredTask.dispositions));
      dispositions =
        dispositions?.length > 0
          ? dispositions.filter(
              (elem) => elem.type === "delivery" || elem.type === "return"
            )
          : [];
      const groupedTasks = groupBy(dispositions, (elem) => elem.product_id);
      let dispositionsCopy = [];
      for (let [key, value] of Object.entries(groupedTasks)) {
        if (value?.length > 1) {
          const valueCopy = Object.assign({}, value[0]);
          valueCopy.qty = accumulateProducts(
            valueCopy.product_id,
            JSON.parse(JSON.stringify(value))
          );
          dispositionsCopy = [...dispositionsCopy, valueCopy];
        } else {
          dispositionsCopy = [...dispositionsCopy, ...value];
        }
      }

      dispositions =
        dispositionsCopy?.length > 0
          ? dispositionsCopy.map((elem) => [
              elem.product.product_name,
              elem.qty,
              elem.qty,
              true,
              elem,
            ])
          : [];
      // dispositionsCopy.length = 0;
      setTableData(dispositions);
    }
  }, [taskList,activeTask]);

  const accumulateProducts = (product_id, dispositions) => {
    
    const deliveryItems = dispositions.filter(
      (elem) => elem.type === "delivery" && elem.product_id == product_id
    );

    let deliverySum = 0;
    deliveryItems.map((elem) => {
      deliverySum = deliverySum + elem.qty;
    });

    const returnItems = dispositions.filter(
      (elem) => elem.type === "return" && elem.product_id == product_id
    );

    let returnSum = 0;
    returnItems.map((elem) => {
      returnSum = returnSum + elem.qty;
    });


    return deliverySum - returnSum;
  };
  const getRowData = (rowData, index) => {
    const elements = rowData
      .map((cellData, cellIndex) => {
        if (cellIndex > 3) return undefined;
        return (
          <Cell
            key={cellIndex}
            data={
              cellIndex === 2
                ? quantityInput(cellData, index, rowData[rowData.length - 1])
                : cellIndex === 3
                ? actionElement(cellData, index, rowData[rowData.length - 1])
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

  const handleSave = () => {
    const x = "";

    if (
      tableData.length > 0 &&
      updateDeposition.length > 0 &&
      tableData[0].length > 0 &&
      tableData[0][4]
    ) {
      const taskInfo = tableData[0][4];

      const updateValue = {
        task_id: taskInfo.task_id,
        order_id: taskInfo.order_id,
        user_id: taskInfo.user_id,
        dispositions: updateDeposition,
      };
      dispatch(updateTaskProduct(updateValue));
    }
  };
  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <ScrollView horizontal={true}>
        <Table borderStyle={styles.tableBorder}>
          <TableWrapper style={styles.row}>
            {tableHead.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={headElement(cellData)}
                textStyle={styles.text}
                width={cellIndex < 1 ? 120 : 70}
              />
            ))}
          </TableWrapper>

          {tableData.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {getRowData(rowData, index)}
            </TableWrapper>
          ))}
        </Table>
      </ScrollView>
      <Button
        style={{
          marginVertical: 30,
          marginBottom: 30,
          backgroundColor: PurpleColor.lightPrimaryColor,
          justifyContent: "center",
        }}
        onPress={handleSave}
        loading={taskLoading}
        loadingColor={"grey"}
        disabled={taskLoading}
      >
        <Text body1 whiteColor>
          {StringsOfLanguages.Save}
        </Text>
      </Button>
    </ScrollView>
  );
};

export default StockTab;

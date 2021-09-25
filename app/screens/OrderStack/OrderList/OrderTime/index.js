import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { Cell, Table, TableWrapper } from "react-native-table-component";
import {
  Button,
  Icon,
  OrderModal,
  Text,
  CustomTextInput,
  CheckBox,
  SearchableMenu,
} from "../../../../components";
import { useSelector, useDispatch } from "react-redux";
import { BaseColor, PurpleColor } from "../../../../config";
import styles from "./styles";
import {
  startEmployeeTimer,
  logEmployeeTimer,
} from "../../../../Redux/store/actions/product";
import StringsOfLanguages from "../../../../util/stringsOfLanguage";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
function OrderTime({ visible, handleClose, taskId, orderListType }) {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.productReducer.userList);
  const loading = useSelector((state) => state.productReducer.loading);
  const taskTimerDetails = useSelector(
    (state) => state.productReducer.taskTimerDetails
  );

  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState([
    "participating employee",
    "selected",
  ]);

  useEffect(() => {
    if (userList?.length > 0) {
      const employeeListCopy = userList.map((elem) => {
        return {
          label: elem.first_name + " " + elem.last_name,
          value: elem.id,
        };
      });
      setEmployeeList(employeeListCopy);
    }
  }, [userList]);

  useEffect(() => {
    if (!selectedEmployees || selectedEmployees?.length === 0) {
      setTableData([]);
      return;
    }
    let tableDataCopy = [];
    userList.map((elem) => {
      const t = selectedEmployees?.find((employeeId) => employeeId === elem.id);

      if (t) {
        tableDataCopy.push([
          elem.first_name + " " + elem.last_name,
          true,
          elem,
        ]);
      }
    });

    setTableData(tableDataCopy);
  }, [selectedEmployees]);
  const getRowData = (rowData, index) => {
    const elements = rowData
      .map((cellData, cellIndex) => {
        if (cellIndex > 1) return undefined;
        return (
          <Cell
            key={cellIndex}
            data={
              cellIndex === 1
                ? actionElement(cellData, index, rowData[rowData.length - 1])
                : rowElement(cellData, index)
            }
            textStyle={styles.text}
            width={cellIndex < 1 ? 0.7 * width : 0.2 * width}
          />
        );
      })
      .filter((elem) => elem);
    return elements;
  };

  const actionElement = (data, index, fullData) => (
    <TouchableOpacity
      onPress={() => deleteSelectedItem(fullData)}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CheckBox
        selected={true}
        onPress={() => deleteSelectedItem(fullData)}
        style={{ alignSelf: "center" }}
      />
    </TouchableOpacity>
  );
  const deleteSelectedItem = (data) => {
    if (!taskTimerDetails[taskId]) {
      setSelectedEmployees(
        selectedEmployees.filter((employeeId) => employeeId !== data.id)
      );
    } else {
      ToastAndroid.show("Please Stop Timer First", ToastAndroid.SHORT);
    }
  };
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
      <Text body2 semibold>
        {data}
      </Text>
    </View>
  );

  return (
    <OrderModal
      visible={visible}
      handleClose={handleClose}
      heading={StringsOfLanguages.recordTime}
    >
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <View

        // style={{backgroundColor:'white'}}
        >
          <SearchableMenu
            itemList={employeeList}
            handleSelected={setSelectedEmployees}
            placeholder={StringsOfLanguages.selectEmployee}
            zIndex={1000}
            zIndexInverse={4000}
            // selectedValue={selectedEmployees}
            initialValue={
              Object.keys(taskTimerDetails)?.length > 0 &&
              taskTimerDetails[taskId]
                ? taskTimerDetails[taskId]?.user_ids
                : []
            }
            multiple={true}
            searchable={true}
            disabled={taskTimerDetails[taskId]}
            onPress={() => {
              if (taskTimerDetails[taskId]) {
                ToastAndroid.show(
                  "Please Stop Timer First",
                  ToastAndroid.SHORT
                );
              }
            }}
          />
        </View>
        <ScrollView horizontal={true}>
          <Table
            borderStyle={styles.tableBorder}
            style={{ minHeight: 0.27 * height }}
          >
            <TableWrapper style={styles.row}>
              {tableHead.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={headElement(cellData)}
                  textStyle={styles.text}
                  width={cellIndex < 1 ? 0.7 * width : 0.2 * width}
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 20,
          }}
        >
          <Button
            style={{
              backgroundColor: PurpleColor.lightPrimaryColor,
              justifyContent: "center",
              minWidth: 0.27 * width,
            }}
            onPress={() => {
              if (selectedEmployees.length > 0) {
                const data = {
                  time: new Date(),
                  type: "start",
                };

                if (!orderListType) {
                  data["task_id"] = taskId;
                } else {
                  data["order_id"] = taskId;
                }
                const payload = {
                  data,
                  user_ids: selectedEmployees,
                  taskId,
                };
                dispatch(startEmployeeTimer(payload));
              } else {
                ToastAndroid.show("Please select Employee", ToastAndroid.SHORT);
              }
            }}
            loading={loading}
            disabled={taskTimerDetails[taskId] || loading}
          >
            <Text body1 whiteColor>
              {StringsOfLanguages.Start}
            </Text>
          </Button>
          <Button
            style={{
              backgroundColor: PurpleColor.lightPrimaryColor,
              justifyContent: "center",
              minWidth: 0.27 * width,
            }}
            loading={loading}
            onPress={() => {
              const data = {
                timer_id: taskTimerDetails[taskId].timer_id,
                type:
                  taskTimerDetails[taskId]?.type === "start" ||
                  taskTimerDetails[taskId]?.type === "resume"
                    ? "pause"
                    : "resume",
                user_ids: selectedEmployees,
                log_ids: taskTimerDetails[taskId].log_ids,
              };
             
              const payload = {
                data,
                taskId,
              };
              dispatch(logEmployeeTimer(payload));
            }}
            disabled={!taskTimerDetails[taskId] || loading}
          >
            <Text body1 whiteColor>
              {taskTimerDetails[taskId]?.type === "start" ||
              taskTimerDetails[taskId]?.type === "resume"
                ? StringsOfLanguages.Pause
                : StringsOfLanguages.Resume}
            </Text>
          </Button>
          <Button
            style={{
              backgroundColor: PurpleColor.lightPrimaryColor,
              justifyContent: "center",
              minWidth: 0.27 * width,
            }}
            onPress={() => {
              const data = {
                type: "stop",
                taskId,
                timer_id: taskTimerDetails[taskId].timer_id,
              };

              if (!orderListType) {
                data["task_id"] = taskId;
              } else {
                data["order_id"] = taskId;
              }

              const payload = {
                data,
                taskId,
              };
              dispatch(startEmployeeTimer(payload));
              setSelectedEmployees([]);
            }}
            disabled={!taskTimerDetails[taskId] || loading}
            loading={loading}
          >
            <Text body1 whiteColor>
              {StringsOfLanguages.stop}
            </Text>
          </Button>
        </View>
      </ScrollView>
    </OrderModal>
  );
}

export default OrderTime;

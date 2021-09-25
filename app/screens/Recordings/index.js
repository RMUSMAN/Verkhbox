import React, { useState, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
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
  LoaderScreen,
} from "../../components";
import moment from "moment";
const height = Dimensions.get("screen").height;
import { BaseColor, BaseStyle, PurpleColor } from "../../config";
import NavigationService from "../../navigation/NavigationService";
import {
  setSignInfo,
  updateTaskProduct,
  empMonthlyTrackerAction,
  empCompleteTimerAction,
} from "../../Redux/store/actions/product";
import {
  calculateDifferenceBetweenDays,
  generateYearsList,
  monthsOfYear,
  calculateDifferenceBetweenTimes,
  calculateMinsFromHms,
} from "../../util/data";
import EditRecordings from "./EditRecordings";
import StringsOfLanguages from "../../util/stringsOfLanguage";
import styles from "./styles";
import { addListOfTimes } from "../../util/helpers";

const width = Dimensions.get("screen").width;

const Recordings = (props) => {
  const taskListStoreValue = useSelector(
    (state) => state.productReducer.taskList
  );

  const empMonthlyTracker = useSelector(
    (state) => state.productReducer.empMonthlyTracker
  );
  const empCompleteTimer = useSelector(
    (state) => state.productReducer.empCompleteTimer
  );

  const loading = useSelector((state) => state.productReducer.loading);
  const activeTask = useSelector((state) => state.productReducer.activeTask);
  const userList = useSelector((state) => state.productReducer.userList);
  const loginUser = useSelector((state) => state.authReducer.loginUser);
  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState([
    "Edit",
    StringsOfLanguages.date,
    StringsOfLanguages.Start,
    StringsOfLanguages.Pause,
    StringsOfLanguages.end,
    StringsOfLanguages.total,
  ]);
  const [showEditRecording, setShowEditRecording] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState(
    monthsOfYear[new Date().getMonth()]?.value
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const dispatch = useDispatch();

  const [yearsList, setYearsList] = useState(
    generateYearsList(1970, new Date().getFullYear() + 1)
  );
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    if (userList?.length > 0) {
      setSelectedEmployees(
        userList.find((elem) => elem.id === loginUser.user_id)
      );
    }
  }, [userList]);

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
    <View style={{ padding: 3, alignItems: "flex-start" }}>
      <Text footnote semibold>
        {data}
      </Text>
    </View>
  );

  const actionElement = (data, index, productItemData) => (
    <TouchableOpacity
      onPress={() => {
        setShowEditRecording(true);
        setSelectedRecord(productItemData);
      }}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
      // disabled={taskLoading}
    >
      <Icon name="edit" iconFamily="MaterialIcons" size={24} />
    </TouchableOpacity>
  );
  useEffect(() => {
    let tableDataCopy = [];
    if (!empCompleteTimer || !empCompleteTimer?.Time) {
      return;
    }

    for (let [key, elem] of Object.entries(empCompleteTimer?.Time)) {
      const startDate = moment(elem.start).toDate();
      const endDate = moment(elem.stop).toDate();
      const pauseValues = empCompleteTimer.Pause[key];

      const accumulatedTime = addListOfTimes(
        pauseValues.map((elem) => elem.pause)
      );
      const recordInformation = {
        startTime: moment(elem.start).format("HH:mm:ss"),
        pauseTime: accumulatedTime,
        stopTime: moment(elem.stop).format("HH:mm:ss"),
        totalWorkTime: calculateDifferenceBetweenTimes(
          accumulatedTime, //hh:mm:ss
          calculateDifferenceBetweenDays(startDate, endDate) //return time e.g:hh:mm:ss
        ),
      };
      tableDataCopy.push([
        {
          ...elem,
          date: key,
          pauseTime: calculateMinsFromHms(accumulatedTime),
        },
        moment(key).format("DD.MM.YYYY"),
        recordInformation.startTime,
        recordInformation.pauseTime,
        recordInformation.stopTime,
        recordInformation.totalWorkTime,
      ]);
    }

    const sortedTable = tableDataCopy.sort((a, b) => {
      return moment(b[0], "DD.MM.YYYY") - moment(a[0], "DD.MM.YYYY");
    });
    setTableData(sortedTable);
  }, [empCompleteTimer]);

  useEffect(() => {
    if (!selectedEmployees || !selectedYear || !selectedMonth) {
      return;
    }
    const data = {
      month: selectedMonth,
      year: selectedYear,
    };
    dispatch(
      empMonthlyTrackerAction({ ...data, employee_id: selectedEmployees.id })
    );

    dispatch(
      empCompleteTimerAction({ ...data, user_id: selectedEmployees.id })
    );
  }, [selectedYear, selectedMonth, selectedEmployees]);

  const getRowData = (rowData, index) => {
    const elements = rowData
      .map((cellData, cellIndex) => {
        if (cellIndex > 5) return undefined;
        return (
          <Cell
            key={cellIndex}
            data={
              cellIndex === 0
                ? actionElement(cellData, index, rowData[0])
                : rowElement(cellData, index)
            }
            textStyle={styles.text}
            width={cellIndex === 1 ? 80 : 60}
          />
        );
      })
      .filter((elem) => elem);
    return elements;
  };
  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { backgroundColor: "white" }]}
      forceInset={{ top: "always" }}
    >
      <Header
        title={StringsOfLanguages.recordings}
        whiteColor
        style={{ backgroundColor: PurpleColor.primaryColor }}
        onPressLeft={() => {
          //   NavigationService.navigate("SignIn");
          props.navigation.toggleDrawer();
        }}
        renderLeft={() => {
          return (
            <Icon name="menu" iconFamily="Ionicons" size={24} color="white" />
          );
        }}
      />
      <ScrollView nestedScrollEnabled={true} style={{ flex: 1, padding: 10 }}>
        <View style={{ marginVertical: 10, paddingRight: 5 }}>
          <Text body1>{StringsOfLanguages.employee}</Text>
          <View
            style={{
              borderColor: BaseColor.dividerColor,
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              paddingVertical: 10,
            }}
          >
            <Text>
              {selectedEmployees.first_name + " " + selectedEmployees.last_name}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{ marginVertical: 10, paddingRight: 5, maxWidth: "48%" }}
          >
            <Text body1>{StringsOfLanguages.month}</Text>
            <CustomDropDown
              itemList={monthsOfYear}
              handleSelected={setSelectedMonth}
              style={{ marginVertical: 5 }}
              initialValue={selectedMonth}
              placeholder={StringsOfLanguages.selectMonth}
              zIndex={2000}
              searchable={true}
              zIndexInverse={2000}
            />
          </View>
          <View style={{ marginVertical: 10, maxWidth: "48%" }}>
            <Text body1>{StringsOfLanguages.year}</Text>
            <CustomDropDown
              itemList={yearsList}
              handleSelected={setSelectedYear}
              style={{ marginVertical: 5 }}
              placeholder={StringsOfLanguages.selectYear}
              searchable={true}
              zIndex={1000}
              initialValue={selectedYear}
              zIndexInverse={3000}
            />
          </View>
        </View>
        <View style={{ flex: 1, minHeight: 0.3 * height }}>
          {!loading ? (
            <View>
              {empMonthlyTracker && (
                <View style={{ marginVertical: 10, paddingRight: 5 }}>
                  <Text body1 style={{ marginBottom: 10 }}>
                    {StringsOfLanguages.workTime}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text body2 style={{ width: "45%" }}>
                      {StringsOfLanguages.totalHours}
                    </Text>
                    <Text body2>{empMonthlyTracker.total_workday_hours}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text body2 style={{ width: "45%" }}>
                      {StringsOfLanguages.targetHours}
                    </Text>
                    <Text body2>
                      {empMonthlyTracker.total_workday_hours_target}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text body2 style={{ width: "45%" }}>
                      {StringsOfLanguages.difference}
                    </Text>
                    <Text body2>{empMonthlyTracker.difference}</Text>
                  </View>
                </View>
              )}
              {empCompleteTimer ? (
                <ScrollView horizontal={true}>
                  <Table borderStyle={styles.tableBorder}>
                    <TableWrapper
                      style={[styles.row, { borderBottomColor: "black" }]}
                    >
                      {tableHead.map((cellData, cellIndex) => (
                        <Cell
                          key={cellIndex}
                          data={headElement(cellData)}
                          textStyle={styles.text}
                          width={cellIndex === 1 ? 80 : 60}
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
              ) : (
                <Text title3 alignCenter>
                  No Data Found.{"\n"}Please update your search
                </Text>
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LoaderScreen text={StringsOfLanguages.recordings} />
            </View>
          )}
        </View>
      </ScrollView>
      {showEditRecording && (
        <EditRecordings
          visible={showEditRecording}
          recordInformation={selectedRecord}
          handleClose={() => setShowEditRecording(false)}
          currentQuery={{
            employee_id: selectedEmployees.id,
            month: selectedMonth,
            year: selectedYear,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Recordings;

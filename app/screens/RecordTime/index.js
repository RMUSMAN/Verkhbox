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
import DateTimePicker from "@react-native-community/datetimepicker";

const height = Dimensions.get("screen").height;
import { BaseColor, BaseStyle, PurpleColor } from "../../config";
import NavigationService from "../../navigation/NavigationService";
import {
  setSignInfo,
  updateTaskProduct,
  empMonthlyTrackerAction,
  empCompleteTimerAction,
  empManualTimer,
} from "../../Redux/store/actions/product";
import {
  calculateDifferenceBetweenDays,
  generateYearsList,
  monthsOfYear,
  convertMinsToHrsMins,
} from "../../util/data";
import StringsOfLanguages from "../../util/stringsOfLanguage";
import styles from "./styles";
import { ToastAndroid } from "react-native";

const width = Dimensions.get("screen").width;

const RecordTime = (props) => {
  // const taskListStoreValue = useSelector(
  //   (state) => state.productReducer.taskList
  // );

  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const loading = useSelector((state) => state.productReducer.loading);
  // const activeTask = useSelector((state) => state.productReducer.activeTask);
  const userList = useSelector((state) => state.productReducer.userList);
  const addManualSuccess = useSelector(
    (state) => state.productReducer.addManualSuccess
  );
  const [noteText, setNoteText] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [pauseTime, setPauseTime] = useState(15);
  const dispatch = useDispatch();
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [totalWorkTime, setTotalWorkTime] = useState(0);
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
    const difference = endDate.getTime() - startDate.getTime();

    let mins = Number(difference / (1000 * 60) - pauseTime).toFixed(2);

    setTotalWorkTime(convertMinsToHrsMins(mins));
  }, [startDate, endDate, pauseTime]);

  const handleSave = () => {
    if (!selectedEmployees || selectedEmployees.length === 0) {
      ToastAndroid.show("Please select Employees", ToastAndroid.SHORT);
      return;
    }
    if (startDate.toISOString() == endDate.toISOString()) {
      ToastAndroid.show("Please set End Time", ToastAndroid.SHORT);
      return;
    }
    const payload = {
      type: "start-stop",
      prtype: "pause",
      pause: pauseTime,
      user_ids: selectedEmployees,
      start_time: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
      stop_time: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
      note: noteText,
    };
    dispatch(empManualTimer(payload));
  };
  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { backgroundColor: "white" }]}
      forceInset={{ top: "always" }}
    >
      <Header
        title={StringsOfLanguages.recordTime}
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
          <Text body1>{StringsOfLanguages.selectEmployee}</Text>

          <CustomDropDown
            itemList={employeeList}
            handleSelected={setSelectedEmployees}
            placeholder={StringsOfLanguages.selectEmployee}
            zIndex={1000}
            zIndexInverse={4000}
            multiple={true}
            searchable={true}
          />
        </View>
        <View style={{ marginVertical: 10, paddingRight: 5 }}>
          <Text body1>{StringsOfLanguages.startTime}</Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              padding: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setShowStartDate(true)}
          >
            <Text body1>{moment(startDate).format("HH:mm")}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 10, paddingRight: 5 }}>
          <Text body1>
            {StringsOfLanguages.pauseTime}
            <Text caption1> ({StringsOfLanguages.minutes}) </Text>
          </Text>

          <CustomTextInput
            style={{ justifyContent: "center", alignItems: "center" }}
            inputStyle={{
              backgroundColor: "white",
              width: "100%",
              borderColor: "black",
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            textAlign="center"
            placeholder=""
            onChangeText={(elem) => {
              // const tableDataCopy = [...tableData];

              // tableDataCopy[index][2] = elem;
              // setTableData(tableDataCopy);
              setPauseTime(elem);
            }}
            value={pauseTime}
            keyboardType="numeric"
          />
        </View>

        <View style={{ marginVertical: 10, paddingRight: 5 }}>
          <Text body1>{StringsOfLanguages.endTime}</Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              padding: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setShowEndDate(true)}
          >
            <Text body1>{moment(endDate).format("HH:mm")}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 10, paddingRight: 5 }}>
          <Text body1>{StringsOfLanguages.totalWorkTime}</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: BaseColor.dividerColor,
              borderRadius: 10,
              padding: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text body1>{totalWorkTime}</Text>
          </View>
        </View>
        <CustomTextInput
            style={styles.quantityInput}
            inputStyle={{
              backgroundColor: "white",
              width: "100%",
              borderColor: BaseColor.dividerColor,
              borderWidth: 1,
            }}
            numberOfLines={4}
            placeholder="Add Note"
            onChangeText={setNoteText}
            value={noteText}
          />
        <Button
          style={{
            marginVertical: 10,
            marginBottom: 30,
            backgroundColor: PurpleColor.lightPrimaryColor,
            justifyContent: "center",
          }}
          loading={loading}
          loadingColor={"grey"}
          onPress={handleSave}
        >
          <Text body1 whiteColor>
            {StringsOfLanguages.Save}
          </Text>
        </Button>

        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate("Recordings");
          }}
          style={{ alignSelf: "flex-end" }}
        >
          <Text body1>{StringsOfLanguages.viewMonthlyTable}</Text>
        </TouchableOpacity>
      </ScrollView>
      {showStartDate && (
        <DateTimePicker
          testID="startTimePicker"
          value={startDate}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            
            const currentDate = selectedDate || startDate;
            setStartDate(currentDate);
            setShowStartDate(false);
          }}
        />
      )}
      {showEndDate && (
        <DateTimePicker
          testID="endTimePicker"
          value={endDate}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            
            const currentDate = selectedDate || startDate;
            setEndDate(currentDate);
            setShowEndDate(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default RecordTime;

import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CustomDropDown,
  CustomTextInput,
  Header,
  Icon,
  Text,
} from "../../../components";
import { BaseColor, BaseStyle, PurpleColor } from "../../../config";
import NavigationService from "../../../navigation/NavigationService";
import { editEmployeeTimer,edi } from "../../../Redux/store/actions/product";

import { convertMinsToHrsMins } from "../../../util/data";
import StringsOfLanguages from "../../../util/stringsOfLanguage";

const height = Dimensions.get("screen").height;

const width = Dimensions.get("screen").width;

const EditRecordings = ({
  handleClose,
  visible,
  recordInformation,
  currentQuery,
}) => {
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const loading = useSelector((state) => state.productReducer.loading);
  const userList = useSelector((state) => state.productReducer.userList);
  const addManualSuccess = useSelector(
    (state) => state.productReducer.addManualSuccess
  );
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [pauseTime, setPauseTime] = useState(15);
  const dispatch = useDispatch();
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const loginUser = useSelector((state) => state.authReducer.loginUser);

  const [totalWorkTime, setTotalWorkTime] = useState(0);
  useEffect(() => {
    if (userList?.length > 0) {
      setSelectedEmployees(
        userList.find((elem) => elem.id === loginUser.user_id)
      );
    }
  }, [userList]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    handleClose();
    return true;
  };
  useEffect(() => {
    const difference = endDate.getTime() - startDate.getTime();

    let mins = Number(difference / (1000 * 60) - pauseTime).toFixed(2);

    setTotalWorkTime(convertMinsToHrsMins(mins));
  }, [startDate, endDate, pauseTime]);

  useEffect(() => {
    const startDate = moment(recordInformation.start).toDate();
    const endDate = moment(recordInformation.stop).toDate();
    setStartDate(startDate);
    setEndDate(endDate);
    setPauseTime(recordInformation?.pauseTime);
    
  }, [recordInformation]);
  const handleSave = () => {
    if (!selectedEmployees) {
      ToastAndroid.show("Please select Employees", ToastAndroid.SHORT);
      return;
    }
    if (startDate.toISOString() == endDate.toISOString()) {
      ToastAndroid.show("Please set End Time", ToastAndroid.SHORT);
      return;
    }
    const editData = {
      type: "start-stop",
      prtype: "pause",
      pause: pauseTime,
      user_ids: [selectedEmployees.id],
      start_time: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
      stop_time: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
      del_date: recordInformation.date,
    };
    const payload = {
      editData,
      currentQuery,
    };


    dispatch(editEmployeeTimer(payload));
    
  };
  return (
    <Modal
      isVisible={visible}
      onRequestClose={handleClose}
      style={{ flex: 1, margin: 0, backgroundColor: "red" }}
    >
      <SafeAreaView
        style={[BaseStyle.safeAreaView, { backgroundColor: "white" }]}
        forceInset={{ top: "always" }}
      >
        <Header
          title={StringsOfLanguages.editRecording}
          whiteColor
          style={{ backgroundColor: PurpleColor.primaryColor }}
          onPressLeft={() => {
            handleClose();
          }}
          renderLeft={() => {
            return (
              <Icon
                name="close"
                color="white"
                iconFamily="MaterialCommunityIcons"
                size={30}
                style={{ marginLeft: 10 }}
              />
            );
          }}
        />
        <ScrollView nestedScrollEnabled={true} style={{ flex: 1, padding: 10 }}>
          <View style={{ marginVertical: 10, paddingRight: 5 }}>
            <Text body1>{StringsOfLanguages.selectEmployee}</Text>

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
                {selectedEmployees.first_name +
                  " " +
                  selectedEmployees.last_name}
              </Text>
            </View>
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
                setPauseTime(elem);
              }}
              value={pauseTime.toString()}
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
    </Modal>
  );
};

export default EditRecordings;

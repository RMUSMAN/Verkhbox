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
} from "react-native";
import Orientation from "react-native-orientation-locker";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CustomDropDown,
  CustomTextInput,
  Header,
  Icon,
  Text,
} from "../../components";
import { BaseColor, BaseStyle, PurpleColor } from "../../config";
import NavigationService from "../../navigation/NavigationService";
import { empManualTimer } from "../../Redux/store/actions/product";
import { convertMinsToHrsMins } from "../../util/data";
import StringsOfLanguages from "../../util/stringsOfLanguage";

const height = Dimensions.get("screen").height;

const width = Dimensions.get("screen").width;
const cardGap = 20;
const RecordTime = (props) => {
  const [routes, setRoutes] = useState([
    {
      name: StringsOfLanguages.tasks,
      iconFamily: "MaterialCommunityIcons",
      iconName: "clock-time-four-outline",
      value: "Tasks",
    },
    {
      name: StringsOfLanguages.recordTime,
      iconFamily: "MaterialCommunityIcons",
      iconName: "clipboard-outline",
      value: "RecordTime",
    },
    {
      name: StringsOfLanguages.meterReading,
      iconFamily: "MaterialCommunityIcons",
      iconName: "camera-plus",
      value: "MeterReading",
    },
  ]);
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);
  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { backgroundColor: "white" }]}
      forceInset={{ top: "always" }}
    >
      <Header
        title={StringsOfLanguages.dashboard}
        whiteColor
        style={{ backgroundColor: PurpleColor.primaryColor }}
        onPressLeft={() => {
          props.navigation.toggleDrawer();
        }}
        renderLeft={() => {
          return (
            <Icon name="menu" iconFamily="Ionicons" size={24} color="white" />
          );
        }}
      />
      <ScrollView nestedScrollEnabled={true} style={{ flex: 1, padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            flex: 1,
            padding: 5,
            justifyContent: "space-between",
          }}
        >
          {routes.map((route, i) => {
            return (
              <TouchableOpacity
                key={route.id}
                style={{
                  marginTop: cardGap,
                  marginLeft: i % 2 !== 0 ? cardGap : 0,
                  width: 0.43 * width,
                  height: 180,
                  backgroundColor: "#ffffff",
                  borderRadius: 16,
                  shadowOpacity: 0.2,
                  justifyContent: "center",
                  alignItems: "center",

                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
                }}
                onPress={() => NavigationService.navigate(route.value)}
              >
                <Icon
                  iconFamily={route.iconFamily}
                  name={route.iconName}
                  size={50}
                  color="black"
                />

                <Text body1 style={{ marginTop: 10 }}>
                  {route.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecordTime;

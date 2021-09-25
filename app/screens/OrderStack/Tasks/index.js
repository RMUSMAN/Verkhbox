import { stubTrue } from "lodash-es";
import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, RefreshControl } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Header,
  Icon,
  Text,
  LoaderScreen,
  NoData,
} from "../../../components";
import { BaseStyle, PurpleColor } from "../../../config";
import { getTaskList } from "../../../Redux/store/actions/product";
import AllOrder from "../OrderList/AllOrder";
import moment from "moment";
import StringsOfLanguages from "../../../util/stringsOfLanguage";

const UpcomingTask = (props) => {
  const { navigation } = props;

  const [activeItem, setActiveItem] = useState("allOrder");
  const taskListStoreValue = useSelector(
    (state) => state.productReducer.taskList
  );
  const reload = useSelector((state) => state.productReducer.reload);
  const [upcomingTask, setUpcomingTask] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (taskListStoreValue?.tasks?.length > 0) {
      const temp = taskListStoreValue.tasks.filter((elem) => {
        const taskDate = new Date(elem.date);
        taskDate.setHours(0, 0, 0, 0);
        const currDate = new Date();
        currDate.setHours(0, 0, 0, 0);
        if (Object.prototype.toString.call(taskDate) === "[object Date]") {
          // it is a date
          if (isNaN(taskDate.getTime())) {
            // d.valueOf() could also work
            // date is not valid
            return false;
          } else {
            // date is valid

            if (taskDate >= currDate) {
              return true;
            }
          }
        }
        return false;
      });
      temp.sort(function compare(a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateA - dateB;
      });
      
      setUpcomingTask(temp);
    } else {
      setUpcomingTask([]);
    }
  }, [taskListStoreValue]);
  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { backgroundColor: "white" }]}
      forceInset={{ top: "always" }}
    >
      <Header
        title={StringsOfLanguages.tasks}
        whiteColor
        style={{ backgroundColor: PurpleColor.primaryColor }}
        onPressLeft={() => {
          //   NavigationService.navigate("SignIn");
          navigation.toggleDrawer();
        }}
        renderLeft={() => {
          return (
            <Icon name="menu" iconFamily="Ionicons" size={24} color="white" />
          );
        }}
      />
      {!reload && upcomingTask.length > 0 && (
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={[PurpleColor.primaryColor]}
              tintColor={PurpleColor.primaryColor}
              refreshing={reload}
              onRefresh={() => dispatch(getTaskList(true))}
            />
          }
        >
          {upcomingTask.map((elem) => (
            <AllOrder data={elem} fromScreen='Tasks'/>
          ))}
        </ScrollView>
      )}
      {reload && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LoaderScreen text={StringsOfLanguages.tasks} />
        </View>
      )}
      {!reload && upcomingTask.length === 0 && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <NoData text={StringsOfLanguages.tasks} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default UpcomingTask;

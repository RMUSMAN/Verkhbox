import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import MeterReading from "../screens/AppStack/MeterReading";
import ChangePassword from "../screens/ChangePassword";
import ForgotPassword from "../screens/ForgotPassword";
import Tasks from "../screens/OrderStack/Tasks";
import PreviousTask from "../screens/OrderStack/PreviousTask";
import OrderList from "../screens/OrderStack/OrderList";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import CustomSideBarMenu from "./CustomSideBarMenu";
import ChangeLanguage from "../screens/ChangeLanguage";
import ProductInfo from "../screens/OrderStack/SignDocument/ProductInfo";
import OrderMask from "../screens/OrderStack/OrderList/OrderMask";
import MakeSignature from "../screens/OrderStack/SignDocument/MakeSignature";
import Summary from "../screens/OrderStack/SignDocument/Summary";
import Recordings from "../screens/Recordings";
import Dashboard from "../screens/Dashboard";
import RecordTime from "../screens/RecordTime";

const DrawerRoute = createDrawerNavigator(
  {
    OrderList: {
      //Title
      screen: OrderList,
    },
    Tasks: {
      //Title
      screen: Tasks,
    },
    MeterReading: {
      //Title
      screen: MeterReading,
    },
    PreviousTask: { screen: PreviousTask },
    ChangePassword: {
      screen: ChangePassword,
    },
    ChangeLanguage: {
      screen: ChangeLanguage,
    },
    ProductInfo: {
      screen: ProductInfo,
    },
    Summary: {
      screen: Summary,
    },
    RecordTime: {
      screen: RecordTime,
    },
    Recordings: {
      screen: Recordings,
    },

    Dashboard: {
      screen: Dashboard,
    },
    MakeSignature: {
      screen: MakeSignature,
    },

    OrderMask: {
      screen: OrderMask,
    },
  },
  {
    contentComponent: (props) => <CustomSideBarMenu {...props} />,
    initialRouteName: "Dashboard",
  }
);

const RootStack = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
    },
    SignUp: {
      screen: SignUp,
    },
    DrawerRoute: {
      screen: DrawerRoute,
    },
    ForgotPassword: {
      screen: ForgotPassword,
    },
  },
  {
    mode: "modal",
    headerMode: "none",
    initialRouteName: "SignIn",
  }
);

export default RootStack;

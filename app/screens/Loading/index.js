import { Component } from "react";
import SplashScreen from "react-native-splash-screen";
import { NavigationActions, StackActions } from "react-navigation";
import { connect } from "react-redux";
import { toggleAuthMsg, logout } from "../../Redux/store/actions/auth";
import {
  getProductList,
  getTaskList,
  getUserList,
  getOrderList,
  getAllCustomers,
  getAllContacts
} from "../../Redux/store/actions/product";
import jwt_decode from "jwt-decode";
import StringsOfLanguages from "../../util/stringsOfLanguage";

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  onProcess() {
    // SplashScreen.hide();
    this.props.toggleAuthMsg();
    if (this.props.authReducer?.selectedLanguage) {
      StringsOfLanguages.setLanguage(this.props.authReducer.selectedLanguage);
    } else {
      StringsOfLanguages.setLanguage("en");
    }
    if (this.props.authReducer) {
      let { authReducer, navigation } = this.props;

      let loginUser = authReducer.loginUser;
      if (loginUser?.token) {
        let dateTime = new Date(0);
        const decoded = jwt_decode(loginUser?.token);

        dateTime.setUTCSeconds(decoded.exp);
        let currentDataTime = new Date().getTime();
        if (+dateTime < currentDataTime) {
          this.props.logout();

          navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "SignIn" })],
            })
          );
          return;
        }

        navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "DrawerRoute" })],
          })
        );
        this.props.getProductList();
        this.props.getUserList();
        this.props.getTaskList(true);
        this.props.getOrderList(true);
        this.props.getAllCustomers()
        this.props.getAllContacts();
      } else {
        navigation.navigate("SignIn");
      }
    } else {
      this.props.navigation.navigate("SignIn");
    }
  }

  componentDidMount() {
    this.onProcess();
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAuthMsg: () => dispatch(toggleAuthMsg()),
    getProductList: () => dispatch(getProductList()),
    getUserList: () => dispatch(getUserList()),
    getAllCustomers: () => dispatch(getAllCustomers()),
    getAllContacts: () => dispatch(getAllContacts()),
    getTaskList: (value = null) => dispatch(getTaskList(value)),
    getOrderList: (value = null) => dispatch(getOrderList(value)),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);

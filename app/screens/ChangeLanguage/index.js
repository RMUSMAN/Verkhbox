import React, { Component } from "react";
import {
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { BaseStyle, BaseColor, PurpleColor } from "../../config";
import { Header, Icon, Text } from "../../components";
import styles from "./styles";
import StringsOfLanguages from "../../util/stringsOfLanguage";
import { connect } from "react-redux";
import { changeLanguage } from "../../Redux/store/actions/auth";
const LanguageData = [
  {
    id: "1",
    language: "English",
    checked: true,
    code: "en",
  },
  { id: "2", language: "German", code: "de" },
];
class ChangeLanguage extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      country: "",
      language: LanguageData,
      loading: false,
    };
  }
  componentDidMount() {
    const languageCopy = JSON.parse(JSON.stringify(this.state.language));
    const selectedCode = this.props.authReducer.selectedLanguage;
    languageCopy.map((lan, index) => {
      if (lan.code === selectedCode) {
        languageCopy[index].checked = true;
      } else {
        languageCopy[index].checked = false;
      }
    });
    this.setState({ language: languageCopy });
  }

  /**
   * @description Called when setting language is selected
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {object} select
   */
  onChange(select) {
    StringsOfLanguages.setLanguage(select.code);
    this.props.changeLanguage(select.code);
    this.setState({
      language: this.state.language.map((item) => {
        if (item.language == select.language) {
          return {
            ...item,
            checked: true,
          };
        } else {
          return {
            ...item,
            checked: false,
          };
        }
      }),
    });
  }

  render() {
    const { navigation } = this.props;
    let { language } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title={StringsOfLanguages.changeLanguage}
          whiteColor
          style={{ backgroundColor: PurpleColor.primaryColor }}
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
        <View style={styles.contain}>
          <View style={{ width: "100%", height: "100%" }}>
            <FlatList
              data={language}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => this.onChange(item)}
                >
                  <Text
                    body1
                    style={
                      item.checked
                        ? {
                            color: PurpleColor.primaryColor,
                          }
                        : {}
                    }
                  >
                    {item.language}
                  </Text>
                  {item.checked && (
                    <Icon
                      name="check"
                      size={14}
                      color={PurpleColor.primaryColor}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: () => dispatch(changeLanguage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLanguage);

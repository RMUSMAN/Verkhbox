import { Formik } from "formik";
import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import * as Yup from "yup";
import {
  Button,
  CustomTextInput,
  Error,
  Header,
  Icon,
  Text,
} from "../../components";
import { BaseColor, BaseStyle, PurpleColor } from "../../config";
import { login, toggleAuthMsg } from "../../Redux/store/actions/auth";
import StringsOfLanguages from "../../util/stringsOfLanguage";
import styles from "./styles";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Enter Correct Email").required("Enter Email"),
  password: Yup.string()
    .required("Enter Password")
    .min(8, "Password must Contain 8 Characters."),
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      loading: false,
      success: {
        id: true,
        password: true,
      },
      showPassword: false,
    };
  }
  componentWillUnmount() {
    this.props.toggleAuthMsg();
  }

  render() {
    const { navigation, authReducer } = this.props;
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView, { backgroundColor: "white" }]}
        forceInset={{ top: "always" }}
      >
        <Header
          title={StringsOfLanguages.resetPassword}
          renderLeft={() => {
            return (
              <Icon
                name={"arrow-back"}
                iconFamily="Ionicons"
                size={24}
                color="white"
              />
            );
          }}
          whiteColor
          style={{ backgroundColor: PurpleColor.primaryColor   }}
          onPressLeft={() => {
            this.props.navigation.goBack(null);
          }}
        />
        <ScrollView>
          <Formik
            onSubmit={(values) => {
              this.props.login({
                email: values.email,
                password: values.password,
              });
            }}
            initialValues={{
              // email: "qaimali239@gmail.com",
              email: "",
              // password: "Qaim!!12",
              password: "",
            }}
            validationSchema={loginSchema}
          >
            {(formik) => {
              return (
                <View style={styles.contain}>
                  <Image
                    source={require("@assets/images/verkehrs_box.png")}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                  <CustomTextInput
                    icon={
                      <Icon
                        name="envelope"
                        color="#D0D0D0"
                        iconFamily="FontAwesome5"
                        size={20}
                        style={{ marginLeft: "3%" }}
                      />
                    }
                    style={{ marginTop: 5 }}
                    inputStyle={{ minWidth: "85%" }}
                    autoCorrect={false}
                    placeholder="E-Mail"
                    placeholderTextColor={
                      this.state.success.id
                        ? BaseColor.grayColor
                        : BaseColor.primaryColor
                    }
                    value={this.state.id}
                    selectionColor={BaseColor.primaryColor}
                    onChangeText={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <Error message={formik.errors.email} />
                  )}

                  {authReducer.message !== "" && (
                    <Error message={authReducer.message} />
                  )}

                  <View style={{ width: "100%" }}>
                    <Button
                      round
                      // loading={this.props.authReducer.loading}
                      style={{
                        marginTop: 30,
                        backgroundColor: PurpleColor.lightPrimaryColor,
                        justifyContent: "center",
                      }}
                      // onPress={formik.handleSubmit}
                    >
                      <Text whiteColor >{StringsOfLanguages.sendRestPasswordLink}</Text>
                    </Button>
                  </View>
                </View>
              );
            }}
          </Formik>
        </ScrollView>
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
    login: (user) => dispatch(login(user)),
    toggleAuthMsg: () => dispatch(toggleAuthMsg()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

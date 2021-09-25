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
  password: Yup.string().required("Enter Password"),
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
          title=""
          // renderLeft={() => {
          //   return (
          //     <Icon
          //       name={
          //         Platform.OS === "android" ? "arrow-back" : "chevron-back"
          //       }
          //       iconFamily="Ionicons"
          //       size={24}
          //       color="#444"
          //     />
          //   );
          // }}
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
              email: "mail@markus-schiller.de",
              // email: "",
              password: "173a98c",
              // password: "",
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
                  <CustomTextInput
                    icon={
                      <Icon
                        name="key"
                        color="#D0D0D0"
                        iconFamily="FontAwesome5"
                        size={20}
                        style={{ marginLeft: "3%" }}
                      />
                    }
                    rightIcon={
                      formik.values.password ? (
                        <TouchableOpacity
                          style={{
                            minHeight: 44,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onPress={() =>
                            this.setState({
                              showPassword: !this.state.showPassword,
                            })
                          }
                        >
                          <Icon
                            name={this.state.showPassword ? "eye" : "eye-off"}
                            color="#D0D0D0"
                            iconFamily="Ionicons"
                            size={20}
                            style={{ marginLeft: "5%" }}
                          />
                        </TouchableOpacity>
                      ) : null
                    }
                    style={{ marginTop: 15 }}
                    inputStyle={{ minWidth: "75%" }}
                    placeholder={StringsOfLanguages.password}
                    secureTextEntry={!this.state.showPassword}
                    onChangeText={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    value={formik.values.password}
                    selectionColor={BaseColor.primaryColor}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <Error message={formik.errors.password} />
                  )}

                  {authReducer.message !== "" && (
                    <Error message={authReducer.message} />
                  )}

                  <View style={{ width: "100%" }}>
                    <Button
                      round
                      loading={this.props.authReducer.loading}
                      style={{
                        marginTop: 30,
                        backgroundColor: PurpleColor.primaryColor,
                        justifyContent: "center",
                      }}
                      onPress={formik.handleSubmit}
                    >
                      Login
                    </Button>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("ForgotPassword")
                      }
                      style={{ margin: 10 }}
                    >
                      <Text body2 underline>
                        {StringsOfLanguages.forgotPassword}?
                      </Text>
                    </TouchableOpacity>
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

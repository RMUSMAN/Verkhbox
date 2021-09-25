import { Formik } from 'formik';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';

import { connect } from 'react-redux';
import * as Yup from 'yup';
import {
  Button,
  CustomTextInput,
  Error,
  Header,
  Icon,
  PandaBackground,
  Text
} from '../../components';
import { BaseColor, BaseStyle } from '../../config';
import { register, toggleAuthMsg } from '../../Redux/store/actions/auth';
import styles from './styles';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Enter First Name'),
  lastName: Yup.string().required('Enter Last Name'),

  email: Yup.string().email('Enter Correct Email').required('Enter Email'),
  phone: Yup.string()
    .max(
      15,
      'Phone Number length is minimum of 10 characters or more and should not exceeds 15 characters',
    )
    .min(
      10,
      'Phone Number length is minimum of 15 characters or more and should not exceeds 15 characters',
    ),
  password: Yup.string()
    .required('Enter Password')
    .min(
      8,
      'Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character from @$!%*?&',
    )
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      'Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character from @$!%*?&',
    ),
  confirmPassword: Yup.string()
    .required('Enter Confirm Password ')
    .oneOf([Yup.ref('password')], 'make sure both passwords match'),
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      loading: false,
      visible: false,
      success: {
        name: true,
        email: true,
        address: true,
      },
      countryCode: '+237',
    };
  }
  handleCountryModal = () => {
    this.setState({ visible: !this.state.visible });
  };
  handleCountryCode = (countryCode) => {
    
    this.setState({ countryCode });
    this.handleCountryModal();
  };

  onSelect = (country) => {
    this.setState({ visible: !this.state.visible, countryCode: '+' + country?.callingCode[0] });
  };
  componentWillUnmount() {
    this.props.toggleAuthMsg()
  }
  render() {
    const { navigation } = this.props;
    let { loading, name, email, address, success } = this.state;
    return (
      <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
        <PandaBackground>
          <Header
            title=""
            renderLeft={() => {
              return (
                <Icon
                  name={
                    Platform.OS === 'android' ? 'arrow-back' : 'chevron-back'
                  }
                  iconFamily="Ionicons"
                  size={24}
                  color="#444"
                />
              );
            }}
            onPressLeft={() => {
              this.props.navigation.goBack(null)
            }}
          />


          <Formik
            onSubmit={(values) => {
              const user = {
                firstName: values.firstName,
                lastName: values.lastName,
                password: values.password,
                email: values.email,
                phone: this.state.countryCode + values.phone,
              };
              this.props.register(user);
            }}
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              phone: '',
              lastName: '',
              firstName: '',
            }}
            validationSchema={validationSchema}>
            {(formik) => {
              const clearField = (fieldName) => {
                formik.setFieldValue(fieldName, '');
              };
              return (
                <ScrollView>
                  <View style={styles.root}>
                    <Text header semibold >
                      Sign up
            </Text>
                    <View style={styles.contain}>

                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                        }}>
                        <CustomTextInput
                          style={{ width: '49%', marginTop: 10 }}
                          autoCorrect={false}
                          placeholder="First Name"
                          inputStyle={{ minWidth: '49%', paddingLeft: 10 }}
                          onChangeText={formik.handleChange('firstName')}
                          onBlur={formik.handleBlur('firstName')}
                          value={formik.values.firstName}
                        />

                        <CustomTextInput
                          style={[{ marginTop: 10, width: '49%' }]}
                          autoCorrect={false}
                          placeholder="Last Name"
                          inputStyle={{ minWidth: '49%', paddingLeft: 10 }}
                          onChangeText={formik.handleChange('lastName')}
                          onBlur={formik.handleBlur('lastName')}
                          value={formik.values.lastName}
                        />
                      </View>
                      {formik.touched.firstName && formik.errors.firstName && (
                        <Error message={formik.errors.firstName} />
                      )}
                      {formik.touched.lastName && formik.errors.lastName && (
                        <Error message={formik.errors.lastName} />
                      )}

                      <CustomTextInput
                        style={[{ marginTop: 10 }]}
                        autoCorrect={false}
                        placeholder="Email"
                        keyboardType="email-address"
                        inputStyle={{ minWidth: '100%', paddingLeft: 10 }}
                        onChangeText={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <Error message={formik.errors.email} />
                      )}
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity
                          style={[
                            {
                              marginTop: 10,
                              width: '18%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                              borderRadius: 5,
                              backgroundColor: '#F5F5F5',
                            },
                          ]}
                          onPress={this.handleCountryModal}
                          value={email}>
                          <Text
                            style={{
                              color: BaseColor.grayColor,
                              marginRight: 3,
                            }}>
                            {this.state.countryCode}
                          </Text>
                          <Icon
                            name="caret-down"
                            iconFamily="FontAwesome5"
                            size={14}
                            color={BaseColor.grayColor}
                          />
                        </TouchableOpacity>
                        <CustomTextInput
                          style={[{ marginTop: 10, paddingLeft: 10, width: '78%' }]}
                          autoCorrect={false}
                          placeholder="Phone Number"
                          inputStyle={{ minWidth: '75%' }}
                          onChangeText={formik.handleChange('phone')}
                          onBlur={formik.handleBlur('phone')}
                          value={formik.values.phone}
                          keyboardType='phone-pad'
                        />
                      </View>
                      {formik.touched.phone && formik.errors.phone && (
                        <Error message={formik.errors.phone} />
                      )}
                      <CustomTextInput
                        style={[{ marginTop: 10, paddingLeft: 10 }]}
                        autoCorrect={false}
                        placeholder="Password"
                        
                        secureTextEntry
                        onChangeText={formik.handleChange('password')}
                        onBlur={formik.handleBlur('password')}
                        value={formik.values.password}
                      />
                      {formik.touched.password && formik.errors.password && (
                        <Error message={formik.errors.password} />
                      )}
                      <CustomTextInput
                        style={{ marginTop: 10 }}
                        inputStyle={{ minWidth: '100%', paddingLeft: 10 }}
                        autoCorrect={false}
                        placeholder="Confirm Password"
                        secureTextEntry
                        onChangeText={formik.handleChange('confirmPassword')}
                        onBlur={formik.handleBlur('confirmPassword')}
                        value={formik.values.confirmPassword}
                      />
                      {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                          <Error message={formik.errors.confirmPassword} />
                        )}
                      {this.props.authReducer.message !== '' && (
                        <Error message={this.props.authReducer.message} />
                      )}
                      <Text caption1 style={{ marginTop: 10 }}>
                        By clicking "Sign Up" you agree to our terms and
                        conditions as well as our privacy policy
                    </Text>

                    </View>
                  
                  
                  </View>

                  <View style={{ width: '100%', paddingHorizontal: 20, }}>
                    <Button
                      round
                      style={{ marginTop: 20, justifyContent: 'center' }}
                      loading={loading || this.props.authReducer.loading}
                      gradient
                      onPress={formik.handleSubmit}>
                      SIGN UP
                      </Button>
                  </View>

                </ScrollView>
              );
            }}
          </Formik>

        </PandaBackground>
       
        
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
    register: (user) => dispatch(register(user)),
    toggleAuthMsg: () => dispatch(toggleAuthMsg())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

// yarn remove rn-fetch-blob react-native-snap-carousel react-native-ratings react-native-pulse react-native-popup-menu react-native-gifted-chat react-native-fading-slides react-native-create-thumbnail react-native-country-picker-modal react-native-confirmation-code-field react-native-autocomplete-input react-native-app-auth react-countdown json-server 
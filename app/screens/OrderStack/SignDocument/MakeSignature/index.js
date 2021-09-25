import React, { useEffect, useRef, useState, use } from "react";
import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  ToastAndroid,
} from "react-native";
import Signature from "react-native-signature-canvas";

import {
  Button,
  Header,
  Icon,
  Text,
  CustomDropDown,
  DropDownModal,
} from "../../../../components";
import { withNavigationFocus } from "react-navigation";

import { BaseColor, PurpleColor } from "../../../../config";
import { useSelector, useDispatch } from "react-redux";
import StringsOfLanguages from "../../../../util/stringsOfLanguage";
import { uploadSignDoc } from "../../../../Redux/store/actions/product";
// import Orientation from 'react-native-orientation'
import Orientation from "react-native-orientation-locker";
import { TouchableOpacity } from "react-native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const MakeSignature = ({ navigation, isFocused }) => {
  const [signature, setSign] = useState(null);
  const ref = useRef();
  const taskListStoreValue = useSelector(
    (state) => state.productReducer.taskList
  );
  const activeTaskId = useSelector((state) => state.productReducer.activeTask);
  const signatureInfo = useSelector(
    (state) => state.productReducer.signatureInfo
  );
  const signUploading = useSelector(
    (state) => state.productReducer.signUploading
  );
  const contactList = useSelector((state) => state.productReducer.contactList);
  const [activeTask, setActiveTask] = useState({});
  const [contactDropdown, setContactDropdown] = useState([]);
  const [signingPerson, setSigningPerson] = useState({});
  const [showDropdownModal, setShowDropdownModal] = useState(false);

  const handleEmpty = () => {
    
    setSign(null);
  };
  const dispatch = useDispatch();
  const handleSignature = (signature) => {
    
    setSign(signature);
  };

  const handleClear = () => {
    ref.current.clearSignature();
    setSign(null);
  };

  const handleConfirm = () => {
    
    ref.current.readSignature();
    setSign(signature);
    if (signature) {
     
      if (!signingPerson) {
        ToastAndroid.show("Please select Signing Person", ToastAndroid.SHORT);
        return;
      }
      const payload = {
        uploadValue: {
          order_id: signatureInfo.order_id,
          doctype: "image",
          employee_id: signingPerson.value,
          source: signature,
        },
        customer:
          contactList?.find((elem) => elem.id === signingPerson.value) || {},
      };
      setTimeout(() => {
        handleClear();
      }, 2000);
      dispatch(uploadSignDoc(payload));
      // navigation.navigate("Summary");
    }
  };

  useEffect(() => {
    const requiredTask = taskListStoreValue?.tasks?.find(
      (elem) => elem.id === activeTaskId
    );
    if (requiredTask) {
      
      setActiveTask(requiredTask);
      if (requiredTask?.order?.get_contact_name?.id) {
        
        setSigningPerson({
          value: requiredTask?.order?.get_contact_name?.id,
          label: requiredTask?.order?.get_contact_name?.name,
        });
      }
    }
    Orientation.lockToLandscapeLeft();
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      Orientation.lockToPortrait();
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
      const requiredTask = taskListStoreValue?.tasks?.find(
        (elem) => elem.id === activeTaskId
      );
      if (requiredTask) {
        setActiveTask(requiredTask);
        if (requiredTask?.order?.get_contact_name?.id) {
          setSigningPerson({
            value: requiredTask?.order?.get_contact_name?.id,
            label: requiredTask?.order?.get_contact_name?.name,
          });
        }
      }
      Orientation.lockToLandscapeLeft();
    } else {
      Orientation.lockToPortrait();
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    }
  }, [isFocused]);
  const handleBackButton = () => {
    Orientation.lockToPortrait();
    navigation.navigate("OrderMask");
    return true;
  };
  useEffect(() => {
    if (contactList?.length > 0) {
      const contactListCopy = contactList
        .map((elem) => {
          return {
            label: elem.name,
            value: elem.id,
          };
        })
        .filter((elem) => elem);
      setContactDropdown([...contactListCopy]);
    }
  }, [contactList]);
  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;
  
  return (
    <SafeAreaView style={[styles.saveArea, { paddingLeft: "5%" }]}>
      {/* <Header
        whiteColor
        title={StringsOfLanguages.signDocuments}
        onPressLeft={() => {
          navigation.navigate("OrderMask");
        }}
        renderLeft={() => (
          
        )}
        style={{ backgroundColor: PurpleColor.primaryColor }}
      /> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 5,
          // justifyContent: "space-between",
          zIndex: 1000,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("OrderMask");
            Orientation.lockToPortrait();
          }}
        >
          <Icon
            name="close"
            color={PurpleColor.primaryColor}
            iconFamily="MaterialCommunityIcons"
            size={30}
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "78%",
            padding: 10,
            marginBottom: 10,
            borderColor: BaseColor.dividerColor,
            borderWidth: 1,
            justifyContent:'space-between',
            flexDirection:'row'
          }}
          onPress={() => setShowDropdownModal(true)}
        >
          <Text>{signingPerson.label}</Text>
          <Icon
            name="caret-down"
            color={PurpleColor.primaryColor}
            iconFamily="Ionicons"
            size={15}
            
          />
        </TouchableOpacity>
      </View>

      {/* <View
        style={{
          padding: 10,
          borderWidth: 1,
          borderColor: "black",
          flexDirection: "row",
          marginBottom: 10,
          paddingHorizontal: 20,
        }}
      >
        <Text body2 semibold style={{ width: "50%" }}>
          {StringsOfLanguages.Order} :{" "}
          <Text body2 regular>
            {activeTask?.order?.order_number}
          </Text>
        </Text>
        <Text body2 semibold>
          {StringsOfLanguages.date} :{" "}
          <Text body2 regular>
            {activeTask?.order?.start_date}
          </Text>
        </Text>
      </View>
       */}
      {/* <View
        style={{
          paddingHorizontal: 10,
        }}
      >
        <Text body2 semibold>
          {StringsOfLanguages.signPreview}
        </Text>
      </View>
      <View style={styles.preview}>
        {signature ? (
          <Image
            resizeMode={"contain"}
            style={{ width: "100%", height: 114 }}
            source={{ uri: signature }}
          />
        ) : null}
      </View> */}
      {/* <View
        style={{
          padding: 10,
          
        }}
      >
        <Text body2 semibold>
          {StringsOfLanguages.signBoard}
        </Text>
      </View> */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          zIndex: 10,
        }}
      >
        <Signature
          onOK={handleSignature}
          webStyle={style}
          ref={ref}
          style={{
            maxHeight: 0.7 * height,
            backgroundColor: "red",
            width: "70%",
            zIndex: 100,
          }}
          androidHardwareAccelerationDisabled={true}
          disabled={true}
        />
        <View style={{ padding: 10 }}>
          <Button
            style={{
              backgroundColor: PurpleColor.lightPrimaryColor,
              justifyContent: "center",
              marginBottom: 10,
            }}
            onPress={handleConfirm}
            loadingColor={"grey"}
            loading={signUploading}
            icon={
              <Icon
                name="check"
                color="white"
                size={30}
                iconFamily="MaterialCommunityIcons"
              />
            }
          >
            <Text body1 whiteColor></Text>
          </Button>

          <Button
            style={{
              backgroundColor: "#FB9E9ECC",
              justifyContent: "center",
            }}
            onPress={handleClear}
            disabled={!signature}
            icon={
              <Icon
                name="restart"
                size={30}
                color={!signature ? "white" : "black"}
                iconFamily="MaterialCommunityIcons"
              />
            }
          >
            <Text body1 whiteColor></Text>
          </Button>
        </View>
      </View>
      {showDropdownModal && (
        <DropDownModal
          isVisible={showDropdownModal}
          setSelected={(elem) => {
            setSigningPerson(elem);
            setShowDropdownModal(false);
          }}
          selected={signingPerson}
          closeModal={() => setShowDropdownModal(false)}
          optionList={contactDropdown}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  preview: {
    width,
    height: 114,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  saveArea: {
    flex: 1,
    backgroundColor: "white",
  },
  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10,
  },
});

export default withNavigationFocus(MakeSignature);

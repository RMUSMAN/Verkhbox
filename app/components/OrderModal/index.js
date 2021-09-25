import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon, Text, Header } from "../";
import { PurpleColor } from "../../config";

import styles from "./styles";

function OrderModal({ visible, handleClose, children, heading }) {
  // const dispatch = useDispatch();
  // const loginUser = useSelector((state) => state.authReducer.loginUser);

  // useEffect(() => {

  // }, []);

  return (
    <Modal
      isVisible={visible}
      onRequestClose={handleClose}
      style={{ flex: 1, margin: 0, backgroundColor: "red" }}
    >
      <SafeAreaView
        style={styles.saveArea}
      >
        <Header
        whiteColor
          title={heading}
          onPressLeft={handleClose}
          renderLeft={() => (
            <Icon
              name="close"
              color="white"
              iconFamily="MaterialCommunityIcons"
              size={30}
              style={{ marginLeft: 10 }}
            />
          )}
          style={{backgroundColor:PurpleColor.primaryColor}}
        />

        {/* <ScrollView>  */}

        {children}
        {/* </ScrollView> */}
      </SafeAreaView>
    </Modal>
  );
}

export default OrderModal;

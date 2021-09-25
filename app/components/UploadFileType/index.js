import React from "react";
import { View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { PurpleColor } from "../../config";
import StringsOfLanguages from "../../util/stringsOfLanguage";
import { Text, Icon } from "../index";
import styles from "./styles";

function UploadFileType({
  showModal,
  handleClose,
  selectFile,
  selectGallery,
}) {
  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => handleClose()}
      onSwipeComplete={() => handleClose()}
      swipeDirection={["down"]}
      style={styles.bottomModal}
    >
      <View style={styles.contentFilterBottom}>
        <View style={styles.contentSwipeDown}>
          <View style={styles.lineSwipeDown} />
        </View>

        <View style={{marginTop:10}}>
          <Text alignCenter callout>
            {StringsOfLanguages.addFoto}
          </Text>
          <TouchableOpacity
            onPress={() => {
              selectGallery();
              handleClose();
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Text body1>{StringsOfLanguages.imageLibrary}</Text>
            <Icon
              iconFamily="MaterialIcons"
              name="photo-library"
              size={30}
              color={PurpleColor.primaryColor}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            onPress={() => {
              selectFile();
              handleClose();
            }}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text body1>{StringsOfLanguages.camera}</Text>
            <Icon
              iconFamily="MaterialCommunityIcons"
              name="file-pdf"
              size={30}
              color={PurpleColor.primaryColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default UploadFileType;

import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Dimensions, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Icon, Text } from "../../../components";
import { PurpleColor } from "../../../config";
import StringsOfLanguages from "../../../util/stringsOfLanguage";
import styles from "./styles";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const DropDownModal = ({
  isVisible,
  optionList,
  selected,
  closeModal,
  setSelected,
}) => {
  const [selectedOption, setSelectedOption] = useState(selected);
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      style={styles.bottomModal}
    >
      
      <View style={styles.optionModalBackground}>
        <View style={styles.optionsModalWrapper}>
          <ScrollView contentContainerStyle={{ width: height - 80 }}>
            {optionList &&
              optionList.map((elem) => (
                <TouchableOpacity
                  style={styles.dropDownItem}
                  onPress={() => setSelectedOption(elem)}
                >
                  <Text footnote>{elem.label}</Text>

                  {selectedOption.value === elem.value && (
                    <Icon
                      name="check"
                      iconFamily="Entypo"
                      size={24}
                      color={PurpleColor.primaryColor}
                    />
                  )}
                </TouchableOpacity>
              ))}
          </ScrollView>
          <View style={styles.actionRow}>
            <TouchableOpacity onPress={closeModal}>
              <Text body1 grayColor style={{ marginHorizontal: 10 }}>
                {StringsOfLanguages.Cancel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelected(selectedOption)}>
              <Text body1 style={{ color: PurpleColor.primaryColor}}>
                {StringsOfLanguages.Select}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
    </Modal>
  );
};

export default DropDownModal;

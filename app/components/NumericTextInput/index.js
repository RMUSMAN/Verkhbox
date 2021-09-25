import PropTypes from "prop-types";
import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import styles from "./styles";
import { BaseStyle, BaseColor } from "../../config";
import Icon from "../Icon";
const NumericTextInput = ({
  style,
  styleText,
  icon,
  placeholder,
  keyboardType,
  placeholderTextColor,
  onChangeText,
  onBlur,
  value,
  secureTextEntry,
  clearField,
  inputStyle,
  multiline,
  numberOfLines,
  shadowInput,
  editable,
  rightIcon,
  textAlignVertical,
  textAlign,
  onSubmitEditing,
  defaultValue,
  onEndEditing,
}) => {
  const [currentValue, setCurrentValue] = useState("");
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);
  return (
    <View style={[BaseStyle.iconInputContainer, style]}>
      {icon ? icon : null}
      <TextInput
        style={[
          BaseStyle.textInputWithIcon,
          inputStyle,
          shadowInput && styles.shadowInput,
        ]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={placeholderTextColor}
        onChangeText={setCurrentValue}
        onBlur={() => onBlur(currentValue)}
        textAlignVertical={textAlignVertical}
        textAlign={textAlign}
        value={currentValue}
        onSubmitEditing={onSubmitEditing}
        defaultValue={defaultValue}
        onEndEditing={() => onEndEditing(currentValue)}
        // editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines ? numberOfLines : 1}
        secureTextEntry={secureTextEntry}
      />
      {rightIcon ? rightIcon : null}
    </View>
  );
};

export default NumericTextInput;

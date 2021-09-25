import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { BaseColor } from "../../config";
import isEqual from "lodash/isEqual";
const CustomDropDown = ({
  itemList,
  style,
  searchable,
  handleSelected,
  placeholder,
  initialValue = null,
  zIndexInverse = undefined,
  zIndex = undefined,
  multiple = false,
  dropDownContainerStyle,
  dropDownMaxHeight = 300,
  selectedValue = null,
  disabled = false,
  onPress,
  closeAfterSelecting,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(itemList);

  useEffect(() => {
    setItems(itemList);
  }, [itemList]);
  useEffect(() => {
    if (!isEqual(value, initialValue)) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      searchable={searchable}
      style={style}
      placeholder={placeholder}
      zIndex={zIndex}
      dropDownMaxHeight={dropDownMaxHeight}
      multiple={multiple}
      disabled={disabled}
      closeAfterSelecting={closeAfterSelecting}
      onPress={onPress}
      onChangeValue={(value) => {
        handleSelected(value);
      }}
      zIndexInverse={zIndexInverse}
      style={[{ borderColor: BaseColor.grayColor }, style]}
      searchContainerStyle={{ borderColor: BaseColor.grayColor }}
      dropDownContainerStyle={[
        {
          borderColor: BaseColor.grayColor,
          height: 1000,
        },
        dropDownContainerStyle,
      ]}
      listMode="SCROLLVIEW"
      scrollViewProps={{
        nestedScrollEnabled: true,
        horizontal: false,
        persistentScrollbar: true,
      }}
    />
  );
};

export default CustomDropDown;

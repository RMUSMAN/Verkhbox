import React from "react";
import { ActivityIndicator, View } from "react-native";
import { BaseColor, PurpleColor } from "../../config";
import { Text } from "..";
import StringsOfLanguages from "../../util/stringsOfLanguage";

const Loader = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator
        size="large"
        color={PurpleColor.primaryColor}
        style={{ marginVertical: 10 }}
      />
      <Text body1>{StringsOfLanguages.loading} {props.text}...</Text>
    </View>
  );
};

export default Loader;

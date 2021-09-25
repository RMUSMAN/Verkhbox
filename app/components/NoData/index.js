import React from "react";
import { ActivityIndicator, View, Image } from "react-native";
import { BaseColor } from "../../config";
import { Text } from "..";
import StringsOfLanguages from "../../util/stringsOfLanguage";
const NoData = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("@assets/images/no-data.png")}
        style={{ marginVertical: 10, width: 50, height: 50 }}
      />
      <Text body1>{StringsOfLanguages.sorryNo} {props.text} {StringsOfLanguages.found}.</Text>
    </View>
  );
};

export default NoData;

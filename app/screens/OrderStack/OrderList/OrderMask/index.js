import React, { Component } from "react";
import { Dimensions, View, SafeAreaView } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { OrderModal, Text, Icon, Header } from "../../../../components";
import { BaseColor, PurpleColor } from "../../../../config";
import DeliveryTab from "./DeliveryTab";
import ReturnTab from "./ReturnTab";
import StockTab from "./StockEditTab";
import TaskTab from "./TaskTab";

import styles from "./styles";
import StringsOfLanguages from "../../../../util/stringsOfLanguage";

const width = Dimensions.get("screen").width;
export default class OrderMask extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      index: 0,
      routes: [
        { key: "stock", title: StringsOfLanguages.stockEdit },
        { key: "return", title: StringsOfLanguages.return },
        { key: "delivery", title: StringsOfLanguages.delivery },
        { key: "task", title: StringsOfLanguages.task },
      ],
    };
  }

  // When tab is activated, set what's index value
  _handleIndexChange = (index) =>
    this.setState({
      index,
    });

  // Customize UI tab bar
  _renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      inactiveColor={BaseColor.grayColor}
      activeColor={BaseColor.textPrimaryColor}
      renderLabel={({ route, focused, color }) => (
        <View style={{ flex: 1, width: 100, alignItems: "center" }}>
          <Text headline semibold={focused} style={{ color }}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  // Render correct screen container when tab is activated
  _renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "stock":
        return <StockTab jumpTo={jumpTo} />;
      case "return":
        return <ReturnTab jumpTo={jumpTo} />;
      case "delivery":
        return <DeliveryTab jumpTo={jumpTo} />;
      case "task":
        return <TaskTab jumpTo={jumpTo} />;
    }
  };

  render() {
    const { visible, handleClose, navigation } = this.props;
    return (
      <SafeAreaView style={styles.saveArea}>
        <Header
          whiteColor
          title={StringsOfLanguages.productMovement}
          onPressLeft={()=>{
            const fromScreen = navigation?.state?.params?.fromScreen;
            navigation.navigate(fromScreen)
          }}
          renderLeft={() => (
            <Icon
              name="close"
              color="white"
              iconFamily="MaterialCommunityIcons"
              size={30}
              style={{ marginLeft: 10 }}
            />
          )}
          style={{ backgroundColor: PurpleColor.primaryColor }}
        />

        <TabView
          swipeEnabled={true}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
      </SafeAreaView>
    );
  }
}

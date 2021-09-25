import React from "react";
import { StyleSheet, Dimensions, View, SafeAreaView } from "react-native";
import { Header, Icon } from "../index";
import Pdf from "react-native-pdf";
import Modal from "react-native-modal";
import { BaseStyle, BaseColor } from "../../config";

export default class PDFViewer extends React.Component {
  render() {
    
    const { pdfModal, url, closeModal } = this.props;
    const source = {
        uri: url,
        cache: true,
      };
    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf'};

    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

    return (
      <Modal isVisible={pdfModal} style={{ flex: 1, margin: 0 }}>
        <SafeAreaView
          style={[BaseStyle.safeAreaView, { backgroundColor: "black" }]}
          forceInset={{ top: "always" }}
        >
          <Header
            style={{ backgroundColor: "black" }}
            title=""
            renderRight={() => {
              return (
                <Icon
                  iconFamily="FontAwesome5"
                  name="times"
                  size={20}
                  color={BaseColor.whiteColor}
                />
              );
            }}
            onPressRight={() => {
              closeModal();
            }}
            barStyle="light-content"
          />
          <Pdf
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              
            }}
            onPageChanged={(page, numberOfPages) => {
              
            }}
            onError={(error) => {
              
            }}
            onPressLink={(uri) => {
              
            }}
            style={styles.pdf}
          />
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

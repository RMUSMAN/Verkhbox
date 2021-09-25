import UploadDoc from "@assets/images/upload_doc.svg";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CustomDropDown,
  Header,
  Icon,
  PdfViewer,
  PreviewImage,
  Text,
} from "../../../../components";
import moment from "moment";
import { PurpleColor } from "../../../../config";
import NavigationService from "../../../../navigation/NavigationService";
import { uploadSignDoc } from "../../../../Redux/store/actions/product";
import StringsOfLanguages from "../../../../util/stringsOfLanguage";
import styles from "./styles";
const width = Dimensions.get("screen").width;

const Summary = ({ navigation, ...props }) => {
  const taskLoading = useSelector((state) => state.productReducer.taskLoading);
  const taskListStoreValue = useSelector(
    (state) => state.productReducer.taskList
  );

  const signUploading = useSelector(
    (state) => state.productReducer.signUploading
  );
  const contactList = useSelector((state) => state.productReducer.contactList);
  const signatureInfo = useSelector(
    (state) => state.productReducer.signatureInfo
  );
  const handleEmail = () => {
    let body = "<p>Hi here is signature docs link.</p><p>Signing:</p>";
    if (signatureInfo?.signDocs?.length > 0) {
      signatureInfo?.signDocs.map((elem) => {
        body += `<p>${elem?.customer?.customer_name} : ${elem.path}</p>`;
      });
    }
    if (signatureInfo?.orderDocs?.length > 0) {
      body += "<p>Signing Docs:</p>";
      signatureInfo?.orderDocs.map((elem) => {
        body += `${elem?.customer?.customer_name} : ${elem.path}`;
      });
    }

   
  };

  const [productType, setProductType] = useState("Delivered");
  const [showImageList, setShowImageList] = useState(false);
  const [doc, setDoc] = useState([]);
  const activeTaskId = useSelector((state) => state.productReducer.activeTask);
  const [contactPerson, setContactPerson] = useState("");
  const [showMediaType, setShowMediaType] = useState(false);
  const [activeTask, setActiveTask] = useState({});
  const [showPdf, setShowPdf] = useState(false);

  const [contactDropdown, setContactDropdown] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const requiredTask = taskListStoreValue?.tasks?.find(
      (elem) => elem.id === activeTaskId
    );
    if (requiredTask) {
      setActiveTask(requiredTask);
      if (requiredTask?.order?.get_contact_name?.id) {
        console.log(
          "🚀 ~ file: index.js ~ line 99 ~ useEffect ~ requiredTask?.order?.get_contact_name?.id",
          requiredTask?.order?.get_contact_name?.id
        );
        setContactPerson(requiredTask?.order?.get_contact_name?.id);
      }
    }

    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);
  const handleBackButton = () => {
    NavigationService.navigate("OrderMask");
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
  const handleSelectFile = async () => {
    if (!contactPerson) {
      ToastAndroid.show("Please select Signing Person", ToastAndroid.SHORT);
      return;
    }
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
      RNFS.readFile(res.uri, "base64").then((result) => {
        // console.log(result);
        const payload = {
          uploadValue: {
            order_id: signatureInfo.order_id,
            doctype: "image",
            source: result,
            employee_id: contactPerson,
          },
          customer:
            contactList?.find((elem) => elem.id === contactPerson) || {},
        };
        if (res.type.includes("pdf")) {
          payload.uploadValue.doctype = "pdf";
        } else {
          payload.uploadValue.source = `data:image/image/${res.type};base64,${result}`;
        }

        dispatch(uploadSignDoc(payload));
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  const handleImages = (data) => {
    if (
      data.includes(".png") ||
      data.includes(".jpeg") ||
      data.includes(".jpg") ||
      data.includes(".gif")
    ) {
      setShowImageList(true);
    } else {
      setShowPdf(true);
    }

    setDoc([data]);
  };

  return (
    <SafeAreaView style={styles.saveArea}>
      <Header
        whiteColor
        title={StringsOfLanguages.signDocuments}
        onPressLeft={() => {
          navigation.navigate("OrderMask");
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
      {!signUploading ? (
        <View style={{ flex: 1 }}>
          <View
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
              {moment().format("DD.MM.YYYY")}
              </Text>
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: "black",
              marginBottom: 20,
            }}
          >
            <Text body2>{StringsOfLanguages.recipient}</Text>
            <CustomDropDown
              itemList={contactDropdown}
              handleSelected={setContactPerson}
              placeholder={StringsOfLanguages.contactPerson}
              initialValue={activeTask?.order?.get_contact_name?.id}
              zIndex={1000}
              zIndexInverse={3000}
              dropDownContainerStyle={{
                height: "auto",
                zIndex: 1000,
                backgroundColor: "white",
                height: 90,
              }}
            />

            <View style={{ paddingVertical: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <Text body2 style={{ width: "45%" }}>
                  {StringsOfLanguages.customerName}:
                </Text>
                <Text body2 style={{ width: "60%" }}>
                  {activeTask?.order?.get_customer?.customer_name}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text body2 style={{ width: "45%" }}>
                  {StringsOfLanguages.customerCity}:
                </Text>
                <Text body2 style={{ width: "60%" }}>
                  {activeTask?.order?.get_customer?.Location}
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text body2 style={{ width: "45%" }}>
                  {StringsOfLanguages.customerAddress}:
                </Text>
                <Text body2 style={{ width: "60%" }}>
                  {activeTask?.order?.get_customer?.address}
                </Text>
              </View>
            </View>
          </View>
          <ScrollView
            nestedScrollEnabled={true}
            style={{ flex: 1, padding: 10, zIndex: 1 }}
          >
            <View>
              <Text body2 semibold>
                {StringsOfLanguages.signing}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => NavigationService.navigate("ProductInfo")}
              >
                <UploadDoc />
              </TouchableOpacity>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {signatureInfo?.signDocs?.map((elem) => (
                  <TouchableOpacity
                    onPress={() => handleImages(elem.path)}
                    style={{ marginLeft: 10, maxWidth: 50 }}
                  >
                    <Icon
                      name="file"
                      iconFamily="MaterialCommunityIcons"
                      size={40}
                      style={{ marginVertical: 10 }}
                    />

                    <Text caption1>{elem?.customer?.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View>
              <Text body2 semibold>
                {StringsOfLanguages.documents}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={handleSelectFile}>
                <UploadDoc />

                <Text body2 semibold>
                  {StringsOfLanguages.addDocument}
                </Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {signatureInfo?.orderDocs?.map((elem) => (
                  <TouchableOpacity
                    onPress={() => handleImages(elem.path)}
                    style={{ marginLeft: 10, maxWidth: 50 }}
                  >
                    <Icon
                      name="file"
                      iconFamily="MaterialCommunityIcons"
                      size={40}
                      style={{ marginVertical: 10 }}
                    />

                    <Text caption1>{elem?.customer?.customer_name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Button
              style={{
                marginVertical: 10,
                marginBottom: 30,
                backgroundColor: PurpleColor.lightPrimaryColor,
                justifyContent: "center",
              }}
              loading={taskLoading}
              loadingColor={"grey"}
              onPress={handleEmail}
            >
              <Text body1 whiteColor>
                {StringsOfLanguages.sendEmail}
              </Text>
            </Button>
          </ScrollView>
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            size="large"
            color={PurpleColor.primaryColor}
            style={{ marginVertical: 10 }}
          />
        </View>
      )}
      {showImageList && (
        <PreviewImage
          imagesModal={showImageList}
          photos={doc}
          indexSelected={0}
          closeModal={() => setShowImageList(!showImageList)}
        />
      )}
      {showPdf && (
        <PdfViewer
          closeModal={() => setShowPdf(!showPdf)}
          url={doc}
          pdfModal={showPdf}
        />
      )}
    </SafeAreaView>
  );
};

export default Summary;

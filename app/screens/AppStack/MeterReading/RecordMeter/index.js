import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Dimensions, ScrollView, View
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  Button, CustomDropDown, CustomTextInput, Error, OrderModal,
  Text, UploadMediaType
} from "../../../../components";
import { BaseColor, PurpleColor } from "../../../../config";
import { addMeterReading } from "../../../../Redux/store/actions/product";
import StringsOfLanguages from "../../../../util/stringsOfLanguage";
import styles from "./styles";



const meterSchema = Yup.object().shape({
  selectedOrder: Yup.string(
    `${StringsOfLanguages.please} ${StringsOfLanguages.selectOrder}`
  )
    .required(`${StringsOfLanguages.please} ${StringsOfLanguages.selectOrder}`)
    .nullable(),
  meterNumber: Yup.string().required(
    `${StringsOfLanguages.pleaseEnter} ${StringsOfLanguages.meterNumber}`
  ),
  meterReading: Yup.string().required(
    `${StringsOfLanguages.pleaseEnter} ${StringsOfLanguages.meterReading}`
  ),
});


const width = Dimensions.get("screen").width;
function RecordMeter({ visible, handleClose, selectedTestData }) {
  const dispatch = useDispatch();
  // const loginUser = useSelector((state) => state.authReducer.loginUser);
  const [sortOrder, setSortOrder] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSource, setFileSource] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showMediaType, setShowMediaType] = useState(false);
  const orderList = useSelector((state) => state.productReducer.orderList);
  const meterReadingLoading = useSelector(
    (state) => state.productReducer.meterReadingLoading
  );

  const [orderDropDown, setOrderDropDown] = useState([]);
  useEffect(() => {
    const orderDropDownCopy = orderList.map((elem) => {
      return {
        label: elem.order_number,
        value: elem.id,
      };
    });
    setOrderDropDown(orderDropDownCopy);
  }, [orderList]);

  const handleAddGallery = () => {
    var options = {
      title: "Select Image",
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
      customButtons: [
        {
          name: "customOptionKey",
          title: "Choose Photo",
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      includeBase64: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        let source = response.uri;
        let path = response.uri;
        setFileName("meter_image.jpeg");
        setFileSource(
          `data:image/image/${response.type};base64,${response.base64}`
        );
      }
    });
  };

  const handleAddCamera = () => {
    var options = {
      title: "Select Image",
      quality: 1,
      maxWidth: 700,
      maxHeight: 700,
      customButtons: [
        {
          name: "customOptionKey",
          title: "Choose Photo",
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      includeBase64: true,
    };
    launchCamera(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        let source = response.uri;
        let path = response.uri;
        setFileName("meter_image.jpeg");
        setFileSource(
          `data:image/image/${response.type};base64,${response.base64}`
        );
      }
    });
  };
  return (
    <Formik
      onSubmit={(values, { resetForm }) => {
        if (!fileSource) {
          setErrorMessage("Please Select Foto");
          return;
        }
        setErrorMessage("");
        setFileName("");
        resetForm({});
        const payload = {
          order_id: values.selectedOrder,
          meter_number: values.meterNumber,
          reading: values.meterReading,
          photo: fileSource,
        };

        dispatch(addMeterReading(payload));
        setFileSource("");
      }}
      initialValues={{
        selectedOrder: "",
        meterNumber: "",
        meterReading: "",
      }}
      validationSchema={meterSchema}
    >
      {(formik) => {
        return (
          <ScrollView style={{ flex: 1, padding: 20 }}>
            <View style={{ marginTop: 15 }}>
              <Text body1>{StringsOfLanguages.Order}</Text>

              <CustomDropDown
                itemList={orderDropDown}
                searchable={true}
                handleSelected={(value) =>
                  formik.setFieldValue("selectedOrder", value)
                }
                placeholder={StringsOfLanguages.selectOrder}
              />
              {formik.touched.selectedOrder && formik.errors.selectedOrder && (
                <Error message={formik.errors.selectedOrder} />
              )}
            </View>

            <View style={{ marginTop: 15 }}>
              <Text body1>
                {StringsOfLanguages.meterNumber}
                <Text style={{ color: "red" }}> *</Text>
              </Text>

              <CustomTextInput
                style={{ marginTop: 10, paddingHorizontal: 5 }}
                placeholder="1234232"
                inputStyle={{ minWidth: "95%" }}
                onChangeText={formik.handleChange("meterNumber")}
                onBlur={formik.handleBlur("meterNumber")}
                value={formik.values.meterNumber}
              />
              {formik.touched.meterNumber && formik.errors.meterNumber && (
                <Error message={formik.errors.meterNumber} />
              )}
            </View>
            <View style={{ marginTop: 15 }}>
              <Text body1>
                {StringsOfLanguages.reading}
                <Text style={{ color: "red" }}> *</Text>
              </Text>

              <CustomTextInput
                style={{ marginTop: 10, paddingHorizontal: 5 }}
                placeholder="12423523"
                inputStyle={{ minWidth: "95%" }}
                onChangeText={formik.handleChange("meterReading")}
                onBlur={formik.handleBlur("meterReading")}
                value={formik.values.meterReading}
              />
              {formik.touched.meterReading && formik.errors.meterReading && (
                <Error message={formik.errors.meterReading} />
              )}
            </View>

            <View
              style={{
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: BaseColor.dividerColor,
              }}
            >
              <Text body1>{StringsOfLanguages.Document}</Text>

              <Button
                style={[styles.btnLight, { height: 30 }]}
                onPress={() => setShowMediaType(true)}
              >
                <Text body2>{StringsOfLanguages.addFoto}</Text>
              </Button>
              {fileSource !== "" && fileName !== "" && (
                <Text body1 style={{ marginVertical: 15 }}>
                  {fileName}
                </Text>
              )}
            </View>
            {errorMessage !== "" && <Error message={errorMessage} />}
            
            <Button
              style={{
                marginVertical: 20,

                backgroundColor: PurpleColor.lightPrimaryColor,
                justifyContent: "center",
              }}
              loading={meterReadingLoading}
              onPress={formik.handleSubmit}
            >
              <Text body1 whiteColor>
                {StringsOfLanguages.Add}
              </Text>
            </Button>
            {showMediaType && (
              <UploadMediaType
                showModal={showMediaType}
                handleClose={() => setShowMediaType(false)}
                selectCamera={handleAddCamera}
                selectGallery={handleAddGallery}
              />
            )}
          </ScrollView>
        );
      }}
    </Formik>
  );
  return (
    <OrderModal
      visible={visible}
      handleClose={handleClose}
      heading="Record Meter Reading"
    ></OrderModal>
  );
}

export default RecordMeter;

import React, { useState, useEffect } from "react";
import {
  Linking,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Cell, Table, TableWrapper } from "react-native-table-component";
import {
  Button,
  Icon,
  OrderModal,
  Text,
  UploadMediaType,
  PreviewImage,
  PdfViewer,
} from "../../../../components";
import styles from "./styles";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { uploadTaskImage } from "../../../../Redux/store/actions/product";
import { PurpleColor } from "../../../../config";
import StringsOfLanguages from "../../../../util/stringsOfLanguage";

function OrderDocs({
  visible,
  handleClose,
  selectedTestData,
  docs,
  orderId,
  orderListType,
}) {
  const [showImageList, setShowImageList] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [showMediaType, setShowMediaType] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState([
    StringsOfLanguages.category,
    StringsOfLanguages.fileName,
    StringsOfLanguages.date,
    StringsOfLanguages.action,
  ]);
  const imageUploading = useSelector(
    (state) => state.productReducer.imageUploading
  );

  const dispatch = useDispatch();

  const actionElement = (data, index) => (
    <TouchableOpacity
      onPress={() => {
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
        setActiveImageIndex(index);
      }}
    >
      <View style={styles.btn}>
        <Text body2 style={styles.btnText}>
          {StringsOfLanguages.View}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const rowElement = (data, index) => (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 3,
        alignItems: "center",
      }}
    >
      <Text body2 caption1>
        {data}
      </Text>
    </View>
  );
  const headElement = (data) => (
    <View style={{ padding: 3, alignItems: "center" }}>
      <Text body2 semibold>
        {data}
      </Text>
    </View>
  );

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

        const uploadValue = {
          order_id: orderId,
          source: `data:image/image/${response.type};base64,${response.base64}`,
        };
        const payload = {
          type: orderListType ? "orderList" : "task",
          uploadValue,
        };
        dispatch(uploadTaskImage(payload));
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

        const uploadValue = {
          order_id: orderId,
          source: `data:image/image/${response.type};base64,${response.base64}`,
        };
        const payload = {
          type: orderListType ? "orderList" : "task",
          uploadValue,
        };
        dispatch(uploadTaskImage(payload));
      }
    });
  };
  const getUrl = (name) => {
    if (name.includes("mittwaldserver")) {
      return name;
    }
    return `https://p578382.mittwaldserver.info/order-documents/${name}`;
  };
  useEffect(() => {
    const tableDataCopy =
      docs?.length > 0
        ? docs.map((docValue) => [
            docValue?.get_category?.name,
            docValue?.document_name,
            docValue?.created_at,
            getUrl(docValue?.document_file),
          ])
        : [];
    setTableData(tableDataCopy);
  }, [docs]);
  return (
    <OrderModal
      visible={visible}
      handleClose={handleClose}
      heading={StringsOfLanguages.documents}
    >
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <ScrollView horizontal={true}>
          <Table borderStyle={styles.tableBorder}>
            <TableWrapper style={styles.row}>
              {tableHead.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={headElement(cellData)}
                  textStyle={styles.text}
                  width={cellIndex < 3 ? 90 : 60}
                />
              ))}
            </TableWrapper>

            {tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={
                      cellIndex === 3
                        ? actionElement(cellData, index)
                        : rowElement(cellData, index)
                    }
                    textStyle={styles.text}
                    width={cellIndex < 3 ? 90 : 60}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
        </ScrollView>
        <Button
          onPress={() => setShowMediaType(true)}
          style={{
            marginVertical: 10,
            justifyContent: "center",
            backgroundColor: PurpleColor.lightPrimaryColor,
          }}
          loading={imageUploading}
          loadingColor={"grey"}
          disabled={imageUploading}
        >
          <Text body1 whiteColor>
            {StringsOfLanguages.addFoto}
          </Text>
        </Button>
      </ScrollView>

      {showImageList && (
        <PreviewImage
          imagesModal={showImageList}
          photos={
            docs?.length > 0
              ? docs
                  .map((docValue) => {
                    if (
                      data.includes(".png") ||
                      data.includes(".jpeg") ||
                      data.includes(".jpg") ||
                      data.includes(".gif")
                    ) {
                      return getUrl(docValue?.document_file);
                    }
                  })
                  .filter((e) => !!e)
              : []
          }
          indexSelected={activeImageIndex}
          closeModal={() => setShowImageList(!showImageList)}
        />
      )}
      {showPdf && (
        <PdfViewer
          closeModal={() => setShowPdf(!showPdf)}
          url={
            docs?.length > 0
              ? docs.map((docValue) => getUrl(docValue?.document_file))[
                  activeImageIndex
                ]
              : []
          }
          pdfModal={showPdf}
        />
      )}
      {showMediaType && (
        <UploadMediaType
          showModal={showMediaType}
          handleClose={() => setShowMediaType(false)}
          selectCamera={handleAddCamera}
          selectGallery={handleAddGallery}
        />
      )}
    </OrderModal>
  );
}

export default OrderDocs;

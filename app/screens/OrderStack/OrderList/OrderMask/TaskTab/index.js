import React, { Component, useEffect, useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import { Cell, Table, TableWrapper } from "react-native-table-component";
import { useSelector, useDispatch } from "react-redux";
import {
  CustomTextInput,
  Icon,
  Text,
  Button,
  CheckBox,
  UploadMediaType,
  PreviewImage,
} from "../../../../../components";
import { BaseColor, PurpleColor } from "../../../../../config";
import {
  storeTaskWithoutDesp,
  updateTaskProduct,
  updateTaskStatus,
} from "../../../../../Redux/store/actions/product";
import StringsOfLanguages from "../../../../../util/stringsOfLanguage";
import styles from "../styles";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const width = Dimensions.get("screen").width;

/**
 * @description Show when tab Return activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class TaskTab
 * @extends {Component}
 */
const TaskTab = (props) => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([["Product 1", true]]);
  const [confirmed, setConfirmed] = useState(false);
  const [tableHead, setTableHead] = useState(["Task text", "Confirmed"]);
  const [updateDeposition, setUpdateDeposition] = useState([]);

  const [showNote, setShowNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [orderFoto, setOrderFoto] = useState(null);

  const [showImageList, setShowImageList] = useState(false);
  const [showMediaType, setShowMediaType] = useState(false);
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
      <Text footnote semibold>
        {data}
      </Text>
    </View>
  );
  function _alertIndex(index) {
    // alert(`This is row ${index + 1}`);
  }

  const handleCheckbox = () => {
    setConfirmed(!confirmed);
  };
  const actionElement = (data, index) => (
    <TouchableOpacity
      onPress={handleCheckbox}
      style={{
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <CheckBox
        selected={confirmed}
        onPress={handleCheckbox}
        style={{ alignSelf: "center" }}
      />
    </TouchableOpacity>
  );

  const taskList = useSelector((state) => state.productReducer.taskList);
  const taskLoading = useSelector((state) => state.productReducer.taskLoading);
  const activeTask = useSelector((state) => state.productReducer.activeTask);

  useEffect(() => {
    if (taskList?.tasks?.length > 0) {
      const requiredTask = taskList?.tasks.find(
        (elem) => elem.id === activeTask
      );

      if (!requiredTask) return;
      setConfirmed(
        requiredTask.status && requiredTask.status === "confirmed"
          ? true
          : false
      );
      const taskData = [[requiredTask?.text_description, true]];
      setTableData(taskData);
    }
  }, [taskList, activeTask]);

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

        setOrderFoto(
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

        setOrderFoto(
          `data:image/image/${response.type};base64,${response.base64}`
        );
      }
    });
  };
  const getRowData = (rowData, index) => {
    const elements = rowData
      .map((cellData, cellIndex) => {
        return (
          <Cell
            key={cellIndex}
            data={
              cellIndex === 1
                ? actionElement(cellData, index)
                : rowElement(cellData, index)
            }
            textStyle={styles.text}
            width={cellIndex < 1 ? 0.65 * width : 80}
          />
        );
      })
      .filter((elem) => elem);
    return elements;
  };

  const handleSave = () => {
    const requiredTask = taskList?.tasks.find((elem) => elem.id === activeTask);
    if (!requiredTask) return;

    const addValue = {
      task_id: requiredTask.id,
      order_id: requiredTask.order_id,

      status: confirmed ? "confirmed" : "unconfirmed",
      note_field: noteText,
      photo: orderFoto ? orderFoto : undefined,
    };

    dispatch(storeTaskWithoutDesp(addValue));
  };
  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <ScrollView horizontal={true}>
        <Table borderStyle={styles.tableBorder}>
          <TableWrapper style={styles.row}>
            {tableHead.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={headElement(cellData)}
                textStyle={styles.text}
                width={cellIndex < 1 ? 0.65 * width : 80}
              />
            ))}
          </TableWrapper>

          {tableData.length > 0
            ? tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {getRowData(rowData, index)}
                </TableWrapper>
              ))
            : []}
        </Table>
      </ScrollView>
      <View style={{ flexDirection: "row" }}>
        <Button
          style={{
            backgroundColor: "white",
            paddingHorizontal: 5,
          }}
          onPress={() => setShowNote(true)}
        >
          <Text body2>{StringsOfLanguages.addNote}</Text>
        </Button>
        <Button
          style={{
            backgroundColor: "white",
            paddingHorizontal: 5,
          }}
          onPress={() => setShowMediaType(true)}
        >
          <Text body2>{StringsOfLanguages.addFoto}</Text>
        </Button>
      </View>
      {orderFoto && (
        <View style={{ maxWidth: 50, top: -20 }}>
          <TouchableOpacity
            style={{
              marginBottom: 5,
              alignSelf: "flex-end",
              top: 10,
              zIndex: 2000,
              // backgroundColor:'white'
            }}
            onPress={() => {
              setOrderFoto(null);
            }}
          >
            <Icon name="close-circle-outline" iconFamily="Ionicons" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginBottom: 5,
              zIndex: 2000,
              // backgroundColor:'white'
            }}
            onPress={() => setShowImageList(!showImageList)}
          >
            <Icon
              name="file-image"
              iconFamily="MaterialCommunityIcons"
              size={40}
            />
          </TouchableOpacity>
        </View>
      )}

      {showNote && (
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              marginBottom: 5,
              alignSelf: "flex-end",
              top: 20,
              zIndex: 2000,
              // backgroundColor:'white'
            }}
            onPress={() => {
              setShowNote(false);
              setNoteText("");
            }}
          >
            <Icon name="close-circle-outline" iconFamily="Ionicons" size={24} />
          </TouchableOpacity>

          <CustomTextInput
            style={styles.quantityInput}
            inputStyle={{
              backgroundColor: "white",
              width: "100%",
              borderColor: BaseColor.dividerColor,
              borderWidth: 1,
            }}
            placeholder="Add Note"
            onChangeText={setNoteText}
            value={noteText}
          />
        </View>
      )}
      <Button
        style={{
          marginVertical: 15,
          marginBottom: 30,
          backgroundColor: PurpleColor.lightPrimaryColor,
          justifyContent: "center",
        }}
        onPress={handleSave}
        loading={taskLoading}
        loadingColor={"grey"}
      >
        <Text body1 whiteColor>
          {StringsOfLanguages.Save}
        </Text>
      </Button>
      {showImageList && (
        <PreviewImage
          imagesModal={showImageList}
          photos={[orderFoto]}
          indexSelected={0}
          closeModal={() => setShowImageList(!showImageList)}
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
    </ScrollView>
  );
};

export default TaskTab;

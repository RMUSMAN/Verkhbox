import React, { useState, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { Cell, Table, TableWrapper } from "react-native-table-component";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  CustomDropDown,
  CustomTextInput,
  Icon,
  Text,
  UploadMediaType,
  PreviewImage,
} from "../../../../../components";
import groupBy from "lodash/groupBy";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { BaseColor, PurpleColor } from "../../../../../config";
import NavigationService from "../../../../../navigation/NavigationService";
import {
  setSignInfo,
  updateTaskProduct,
} from "../../../../../Redux/store/actions/product";
import StringsOfLanguages from "../../../../../util/stringsOfLanguage";
import styles from "../styles";

const width = Dimensions.get("screen").width;

const ReturnTab = (props) => {
  const productList = useSelector((state) => state.productReducer.productList);
  const taskLoading = useSelector((state) => state.productReducer.taskLoading);
  const taskListStoreValue = useSelector(
    (state) => state.productReducer.taskList
  );

  const activeTask = useSelector((state) => state.productReducer.activeTask);

  const [categoryList, setCategoryList] = useState([]);

  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState([
    StringsOfLanguages.product,
    "Plan",
    StringsOfLanguages.quantity,
    StringsOfLanguages.action,
  ]);
  const [filterDates, setFilterDates] = useState("");
  const [category, setCategory] = useState(-1);
  const dispatch = useDispatch();

  const [showImageList, setShowImageList] = useState(false);
  const [showMediaType, setShowMediaType] = useState(false);

  const [showNote, setShowNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [orderFoto, setOrderFoto] = useState(null);
  const [filterInput, setFilterInput] = useState("");

  const handleFilterInput = (value) => {
    const filteredSuggestions = taskList.filter(
      (suggestion) =>
        suggestion.product_name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    setFilterInput(value);
    setFilteredCategories(filteredSuggestions);
  };
  const getCategoryData = () => {
    let categoryListCopy = [];
    let productListCopy = JSON.parse(JSON.stringify(productList));
    if (!productListCopy) return [];
    if (category && category !== -1) {
      productListCopy = productListCopy.filter(
        (elem) => elem?.get_product_category?.id === category
      );
    }

    productListCopy.map((elem) => {
      categoryListCopy = [...categoryListCopy, elem];
    });
    return [...categoryListCopy];
  };
  const [taskList, setTaskList] = useState(getCategoryData());

  const [filteredCategories, setFilteredCategories] = useState(
    getCategoryData()
  );

  const actionElement = (data, index) => (
    <TouchableOpacity
      onPress={() => {
        var array = [...tableData];
        array.splice(index, 1);
        setTableData(array);
      }}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon name="close-circle-outline" iconFamily="Ionicons" size={24} />
    </TouchableOpacity>
  );
  const clickablePlan = (data, index) => (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        paddingHorizontal: 3,
      }}
      onPress={() => {
        const tableDataCopy = [...tableData];

        tableDataCopy[index][2] = data;
        setTableData(tableDataCopy);
      }}
    >
      <Text body2 caption1>
        {data}
      </Text>
    </TouchableOpacity>
  );
  const quantityInput = (data, index) => (
    <CustomTextInput
      style={styles.quantityInput}
      inputStyle={{
        backgroundColor: "white",
        width: "100%",
        borderColor: BaseColor.dividerColor,
        borderWidth: 1,
      }}
      placeholder=""
      onChangeText={(elem) => {
        const tableDataCopy = [...tableData];

        tableDataCopy[index][2] = elem;
        setTableData(tableDataCopy);
      }}
      value={data ? data.toString() : ""}
      keyboardType="numeric"
    />
  );
  const rowElement = (data, index) => (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 3,
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

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleSelectProduct(item)}
        style={{
          padding: 5,
          borderBottomWidth: 0.8,
          borderBottomColor: BaseColor.dividerColor,
        }}
      >
        <Text body2>{item.product_name}</Text>
      </TouchableOpacity>
    );
  };

  const handleSelectProduct = (item) => {
    const itemValue = [item.product_name, "", 0, true, item];

    const tableDataCopy = Object.assign([], tableData);
    if (tableDataCopy?.length > 0) {
      const isFound = tableDataCopy.some(
        (val) => val[4].id === itemValue[itemValue.length - 1].id
      );

      if (!isFound) {
        tableDataCopy.push(itemValue);
      }
    } else {
      tableDataCopy.push(itemValue);
    }

    setTableData(tableDataCopy);
  };

  useEffect(() => {
    if (productList?.length > 0) {
      const categoryGroups = groupBy(
        productList,
        (elem) => elem.get_product_category?.id
      );
      let categoryListCopy = [];

      Object.keys(categoryGroups).forEach(function (key) {
        if (
          key &&
          categoryGroups[key]?.length > 0 &&
          categoryGroups[key][0]?.get_product_category?.id
        ) {
          categoryListCopy.push({
            label: categoryGroups[key][0]?.get_product_category?.name,
            value: categoryGroups[key][0]?.get_product_category?.id,
          });
        }
      });
      setCategoryList([
        { label: "Select Category", value: -1 },
        ...categoryListCopy,
      ]);
    }
  }, [productList]);

  useEffect(() => {
    const requiredTask = taskListStoreValue?.tasks?.find(
      (elem) => elem.id === activeTask
    );
    if (!requiredTask) return;
    let dispositions = JSON.parse(JSON.stringify(requiredTask?.dispositions));
    dispositions =
      dispositions?.length > 0
        ? dispositions.filter(
            (elem) =>
              elem.type === "plan_return" ||
              elem.type === "delivery" ||
              elem.type === "return"
          )
        : [];
    const groupedTasks = groupBy(dispositions, (elem) => elem.product_id);
    let dispositionsCopy = [];
    for (let [key, value] of Object.entries(groupedTasks)) {
      if (value?.length > 1) {
        const valueCopy = Object.assign({}, value[0]);
        valueCopy.qty = accumulateProducts(
          valueCopy.product_id,
          JSON.parse(JSON.stringify(value))
        );
        dispositionsCopy = [...dispositionsCopy, valueCopy];
      } else {
        dispositionsCopy = [...dispositionsCopy, ...value];
      }
    }
    dispositions =
      dispositionsCopy?.length > 0
        ? dispositionsCopy.map((elem) => [
            elem.product.product_name,
            elem.qty,
            "",
            true,
            { ...elem.product, dispositionId: elem.id },
          ])
        : [];

    setTableData(dispositions);
  }, [taskListStoreValue, activeTask]);
  useEffect(() => {
    setTaskList(getCategoryData());
    setFilteredCategories(getCategoryData());
  }, [category, categoryList]);
  const accumulateProducts = (product_id, dispositions) => {
    const deliveryItems = dispositions.filter(
      (elem) => elem.type === "delivery" && elem.product_id == product_id
    );

    const returnItems = dispositions.filter(
      (elem) => elem.type === "return" && elem.product_id == product_id
    );
    if (returnItems.length <= 0 && deliveryItems.length <= 0) {
      const plan_return = dispositions.find(
        (elem) => elem.product_id == product_id
      );
      return plan_return?.qty ?? 0;
    }
    let deliverySum = 0;
    deliveryItems
      ? deliveryItems.map((elem) => {
          deliverySum = deliverySum + elem?.qty;
        })
      : [];

    let returnSum = 0;
    returnItems
      ? returnItems.map((elem) => {
          returnSum = returnSum + elem?.qty;
        })
      : [];

    return deliverySum - returnSum;
  };
  const handleSave = () => {
    const requiredTask = taskListStoreValue?.tasks?.find(
      (elem) => elem.id === activeTask
    );
    if (!requiredTask) return;
    const taskInfo = requiredTask;

    const addList =
      tableData?.length > 0
        ? tableData
            .map((elem) => {
              if (!elem[2] || elem[2] <= 0) {
                return;
              }
              let objValue = {
                product_id: elem[4].id,
                plan_qty: elem[2],
                added_by_employee: true,
                disposition_type: "plan_return",
              };
              if (elem[4].dispositionId) {
                objValue["id"] = elem[4].dispositionId;
              }
              return objValue;
            })
            .filter((e) => e)
        : [];
    const addValue = {
      task_id: taskInfo.id,
      order_id: taskInfo.order_id,
      dispositions: addList,
      note_field: noteText,
      photo: orderFoto,
    };
    dispatch(updateTaskProduct(addValue));
  };
  const getRowData = (rowData, index) => {
    const elements = rowData
      .map((cellData, cellIndex) => {
        if (cellIndex > 3) return undefined;
        return (
          <Cell
            key={cellIndex}
            data={
              cellIndex === 1
                ? clickablePlan(cellData, index)
                : cellIndex === 2
                ? quantityInput(cellData, index, rowData[rowData.length - 1])
                : cellIndex === 3
                ? actionElement(cellData, index)
                : rowElement(cellData, index)
            }
            textStyle={styles.text}
            width={cellIndex < 1 ? 120 : 70}
          />
        );
      })
      .filter((elem) => elem);
    return elements;
  };
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
  return (
    <ScrollView nestedScrollEnabled={true} style={{ flex: 1, padding: 10 }}>
      <ScrollView horizontal={true}>
        <Table borderStyle={styles.tableBorder}>
          <TableWrapper style={[styles.row, { borderBottomColor: "black" }]}>
            {tableHead.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={headElement(cellData)}
                textStyle={styles.text}
                width={cellIndex < 1 ? 120 : 70}
              />
            ))}
          </TableWrapper>

          {tableData.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {getRowData(rowData, index)}
            </TableWrapper>
          ))}
        </Table>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <CustomTextInput
          style={[styles.searchInput, { maxWidth: 0.62 * width }]}
          inputStyle={{
            backgroundColor: "white",
            width: "100%",
          }}
          placeholder={StringsOfLanguages.typeToFilterProducts}
          onChangeText={handleFilterInput}
          value={filterInput}
        />
        <View style={{ maxWidth: 0.3 * width, minHeight: 44 }}>
          <CustomDropDown
            itemList={categoryList}
            handleSelected={(value) => {
              setCategory(value);
            }}
            dropDownContainerStyle={{ borderRadius: 0 }}
            zIndex={1000}
            style={{
              borderRadius: 0,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}
            placeholder={StringsOfLanguages.category}
          />
        </View>
      </View>
      <View style={styles.categoryBorder}>
        <FlatList
          data={filteredCategories}
          nestedScrollEnabled
          extraData={filteredCategories}
          renderItem={renderItem}
          keyExtractor={(item, index) => item?.id?.toString()}
        />
      </View>
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
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
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
        <Button
          style={{
            backgroundColor: "white",
            paddingHorizontal: 5,
          }}
          onPress={() => {
            const requiredTask = taskListStoreValue?.tasks?.find(
              (elem) => elem.id === activeTask
            );
            if (!requiredTask) return;
            const taskInfo = requiredTask;
            const productValue = {
              task_id: taskInfo.id,
              order_id: taskInfo.order_id,
              tableData,
              type: StringsOfLanguages.returned,
              signDocs: [],
              orderDocs: [],
            };
            dispatch(setSignInfo(productValue));
            handleSave();
            NavigationService.navigate("ProductInfo", { productValue });
          }}
        >
          <Text body2>{StringsOfLanguages.signDocuments}</Text>
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
      <Button
        style={{
          marginVertical: 10,
          marginBottom: 30,
          backgroundColor: PurpleColor.lightPrimaryColor,
          justifyContent: "center",
        }}
        disabled={taskLoading}
        loading={taskLoading}
        loadingColor={"grey"}
        onPress={handleSave}
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

export default ReturnTab;

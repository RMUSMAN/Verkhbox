import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, RefreshControl } from "react-native";
import {
  Button,
  Header,
  Icon,
  Text,
  LoaderScreen,
  NoData,
  CustomDropDown,
} from "../../../components";
import { BaseStyle, PurpleColor } from "../../../config";
import styles from "./styles";
import AllOrder from "./AllOrder";
import { useSelector, useDispatch } from "react-redux";
import { getOrderList } from "../../../Redux/store/actions/product";
import StringsOfLanguages from "../../../util/stringsOfLanguage";
import { groupBy } from "lodash";
const OrderList = (props) => {
  const { navigation } = props;

  const [activeItem, setActiveItem] = useState("allOrder");
  const orderList = useSelector((state) => state.productReducer.orderList);
  const orderReload = useSelector((state) => state.productReducer.orderReload);
  const dispatch = useDispatch();
  const customerList = useSelector(
    (state) => state.productReducer.customerList
  );
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const getSortedArray = (array) => {
    let copy = JSON.parse(JSON.stringify(array));
    if (selectedEmployees?.length > 0) {
      copy = copy?.filter(
        (elem) => selectedEmployees.indexOf(elem?.get_customer?.id) > -1
      );
    }
    copy.sort(function compare(a, b) {
      var dateA = new Date(a.start_date);
      var dateB = new Date(b.start_date);
      return dateB - dateA;
    });
    return copy;
  };
  useEffect(() => {
    if (customerList?.length > 0) {
      const employeeListCopy = customerList.map((elem) => {
        return {
          label: elem.customer_name,
          value: elem.id,
        };
      });
      setEmployeeList(employeeListCopy);
    }
  }, [customerList]);

  useEffect(() => {
    setTimeout(() => {
      setFilteredOrders(getFilteredOrders());

      setLoading(false);
    }, 0);
  }, [orderList, selectedEmployees, selectedLocation]);
  useEffect(() => {
    let locationListCopy = groupBy(orderList, (elem) => elem?.order_location);
    if (!locationListCopy) return;

    locationListCopy = Object.keys(locationListCopy)?.map((elem) => ({
      value: elem,
      label: elem,
    }));
    setLocationList(locationListCopy);
  }, [orderList]);
  const getFilteredOrders = () => {
    if (!orderList || orderList?.length < 1) {
      return;
    }
    let orderListCopy = JSON.parse(JSON.stringify(orderList));
    if (selectedEmployees?.length > 0) {
      orderListCopy = orderListCopy.filter(
        (elem) => selectedEmployees.indexOf(elem?.get_customer?.id) > -1
      );
    }
    if (selectedLocation?.length > 0) {
      orderListCopy = orderListCopy.filter(
        (elem) => selectedLocation.indexOf(elem?.order_location) > -1
      );
    }
    orderListCopy.sort(function compare(a, b) {
      var dateA = new Date(a.start_date);
      var dateB = new Date(b.start_date);
      return dateB - dateA;
    });
    return orderListCopy;
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, { backgroundColor: "white" }]}
      forceInset={{ top: "always" }}
    >
      <Header
        title={StringsOfLanguages.allOrders}
        whiteColor
        style={{ backgroundColor: PurpleColor.primaryColor }}
        onPressLeft={() => {
          //   NavigationService.navigate("SignIn");
          navigation.toggleDrawer();
        }}
        renderLeft={() => {
          return (
            <Icon name="menu" iconFamily="Ionicons" size={24} color="white" />
          );
        }}
      />
      <View style={{ marginVertical: 5, paddingRight: 5, padding: 10 }}>
        <Text body1>{StringsOfLanguages.selectCustomer}</Text>

        <CustomDropDown
          itemList={employeeList}
          closeAfterSelecting={true}
          handleSelected={(selected) => {
            setSelectedEmployees(selected);
            setFilteredOrders([]);
            setLoading(true);
          }}
          placeholder={StringsOfLanguages.selectCustomer}
          zIndex={4000}
          zIndexInverse={1000}
          multiple={true}
          searchable={true}
        />
      </View>
      <View style={{ marginVertical: 5, paddingRight: 5, padding: 10 }}>
        <Text body1>{StringsOfLanguages.selectLocation}</Text>

        <CustomDropDown
          itemList={locationList}
          closeAfterSelecting={true}
          handleSelected={(selected) => {
            setSelectedLocation(selected);
            setFilteredOrders([]);
            setLoading(true);
          }}
          placeholder={StringsOfLanguages.selectLocation}
          zIndex={1000}
          zIndexInverse={4000}
          multiple={true}
          searchable={true}
        />
      </View>
      {orderList?.length > 0 &&
        filteredOrders?.length > 0 &&
        !orderReload &&
        !loading && (
          <ScrollView
            refreshControl={
              <RefreshControl
                colors={[PurpleColor.primaryColor]}
                tintColor={PurpleColor.primaryColor}
                refreshing={orderReload}
                onRefresh={() => dispatch(getOrderList(true))}
              />
            }
          >
            {filteredOrders?.map((elem) => (
              <AllOrder key={elem.id} data={elem} orderListType={true} />
            ))}
          </ScrollView>
        )}
      {(orderReload || loading) && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LoaderScreen text={StringsOfLanguages.Orders} />
        </View>
      )}
      {!orderReload && !loading && filteredOrders?.length === 0 && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <NoData text={StringsOfLanguages.Orders} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderList;

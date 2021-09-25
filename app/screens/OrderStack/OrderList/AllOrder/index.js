import React, { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Text } from "../../../../components";
import OrderDetails from "../OrderDetails";
import OrderDocs from "../OrderDocs";
import OrderTime from "../OrderTime";
import OrderMask from "../OrderMask";
import moment from "moment";

import styles from "./styles";
import { useDispatch } from "react-redux";
import { setActiveTask } from "../../../../Redux/store/actions/product";
import StringsOfLanguages from "../../../../util/stringsOfLanguage";
import NavigationService from "../../../../navigation/NavigationService";
const AllOrder = ({ data, orderListType, order_number, fromScreen }) => {
  const [activeItem, setActiveItem] = useState("");
  const dispatch = useDispatch();
  const closeActiveItem = () => {
    setActiveItem("");
  };
  return (
    <View
      style={{
        margin: 7,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        borderRadius: 0,
        padding: 15,
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.orderItemWithBorder}>
          <Text style={styles.leftItem} body1>
            {StringsOfLanguages.Order}
          </Text>
          <Text body1>
            {!orderListType ? data?.order?.order_number : data?.order_number}
          </Text>
        </View>
        <View style={styles.orderItemWithBorder}>
          <Text style={styles.leftItem} body2 semibold>
            {StringsOfLanguages.Appointment}
          </Text>
          <Text footnote>
            {moment(data?.date).isValid() && !orderListType
              ? moment(data?.date).format("DD.MM.YYYY")
              : moment(data?.start_date).isValid() && orderListType
              ? moment(data?.start_date).format("DD.MM.YYYY")
              : "00.00.0000"}{" "}
            {data?.start_time}
          </Text>
        </View>
        {!orderListType ? (
          <View style={styles.orderItemWithBorder}>
            <Text style={styles.leftItem} body2 semibold>
              {StringsOfLanguages.taskType}
            </Text>
            <Text footnote>{data?.plan_type}</Text>
          </View>
        ) : (
          <View style={styles.orderItemWithBorder}>
            <Text style={styles.leftItem} body2 semibold>
              {StringsOfLanguages.Status}
            </Text>
            <Text style={{ flex: 1, flexWrap: "wrap" }} footnote>
              {data?.status}
            </Text>
          </View>
        )}
        <View style={styles.orderItemWithBorder}>
          <Text style={styles.leftItem} body2 semibold>
            {StringsOfLanguages.taskText}
          </Text>
          <Text style={{ flex: 1, flexWrap: "wrap" }} footnote>
            {!orderListType ? data?.text_description : data?.description}
          </Text>
        </View>
        <View style={styles.orderItemWithBorder}>
          <Text style={styles.leftItem} body2 semibold>
            {StringsOfLanguages.Location}
          </Text>
          <View style={{ flex: 1, flexWrap: "wrap" }}>
            {(data?.order?.order_location ||
              (data?.order_location && orderListType)) && (
              <TouchableOpacity
                onPress={() => {
                  const url = `https://www.google.com/maps/search/?api=1&query=${data?.order?.order_location}`;
                  Linking.canOpenURL(url)
                    .then((supported) => {
                      Linking.openURL(url);
                    })
                    .catch((err) => console.log("error", err));
                }}
              >
                <Text footnote>
                  {!orderListType
                    ? data?.order?.order_location
                    : data?.order_location}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {!orderListType && (
          <View style={styles.orderItemWithBorder}>
            <Text style={styles.leftItem} body2 semibold>
              {StringsOfLanguages.Vehicles}
            </Text>
            <View>
              {data?.vehicles?.map((vehicleData, index) => (
                <View key={vehicleData?.number_plate + "vehicle" + index}>
                  <Text footnote>{vehicleData?.number_plate} </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {!orderListType && (
          <View style={styles.orderItemWithBorder}>
            <Text style={styles.leftItem} body2 semibold>
              {StringsOfLanguages.Colleagues}
            </Text>

            <View>
              <Text footnote>
                {data?.employees
                  ?.map((employeeData, index) => {
                    return (
                      employeeData?.first_name + " " + employeeData?.last_name
                    );
                  })
                  .join(",\n")}
              </Text>
            </View>
          </View>
        )}
      </View>

      <View>
        <Button
          style={styles.btnLight}
          onPress={() => setActiveItem("OrderDetails")}
        >
          <Text footnote whiteColor>
            {StringsOfLanguages.Details}
          </Text>
        </Button>
        <Button
          style={styles.btnLight}
          onPress={() => setActiveItem("OrderDocs")}
        >
          <Text footnote whiteColor>
            {StringsOfLanguages.documents}
          </Text>
        </Button>
        <Button
          style={styles.btnLight}
          onPress={() => setActiveItem("OrderTime")}
        >
          <Text footnote whiteColor>
            {StringsOfLanguages.timeRecord}
          </Text>
        </Button>
        {!orderListType && (
          <Button
            style={styles.btnLight}
            onPress={() => {
              dispatch(setActiveTask(data?.id));
              NavigationService.navigate("OrderMask", { fromScreen });
            }}
          >
            <Text footnote whiteColor>
              {StringsOfLanguages.productMask}
            </Text>
          </Button>
        )}
      </View>
      {activeItem === "OrderDetails" && (
        <OrderDetails
          visible={true}
          details={!orderListType ? data?.order : data}
          handleClose={closeActiveItem}
        />
      )}
      {activeItem === "OrderDocs" && (
        <OrderDocs
          visible={true}
          docs={
            !orderListType
              ? data?.order?.get_order_documents
              : data?.get_order_documents
          }
          handleClose={closeActiveItem}
          orderId={!orderListType ? data?.order_id : data?.id}
          orderListType={orderListType}
        />
      )}
      {activeItem === "OrderTime" && (
        <OrderTime
          visible={true}
          handleClose={closeActiveItem}
          taskId={data?.id}
          orderListType={orderListType}
        />
      )}
    </View>
  );
};

export default AllOrder;

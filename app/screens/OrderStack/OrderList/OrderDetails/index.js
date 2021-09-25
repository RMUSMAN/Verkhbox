import React from "react";
import { ScrollView, View } from "react-native";
import { OrderModal, Text } from "../../../../components";
import StringsOfLanguages from "../../../../util/stringsOfLanguage";
import styles from "./styles";

function OrderDetails({ visible, handleClose, selectedTestData, details }) {
  // const dispatch = useDispatch();
  // const loginUser = useSelector((state) => state.authReducer.loginUser);

  // useEffect(() => {

  // }, []);

  return (
    <OrderModal
      visible={visible}
      handleClose={handleClose}
      heading={StringsOfLanguages.basicInformation}
    >
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={styles.orderItemWithBorder}>
          <Text style={styles.leftItem} body1>
            {StringsOfLanguages.Order}
          </Text>
          <Text body1>{details?.order_number}</Text>
        </View>
        <View style={styles.orderItemWithBorder}>
          <Text style={styles.leftItem} subhead semibold>
            {StringsOfLanguages.OrderId}
          </Text>
          <Text body2>{details?.id}</Text>
        </View>
        <View style={styles.orderItemWithBorder}>
          <Text style={styles.leftItem} subhead semibold>
            {StringsOfLanguages.customOrder}
          </Text>
          <Text body2>{details?.custom_order_number}</Text>
        </View>
        <View style={styles.orderItemWithBorder}>
          <Text style={styles.leftItem} subhead semibold>
            {StringsOfLanguages.orderCategory}
          </Text>
          <Text body2>{details?.category?.name}</Text>
        </View>
        <View style={styles.orderItemWithBorder}>
          <Text style={styles.leftItem} subhead semibold>
            {StringsOfLanguages.startDate}
          </Text>
          <Text body2>{details?.start_date}</Text>
        </View>
        <View style={styles.orderItemWithBorder}>
          <Text style={styles.leftItem} subhead semibold>
            {StringsOfLanguages.endDate}
          </Text>
          <Text body2>{details?.end_date}</Text>
        </View>
        <View style={styles.orderItemWithBorder}>
          <Text style={styles.leftItem} subhead semibold>
            {StringsOfLanguages.Description}
          </Text>
          <Text body2>{details?.description}</Text>
        </View>
        <View style={styles.orderItemWithBorder}>
          <Text style={styles.leftItem} subhead semibold>
            {StringsOfLanguages.Customer}
          </Text>
          <View style={{ flex: 1 }}>
            <Text body2 style={{ flexWrap: "wrap" }}>
              {details?.get_customer?.customer_name}
            </Text>
          </View>
        </View>
        <View style={styles.orderItemWithBorder}>
          <Text style={styles.leftItem} subhead semibold>
            {StringsOfLanguages.contactPerson}
          </Text>
          <Text body2>{details?.get_contact_name?.name}</Text>
        </View>
        <View style={styles.orderItemWithBorder}>
          <Text style={styles.leftItem} subhead semibold>
            {StringsOfLanguages.contactPhoneNumber}
          </Text>
          <Text body2>{details?.get_contact_name?.mobile_number}</Text>
        </View>
        <View style={styles.orderItemWithBorder}>
          <Text style={styles.leftItem} subhead semibold>
            {StringsOfLanguages.projectManager}
          </Text>
          {details?.get_user?.first_name && details?.get_user?.last_name && (
            <Text body2>
              {details?.get_user?.first_name +
                " " +
                details?.get_user?.last_name}
            </Text>
          )}
        </View>
        <View style={styles.orderItem}>
          <Text style={styles.leftItem} subhead semibold>
            {StringsOfLanguages.projectManagerPhoneNumber}
          </Text>
          <Text body2>{details?.get_user?.mobile_number}</Text>
        </View>
      </ScrollView>
    </OrderModal>
  );
}

export default OrderDetails;

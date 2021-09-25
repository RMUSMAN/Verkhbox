import { Dimensions, StyleSheet } from "react-native";
import { BaseColor } from "../../config";
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
    contain: {
        alignItems: "center",
        
        width: "100%"
    },
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        marginTop: 10,
        
        width: "100%"
    },
    root: {
        padding: 20,
        height: height - 170,
        width:'100%'
    },
});

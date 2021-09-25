import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from '../../config';

export default StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: BaseColor.fieldColor,
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
        width: "100%"
    },
    contain: {
        alignItems: "center",
        padding: 20,
        width: "100%",
        flex:1
    },
    logo: {
        width: 160,
        height: 160,
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor:'white'
    },
    registerText:{
        flexDirection:'row',
        alignSelf:'flex-start',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    registerButtonStyle: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 7,
        paddingTop: 7,
        margin: 1,
        backgroundColor: "white",
        borderRadius: 5,
        alignItems:'center',
        flexDirection:'row',
        
    }
});

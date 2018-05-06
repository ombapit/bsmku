import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },

    wrapper:{
        justifyContent:"center",
        alignItems:"center"
    },

    errorText:{
        color: color.red,
        //width: (windowWidth - 40),
        marginTop: 20,
        marginLeft: 20,
    },

    containerView:{
        marginVertical: padding * 3,
        width: windowWidth - 39
    },

    socialButton:{
        height: normalize(55),
        borderRadius:4,
        marginTop:0,
        marginBottom:0
    },

    button:{
        backgroundColor: color.white,
        height: normalize(55)
    },

    buttonText:{
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium,
        color: color.bgcolor
    },

    forgotText:{
        textAlign:"center",
        color:color.black,
        marginBottom: padding,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
    }
});


export default styles;
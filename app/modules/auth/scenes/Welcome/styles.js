import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.bgcolor,
    },

    topContainer:{
        paddingHorizontal:15,
        paddingTop: padding * 2,
        paddingBottom: padding * 2,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: color.bglogocolor,
        borderRadius: 30
    },

    image:{
        width: 200,
        height: 102,
        backgroundColor: 'transparent',
        marginBottom: padding,
        resizeMode
    },

    title:{
        fontSize: fontSize.large + 2,
        lineHeight: fontSize.large + 4,
        fontFamily: fontFamily.bold,
        color:"#FF553F",
        letterSpacing: 1
    },

    subText:{
        color: "#414141",
        fontSize: fontSize.large,
        lineHeight: fontSize.large + 10,
        marginVertical:padding * 2
    },

    //===============================

    bottomContainer:{
        //paddingVertical: padding * 3,
        paddingTop: padding * 2,
        //shadowColor: "#000000",
        //shadowOpacity: 0.8,
        //shadowRadius: 2,
        //shadowOffset: {
        //    height: 1,
        //    width: 0
        //}
    },

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center",
    },

    containerView:{
        width: windowWidth - 40
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

    bottom:{
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        marginTop: padding * 2
    },

    bottomText:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.bold,
        marginRight: 5,
        color: color.white
    },

    signInText:{
        fontSize: fontSize.regular,
        color: color.white,
        fontFamily: fontFamily.medium,
        textDecorationLine: 'underline'
    },

    orContainer:{
        justifyContent:"center",
        alignItems:"center",
        height: 40,
        width: windowWidth
    },

    divider:{
        backgroundColor: '#D0D5DA',
        position:"absolute",
        top:19,
        left: 20,
        right: 20
    },

    orText:{
        backgroundColor: color.white,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
        color: "#414141",
        paddingHorizontal: padding
    }
});

export default styles;

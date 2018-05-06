import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const { windowWidth, color, fontSize, fontFamily, normalize } = theme;

const styles = StyleSheet.create({
    container:{
        marginBottom: 10
    },

    inputContainer:{
        //width: windowWidth - 40,
        height: normalize(65),
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.bold,
        borderBottomColor: color.white,
        color: color.white,
    },
    white: {
        color: color.white
    }
});

export default styles;
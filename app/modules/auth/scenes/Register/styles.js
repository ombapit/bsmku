import { StyleSheet } from 'react-native';
import { theme } from "app/modules/auth/index";
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.bgcolor
    },
});
export default styles;
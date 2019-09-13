import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from "react-native-elements";
import { placeholderColor, fontColor } from "../styles/colors";
import { marginLg, marginMd } from '../styles/sizes';

export default (props) => <Input {...props} 
    placeholderTextColor={placeholderColor}
    containerStyle={styles.inputContainer}
    inputStyle={styles.input}
    labelStyle={styles.inputLabel}
/>

export const BasicInput = props =>  <Input {...props} 
    placeholderTextColor={placeholderColor}
    inputStyle={styles.input}
    containerStyle={styles.basicContainer}
    labelStyle={styles.inputLabel}
/>

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: marginLg, 
        borderColor: placeholderColor, 
        borderWidth: 1, 
        borderRadius: 4, 
        paddingBottom: 8
    },
    inputLabel: {
        color: fontColor
    },
    input: {
        paddingBottom: 0,
    },
    basicContainer: {
        marginVertical: marginMd,
    }
});
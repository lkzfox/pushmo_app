import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { placeholderColor } from '../styles/colors';
import { marginLg, padding, font, marginMd } from '../styles/sizes';

export default props => {
    return (
        <TouchableOpacity onPress={props.onPress} 
            disabled={props.empty} 
            style={{...styles.container, backgroundColor: props.color}}>
            {
                !props.empty && <View style={styles.grayed}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text>Localizacao: {props.ulcerLocation}</Text>
                    <Text>Estagio: {props.ulcerStage}</Text>
                </View>
            }
            {
                props.empty && <View style={{...styles.grayed, ...styles.center}}>
                    <Text>Nao cadastrada</Text>
                </View>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        borderRadius: 4,
        borderColor: placeholderColor,
        borderWidth: 1,
        marginBottom: marginLg,
    },
    title: {
        fontSize: font + 3,
        fontWeight: "bold",
    },
    grayed: {
        flex: 1,
        margin: marginMd,
        padding: padding,
        borderRadius: 4,
        backgroundColor: "#cecece89"
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
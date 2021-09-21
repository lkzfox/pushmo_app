import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { placeholderColor } from '../styles/colors';
import { marginLg, padding, font, marginMd } from '../styles/sizes';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default props => {
    return (
        <TouchableOpacity onPress={props.onPress} 
            disabled={props.empty} 
            style={{...styles.container, backgroundColor: props.color }}>
            {
                !props.empty && (
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.grayed}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text>Localização: {props.ulcerLocation}</Text>
                            <Text>Estágio: {props.ulcerStage}</Text>
                        </View>
                        <View style={{display: "flex", alignItems: 'center', padding: padding}}>
                            <Icon name="arrow-right" 
                                size={40} 
                                color="#000"
                            /> 
                            <Text style={{ fontWeight: 'bold' }}>REGISTROS</Text>
                        </View>
                    </View>
                )
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
        justifyContent: 'center'
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
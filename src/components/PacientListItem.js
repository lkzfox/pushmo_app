import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FMT from '../helpers/formater';

export default class PacientListItem extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.item}>
                    <View style={styles.line}>
                        <Icon name="person" size={16} color="#000" />
                        <Text style={styles.description}>{this.props.name}</Text>
                    </View>
                    <View style={styles.line}>
                        <Icon name="credit-card" size={16} color="#000" />
                        <Text style={styles.description}>{FMT.formatCPF(this.props.cpf)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        margin: 8,
        marginLeft: 16,
        marginRight: 16,
        borderWidth: 1,
        borderColor: "#5f5",
    },
    description: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8
    },
    line: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
})
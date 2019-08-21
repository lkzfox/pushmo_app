import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Button extends Component {
    icon = () => <Icon name={this.props.iconName} style={styles.icon} size={32} color="#fff" />;

    render() {
        return (
            <TouchableOpacity 
                style={styles.button}
                onPress={() => this.props.onPress()}
            >   
                {this.props.iconName && this.icon()} 
                <Text style={styles.text}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        padding: 24,
        borderWidth: 1,
        borderColor: "#5d5",
        backgroundColor: "#2c2",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginLeft: 8,
        color: "#fff"
    },
    icon: {
    }
})
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Footer extends Component {
    render() {
        return (
            <View style={styles.footer}>   
                <Button {...this.props} 
                    icon={(
                        <Icon name={this.props.iconName} 
                            size={32} 
                            color="#fff"
                            style={{marginRight: 8}} 
                        />
                    )}
                    buttonStyle={{
                        backgroundColor: "#22dd22",
                    }}
                    titleStyle={{
                        fontWeight: "bold",
                        fontSize: 20
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
        padding: 16,
    },
})
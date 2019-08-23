import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { padding } from '../styles/sizes';

export default class Footer extends Component {
    render() {
        return (
            <View style={styles.footer}>   
                <Button {...this.props} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
       padding,
    },
})
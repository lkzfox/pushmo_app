import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { padding } from '../styles/sizes';

export default class Footer extends Component {
    render() {
        return (
            <View style={styles.footer}>   
                <PrimaryButton {...this.props} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
       padding,
       elevation: 2
    },
})
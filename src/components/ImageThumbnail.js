import React, { Component } from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import API from '../services/api';

export default class ImageThumbnail extends Component {


    render() {
        const uri = `${API.defaults.baseURL}/pressure_ulcer/image/${this.props.source}`;
        console.log(uri);
        
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onImagePress}>
                    <Image source={{uri}} style={{width: this.props.width || 150, height: this.props.height || 150}} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
    }
})
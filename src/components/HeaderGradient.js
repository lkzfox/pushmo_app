import React from 'react';
const { View, Image, StyleSheet, ImageBackground } = require("react-native");
const { Header } = require("react-navigation");
import background_image from '../assets/images/app_background.png';

const ImageHeader = props => (
    <View style={{ backgroundColor: '#eee', height: 60 }}>
        <ImageBackground source={background_image} style={{ width: '100%', height: '100%' }}>
            <Header {...props} style={{ backgroundColor: 'transparent' }}/>
        </ImageBackground>
    </View>
);

export default ImageHeader;
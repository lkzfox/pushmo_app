import React, { Component } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as actions from '../actions'
import { connect } from 'react-redux';
import { placeholderColor, buttonColor } from '../styles/colors';
import { marginMd } from '../styles/sizes';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ImageTakeAndPreview extends Component {

    componentDidMount() {
        console.log(this.props);
    }

    handleCamera = () => {        
        this.props.navigation.navigate('Camera');
    }

    deleteImage = () => {
        this.props.saveImage('');
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: "column",
                alignSelf: 'center',
                paddingVertical: 20
            }}>
                { this.props.takenPicture != '' && 
                    <View style={{alignItems: "center"}}>
                        <Image style={{height: 200, width: 200}} source={{ uri: this.props.takenPicture }} />
                        <TouchableOpacity onPress={this.deleteImage} style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                padding: 4,
                                backgroundColor: placeholderColor,
                                borderRadius: 50
                            }}>
                            <Icon name="delete" size={30} color="#ba2040" />
                        </TouchableOpacity>
                    </View>
                }                   
                <TouchableOpacity onPress={this.handleCamera} 
                    style={{ flexWrap: "wrap",
                    margin: marginMd,
                    alignSelf: "center"}}>
                    <View style={{
                        flex: 0, 
                        flexDirection: "row", 
                        flexWrap: "wrap", 
                        alignItems: "center",  
                        alignSelf: "flex-start",
                        justifyContent: "center",
                        padding: 2,
                        paddingHorizontal: 8,
                        borderRadius: 10,
                        backgroundColor: buttonColor,
                    }} >
                        <Icon name="camera-alt" size={40} color="#FFF" style={{paddingRight: 8, borderRightWidth: 1,
                                borderRightColor: placeholderColor,
                            }} />
                        <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: marginMd, color: '#FFF'}} >Capturar Imagem</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        takenPicture: state.saveImage      
    }
}

export default connect(mapStateToProps, actions)(ImageTakeAndPreview);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
    }
})
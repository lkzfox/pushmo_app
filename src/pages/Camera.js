import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, StyleSheet, Text, Image, CameraRoll } from 'react-native';
import { RNCamera } from 'react-native-camera';
import * as actions from '../actions';

class Camera extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        image: '',
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true, orientation: 'portrait' };
            const data = await this.camera.takePictureAsync(options);
            this.setState({ image: data.uri, base64: data.base64 });
        }
    };

    renderCamera = () => {
        return (
            <View style={styles.container}>
              <RNCamera
                ref={camera => {
                  this.camera = camera;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                autoFocus={RNCamera.Constants.AutoFocus.on}
                flashMode={RNCamera.Constants.FlashMode.off}
                captureAudio={false}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
                  <Text style={styles.buttonText}> CAPTURAR </Text>
                </TouchableOpacity>
              </View>
            </View>
        );
    }

    handleCancel = () => {
        this.setState({ image: '', base64: '' })
    }
    
    handleSaveImage = () => {
        this.props.saveImage(`data:image/jpeg;base64,${this.state.base64}`);
        this.props.navigation.pop();
    }

    renderPreview = () => {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: this.state.image }}
                    style={styles.preview}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.handleSaveImage} style={styles.capture}>
                        <Text style={styles.buttonText}> SALVAR </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleCancel} style={styles.capture}>
                        <Text style={styles.buttonText}> Cancelar </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
  
    render() {
        return this.state.image ? this.renderPreview() : this.renderCamera() 
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "black"
    },
    preview: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center"
    },
    buttonContainer: {
      flex: 0,
      flexDirection: "row",
      justifyContent: "center"
    },
    capture: {
      flex: 0,
      backgroundColor: "#fff",
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: "center",
      margin: 20
    },
    buttonText: {
      fontSize: 14
    }
  });

  export default connect(null, actions)(Camera);
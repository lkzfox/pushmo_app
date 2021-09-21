import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, StyleSheet, Text, Image, CameraRoll } from 'react-native';
import { RNCamera } from 'react-native-camera';
import * as actions from '../actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { buttonIcon } from '../styles/sizes';
import { buttonIconColor } from '../styles/colors';

class Camera extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        image: '',
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.3, base64: true, orientation: 'portrait', width: 768 };
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
                    <TouchableOpacity onPress={this.handleSaveImage} style={styles.captureOk}>
                        <Icon name='done' size={buttonIcon} color={buttonIconColor}  />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleCancel} style={styles.captureCancel}>
						<Icon name='cancel' size={buttonIcon} color={buttonIconColor} />
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
	  borderRadius: 50,
	  borderWidth: 2,
	  borderColor: '#9e9e9e',
      padding: 30,
      alignSelf: "center",
      margin: 20
    },
    buttonText: {
      fontSize: 14
	},
	captureOk: {
		flex: 0,
		backgroundColor: "#20ca50",
		borderRadius: 50,
		padding: 10,
		alignSelf: "center",
		margin: 20
	},
	captureCancel: {
		flex: 0,
		backgroundColor: "#ca3020",
		borderRadius: 50,
		padding: 15,
		alignSelf: "center",
		margin: 20
	},
  });

  export default connect(null, actions)(Camera);
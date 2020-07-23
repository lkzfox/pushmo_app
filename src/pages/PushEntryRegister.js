import React, { Component } from 'react';
import { View, Dimensions, KeyboardAvoidingView, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import API from '../services/api';
import { marginLg, marginMd } from '../styles/sizes';
import * as actions from '../actions'
import Message from '../components/Message';
import RadioGroup from '../components/RadioGroup';
import DateSelector from '../components/DateSelector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { buttonColor, placeholderColor } from '../styles/colors';
import Input from '../components/Input';

class PressureUlcerRegister extends Component{
    static navigationOptions = {
        title: "Registro da Lesao"
    }

    state = {
        isVisible: false,
        exudatos: [],
        skins: [],
        exudato: null,
        skin: null,
        showMessageButton: true,
        messageCB: null,
        length: '',
        width: '',
    }

    componentDidMount() {
        console.log('Àqui veio');
        this.setState({
            isVisible: true,
            showMessageButton: false,
            message: "Aguarde...",
            loading: true,
        });

        API.get('/pressure_ulcers/info')
        .then(res => {
            res.data.exudatos.forEach(exudato => {
                exudato.label = exudato.description
                exudato.value = exudato.id
            });
            res.data.skins.forEach(skin => {
                skin.label = skin.description
                skin.value = skin.id
            });
            
            this.setState({
                exudatos: res.data.exudatos, 
                skins: res.data.skins, 
                isVisible: false, 
                loading: false
            })
            
        })
        .catch(err => {            
            this.setState({
                message: "Nao foi possivel recuperar as informacoes",
                showMessageButton: true, 
                loading: false,
                messageCB: () => {
                    this.setState({ isVisible: false })
                }
            })
        })
    }

    handleSave = () => {
        
        this.setState({
            isVisible: true,
            showMessageButton: false,
            message: "Aguarde...",
            loading: true,
        });

        const data = {
            length: this.state.length,
            width: this.state.width,
            exudato_id: this.state.exudato,
            skin_id: this.state.skin,
            created_at: this.state.created_at,
            image: this.props.takenPicture
        };
        
        API.post(`/pressure_ulcer/${this.props.pressureUlcer.id}/entries`, data)
        .then(res => {            
            this.props.addPushEntry(res.data.data);
            this.props.setPushEntry(res.data.data);
            this.props.saveImage('');
            this.setState({
                showMessageButton: true,
                message: "Registro criado com sucesso.",
                loading: false,
                messageCB: () => {
                    this.setState({ isVisible: false })
                    this.props.navigation.navigate('PushEntryAdditionalInfoList');
                }
            })
        })
        .catch(err => {
            console.log(err);            
            console.log(err.response);            
        })
    }

    onDateChange = ({ date }) => {
        this.setState({
            created_at: date,
        });
    }

    handleSelect = (state, value) => {
        this.setState({[state]: value})
    }

    handleCamera = () => {        
        this.props.navigation.navigate('Camera');
    }

    deleteImage = () => {
        this.props.saveImage('');
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    }

    render() {                
        return (
            <>
                <ScrollView>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>                    
                    { this.props.takenPicture != '' && 
                        <View style={{alignItems: "center", marginTop: marginMd}}>
                            <Image style={{height: 200, width: 200}} source={{ uri: this.props.takenPicture }} />
                            <TouchableOpacity onPress={this.deleteImage} style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    padding: 4,
                                    backgroundColor: placeholderColor,
                                    borderRadius: 50
                                }}>
                                <Icon name="delete" size={30} color="#000" />
                            </TouchableOpacity>
                        </View>
                    }                   
                    <View style={styles.center2}>
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
                                <Icon name="camera-alt" size={40} color="#000" style={{paddingRight: 8, borderRightWidth: 1,
                                        borderRightColor: placeholderColor,
                                    }} />
                                <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: marginMd}} >Capturar Imagem</Text>
                            </View>
                        </TouchableOpacity>
                        <Input
                            label="Comprimento (cm)"
                            onChangeText={value => this.handleChange('length', value)}
                            value={this.state.length}
                            leftIcon={<IconFA name='arrows-v' size={24} color='black'/>}
                            keyboardType="numeric"
                        />
                        <Input
                            label="Largura (cm)"
                            onChangeText={value => this.handleChange('width', value)}
                            value={this.state.width}
                            leftIcon={<IconFA name='arrows-h' size={24} color='black'/>}
                            keyboardType="numeric"
                        />
                        <RadioGroup 
                            options={this.state.exudatos}  
                            onSelect={value => this.handleSelect('exudato', value)}
                            selected={this.state.exudato}
                            title="Quantidade de Exudato"
                        />
                        <RadioGroup 
                            options={this.state.skins}  
                            onSelect={value => this.handleSelect('skin', value)}
                            selected={this.state.skin}
                            title="Tipo de Tecido"
                        />
                        <DateSelector onDateChange={this.onDateChange} />
                    </View>
                </KeyboardAvoidingView>
                </ScrollView>
                <Footer title="Salvar" iconName="save" onPress={this.handleSave} loading={this.state.isLoading} />
                <Message 
                    onButtonPress={this.state.messageCB} 
                    isVisible={this.state.isVisible} 
                    message={this.state.message}
                    loading={this.state.loading}
                    showButton={this.state.showMessageButton}
                />
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: marginLg,
        marginRight: marginLg,
    },
    center2: {
        flex: 1,
        flexDirection: "column",
        flexWrap: "wrap",
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40  
    }
})

const mapStateToProps = state => {
    return {
        takenPicture: state.saveImage,
        pressureUlcer: state.pressureUlcer        
    }
}

export default connect(mapStateToProps, actions)(PressureUlcerRegister);
import React, { Component } from 'react';
import { View, Dimensions, KeyboardAvoidingView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import API from '../services/api';
import { marginLg, marginMd } from '../styles/sizes';
import * as actions from '../actions'
import Message from '../components/Message';
import RadioGroup from '../components/RadioGroup';
import DateSelector from '../components/DateSelector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { buttonColor, placeholderColor } from '../styles/colors';

class PressureUlcerRegister extends Component{
    static navigationOptions = {
        title: "Cadastro de Lesao"
    }

    state = {
        isVisible: false,
        locations: [],
        stages: [],
        location: null,
        stage: null,
        showMessageButton: true,
        messageCB: null
    }

    componentDidMount() {
        this.setState({
            isVisible: true,
            showMessageButton: false,
            message: "Aguarde...",
            loading: true,
        });

        API.get('/pressure_ulcers/info')
        .then(res => {
            res.data.locations.forEach(location => {
                location.value = location.id;
                location.label = location.description
            });
            res.data.stages.forEach(stage => {
                stage.value = stage.id;
                stage.label = stage.initials
            });
            
            this.setState({
                locations: res.data.locations, 
                stages: res.data.stages, 
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
                    this.props.navigation.pop();
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
            pressure_ulcer_location_id: this.state.location,
            pressure_ulcer_location_obs: null,
            pressure_ulcer_stage_id: this.state.stage,
            created_at: this.state.created_at,
            image: this.props.takenPicture
        };
        
        API.post(`/pacient/${this.props.selectedPacient.id}/pressure_ulcers`, data)
        .then(res => {
            this.props.addPacientPressureUlcer(res.data.data);
            this.props.saveImage('');
            this.setState({
                showMessageButton: true,
                message: "Registro criado com sucesso.",
                loading: false,
                messageCB: () => {
                    this.setState({ isVisible: false })
                    this.props.navigation.pop();
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

    render() {                
        return (
            <>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>                    
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
                        <RadioGroup 
                            options={this.state.locations}  
                            onSelect={value => this.handleSelect('location', value)}
                            selected={this.state.location}
                            title="Localizacao"
                        />
                        <RadioGroup 
                            options={this.state.stages}  
                            onSelect={value => this.handleSelect('stage', value)}
                            selected={this.state.stage}
                            title="Estagio"
                        />
                        <DateSelector onDateChange={this.onDateChange} />
                    </View>
                </KeyboardAvoidingView>
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
        selectedPacient: state.selectedPacient        
    }
}

export default connect(mapStateToProps, actions)(PressureUlcerRegister);
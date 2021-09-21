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
import { BasicInput } from '../components/Input';
import { ScrollView } from 'react-native-gesture-handler';
import ImageTakeAndPreview from '../components/ImageTakeAndPreview';

class PressureUlcerRegister extends Component{

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
                message: "Não foi possivel recuperar as informacões",
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
            pressure_ulcer_location_desc: this.state.location_desc,
            pressure_ulcer_stage_id: this.state.stage,
            pressure_ulcer_stage_desc: this.state.stage_desc,
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

    handleChange = (name, val) => {
        this.setState({[name]: val})
    }

    render() {                
        return (
            <>
                <KeyboardAvoidingView behavior="height" style={styles.container}>                    
                <ScrollView style={{display: 'flex'}}>
                    <View style={styles.center2}>
                        <ImageTakeAndPreview navigation={this.props.navigation} />
                    </View>

                    <View style={styles.center2}>
                        <RadioGroup 
                            options={this.state.locations}  
                            onSelect={value => this.handleSelect('location', value)}
                            selected={this.state.location}
                            title="Localização"
                        >
                            <BasicInput 
                                placeholder="Outros.." 
                                onChangeText={value => this.handleChange('location_desc', value)}
                            />
                        </RadioGroup>
                        <RadioGroup 
                            options={this.state.stages}  
                            onSelect={value => this.handleSelect('stage', value)}
                            selected={this.state.stage}
                            title="Estágio"
                        >
                            <BasicInput 
                                placeholder="Outros.." 
                                onChangeText={value => this.handleChange('stage_desc', value)}
                            />
                        </RadioGroup>
                        <DateSelector onDateChange={this.onDateChange} />
                    </View>
                    <Footer title="Salvar" iconName="done" onPress={this.handleSave} loading={this.state.isLoading} />
                </ScrollView>
                </KeyboardAvoidingView>
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
        alignSelf: 'center',
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
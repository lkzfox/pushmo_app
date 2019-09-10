import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import API from '../services/api';
import Footer from '../components/Footer';
import { marginLg } from '../styles/sizes';
import Message from '../components/Message';
import PressureUlcerItem from '../components/PressureUlcerItem';
import * as actions from '../actions'

 
class PacientPressureUlcer extends Component {
    static navigationOptions = {
        title: 'Lesoes por Pressao'
    }

    colorOrder = ["#2ecc71", "#e74c3c", "#3498db", "#f1c40f"]
    state = {
        pressureUlcers: [],
        showMessage: false,
    }

    componentDidMount() {        
        this.setState({ showMessage: true });
        API.get(`/pacient/${this.props.selectedPacient.id}/pressure_ulcers`)
        .then( res => {
            this.props.setPacientPressureUlcers(res.data);
            this.setState({ pressureUlcers: res.data, showMessage: false });
        })
        .catch( err => {
            this.setState({ showMessage: false, messageLoading: false, showMessage: false });
        })
    }

    handleSelect = ulcer => {
        this.props.selectPressureUlcer(ulcer);
        this.props.navigation.navigate('PushEntriesList');
    }

    handleSave = () => {

    }

    handleRegister = () => {
        this.props.navigation.navigate('PushEntryRegister')
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    {
                        this.props.pacientPressureUlcers.map((ulcer, i) => {
                            
                            return (
                                <PressureUlcerItem 
                                    key={i} 
                                    title={`Lesao 0${i+1}`}
                                    color={this.colorOrder[i]}
                                    onPress={() => this.handleSelect(ulcer)}
                                    ulcerLocation={ulcer.PressureUlcerLocation.initials} 
                                    ulcerStage={ulcer.PressureUlcerStage.initials}
                                />
                            )
                        })
                    }
                    {
                        Array(4 - this.props.pacientPressureUlcers.length).fill(0).map((empty, i) => {
                            
                            return (
                                <PressureUlcerItem key={4-i} empty/>
                            )
                        })
                    }
                    <Footer 
                        title="Cadastrar Lesao" 
                        iconName="add-circle-outline" 
                        disabled={this.props.pacientPressureUlcers.length >= 4} 
                        onPress={this.handleRegister}
                    />             
                    <Message 
                        message="Carregando dados" 
                        title="Aguarde" 
                        isVisible={this.state.showMessage} 
                        loading
                    />       
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    content: {
        flex: 1,
        marginLeft: marginLg,
        marginRight: marginLg,
    }
})

const mapStateToProps = state => {
    return {
        selectedPacient: state.selectedPacient,
        pacientPressureUlcers: state.pacientPressureUlcers
    }
}

export default connect(mapStateToProps, actions)(PacientPressureUlcer);
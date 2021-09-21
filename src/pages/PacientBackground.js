import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ListItem } from 'react-native-elements';
import API from '../services/api';
import Footer from '../components/Footer';
import { marginLg } from '../styles/sizes';
import TextIcon from '../components/TextIcon';
import RadioGroup from '../components/RadioGroup';
import { ScrollView } from 'react-native-gesture-handler';
import { BasicInput } from '../components/Input';
import questions from '../assets/backgroundQuestions.json';
import Message from '../components/Message';

 
class PacientBackground extends Component {

    state = {
        isLoading: false,
        showMessage: false,
        hasBackground: false,
        messageLoading: false,
    }

    questions = questions;
      
    options = [
        {
            value: true,
            label: 'Sim'
        },
        {
            value: false,
            label: 'Não'
        }
    ]

    componentDidMount() {     
        this.setState({ showMessage: true, messageButton: false, message: "Carregando dados...", title: "Aguarde", messageLoading: true });
        API.get(`/pacient/${this.props.selectedPacient.id}/background`, this.state)
        .then( res => {
            this.setState({ ...res.data, hasBackground: true, showMessage: false, messageLoading: false });
        })
        .catch( err => {
            this.setState({ showMessage: false, messageLoading: false });
        })

    }


    handleSelect = (state, value) => {
        this.setState({ [state]: value });
    }

    handleSave = () => {
        
        if (this.state.isLoading) return;
        this.setState({ isLoading: true });
        

        API.post(`/pacient/${this.props.selectedPacient.id}/background`, this.state)
        .then( res => {
            this.setState({ ...res.data, hasBackground: true, isLoading: false, });
        })
        .catch( err => {
            let message;

            if (err.message == "Network Error")
                message = "Não foi posivel conectar ao servidor.";
            else
                message = err.response.data.message;

            this.setState({ 
                isLoading: false, 
                showMessage: true, 
                message,
                messageButton: true, message: "Não foi possivel salvar o histórico, tente novamente", title: "Erro"
            });
            
        })
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <ListItem leftIcon={<TextIcon name="person"/>} title={this.props.selectedPacient.name} />
                <View style={styles.content}>
                    {
                        this.questions.map((question, i) => {
                            return (
                                <RadioGroup 
                                    key={i}
                                    options={this.options} 
                                    selected={this.state[question.state]} 
                                    onSelect={value => this.handleSelect(question.state, value)}
                                    title={question.question}
                                    disabled={this.state.hasBackground}
                                >
                                    {
                                        !this.state.hasBackground &&
                                        question.obs && 
                                        <BasicInput 
                                            placeholder={question.obs.placeholder} 
                                            onChangeText={value => this.handleSelect(question.obs.state, value)}
                                        />
                                    }
                                    {
                                        this.state.hasBackground &&
                                        question.obs && 
                                        this.state[question.obs.state] &&
                                        <Text>{this.state[question.obs.state]}</Text>
                                    }
                                </RadioGroup>
                            )
                        })
                    }
                    <Footer 
                        title="Salvar" 
                        iconName="done" 
                        onPress={this.handleSave} 
                        loading={this.state.isLoading} 
                        disabled={this.state.hasBackground} 
                    />                    
                </View>
                <Message 
                    message={this.state.message} 
                    title={this.state.title} 
                    showButton={this.state.messageButton} 
                    isVisible={this.state.showMessage} 
                    onButtonPress={() => this.setState({ showMessage: false })}
                    loading={this.state.messageLoading}
                />
            </ScrollView>
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
        selectedPacient: state.selectedPacient
    }
}

export default connect(mapStateToProps, actions)(PacientBackground);
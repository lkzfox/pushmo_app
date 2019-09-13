import React, { Component } from 'react';
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { BasicInput } from '../components/Input';
import Footer from '../components/Footer';
import { marginLg } from '../styles/sizes';
import * as Actions from '../actions'


class PushOtherInformations extends Component{

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
    })

    state = {
        ...this.props.pushOptions.others
    }
    
    handleChange = (field, value) => {
        this.setState({ [field]: value })
    }

    handleOk = () => {
        this.props.addOthersPushAdditionalInfo(this.state);
        this.props.navigation.pop();
    }

    render() {
        return (
            <>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.center}>
                        <BasicInput
                            placeholder='Ex.: Gaze..'
                            label="Curativo Utilizado"
                            onChangeText={value => this.handleChange('used_bandage', value)}
                            value={this.state.used_bandage}
                            maxLength={50}
                        />
                        <BasicInput
                            placeholder='Ex.: 2x por dia..'
                            label="Frequencia de Troca"
                            onChangeText={value => this.handleChange('change_ratio', value)}
                            value={this.state.change_ratio}
                        />
                        <BasicInput
                            label="Outras informacoes *"
                            onChangeText={value => this.handleChange('others', value)}
                            value={this.state.others}
                        />
                    </View>
                </KeyboardAvoidingView>
                <Footer title="OK" iconName="done" onPress={this.handleOk} />
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
    center: {
        flex: 1,
    }
})

const mapStateToProps = state => {
    return {
        pushOptions: state.pushOptions
    }
}

export default connect(mapStateToProps, Actions)(PushOtherInformations);
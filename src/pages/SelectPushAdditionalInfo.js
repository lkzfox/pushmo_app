import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import API from '../services/api';
import Footer from '../components/Footer';
import RadioGroup from '../components/RadioGroup';
import { marginLg } from '../styles/sizes';

class SelectPushAdditionalInfo extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
    })

    state = {
        selections: this.props.pushOptions.selections
    }

    onSelect = option => {        
        const exists = this.state.selections.find(ele => ele == option);
        let selections = [];
        
        if (exists)
            selections = this.state.selections.filter(ele => ele != option);
        else
            selections = [].concat(this.state.selections, option);

        this.setState({ selections })
        
    }

    handleOk = () => {
        this.props.addSelectionsPushAdditionalInfo(this.state.selections);
        this.props.navigation.pop();
    }

    formatOptions = () => {
        return this.props.pushAdditionalInfo.Options.map(option => {
            return {
                value: option.id,
                label: option.description
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.list}>
                    <RadioGroup 
                        options={this.formatOptions()} 
                        EPL 
                        multiple 
                        selected={this.state.selections}
                        onSelect={this.onSelect}
                    />
                </View>
                <Footer title="OK" iconName="done" onPress={this.handleOk} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    list: {
        flex: 1,
        alignSelf: "stretch",
        margin: marginLg,
    }
})

const mapStateToProps = state => {
    return {
        pushAdditionalInfo: state.pushAdditionalInfo,
        pushOptions: state.pushOptions,
    }
}

export default connect(mapStateToProps, actions)(SelectPushAdditionalInfo);
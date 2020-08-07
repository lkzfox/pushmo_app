import React, { Component } from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ListItem, SearchBar } from 'react-native-elements';
import API from '../services/api';
import FMT from '../helpers/formater';
import Footer from '../components/Footer';
import { buttonIcon, fontLg } from '../styles/sizes';
import { fontColor, placeholderColor } from '../styles/colors';
import Message from '../components/Message';

class PushEntriesList extends Component {
    static navigationOptions = {
        title: "Registros da Lesão"
    }

    state = {
        showMessage: false,
    }

    componentDidMount() {
        this.updateEntries()
    }

    componentDidUpdate(prev){
        if (this.props.pushEntries.length != prev.pushEntries.length) {
            this.updateEntries()
        }
    }

    updateEntries = () => {
        this.setState({ showMessage: true });
        console.log('call');
        API.get(`/pressure_ulcer/${this.props.pressureUlcer.id}/entries`)
        .then(res => {
            console.log(res.data);
            this.props.setPushEntries(res.data);
            this.setState({ showMessage: false });
        })
        .catch(err => {
            this.setState({ showMessage: false});
        })
    }

    handleRegister = () => {
        this.props.navigation.navigate('PushEntryRegister');
    }

    renderItem = ({ item }) => {
        return (
            <ListItem
                title={FMT.dateDBReal(item.created_at)}
                subtitle={`Score: ${item.Area.value + item.Skin.value + item.Exudato.value}`}
                bottomDivider={true}
                leftIcon={(<Icon name="date-range" size={buttonIcon} color={fontColor} />)}
                onPress={() => this.handleSelectEntry(item)}

            />
        )
    }

    
    handleSelectEntry = pacient => {
        this.props.setPushEntry(pacient);
        this.props.navigation.navigate('EntryInfo');
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.pushEntries.length > 0 && 
                    <View style={styles.list}>
                        <FlatList
                            data={this.props.pushEntries}
                            keyExtractor={push_entry => push_entry.id.toString()}
                            renderItem={this.renderItem}
                        />
                    </View>
                }
                
                {this.props.pushEntries.length == 0 &&
                    (<View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ fontStyle: 'italic', color: placeholderColor, alignSelf: 'center',  fontSize: fontLg  }}> Nenhuma avaliação cadastrada</Text>
                    </View>)
                }

                <Footer title="Avaliar a Lesão" iconName="add-circle-outline" onPress={this.handleRegister} />           
                <Message 
                    message="Carregando dados" 
                    title="Aguarde" 
                    isVisible={this.state.showMessage} 
                    loading
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    list: {
        flex: 1,
        alignSelf: "stretch"
    }
})

const mapStateToProps = state => {
    return {
        pressureUlcer: state.pressureUlcer,
        pushEntries: state.pushEntries,
    }
}

export default connect(mapStateToProps, actions)(PushEntriesList);
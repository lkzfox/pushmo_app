import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Text, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component{
    state = {
        username: "",
    }

    async componentDidMount () {
        const user = AsyncStorage.getItem("@pushmo:user");
        
        if (user) {
            this.props.navigation.navigate('LoggedRoutes')
        }
    }
    
    handleChange = (username) => {
        this.setState({username})
    }

    handleLogin = async () => {
        const { username } = this.state;

        if (!username) return;

        await AsyncStorage.setItem("@pushmo:user", this.state.username);

        this.props.navigation.navigate('LoggedRoutes');
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.center}>
                    <Icon name="twitter" size={64} color="#FFF" />
                    <TextInput style={styles.input} placeholder="Email" onChangeText={this.handleChange} value={this.state.username}></TextInput>
                    <TextInput style={styles.input} placeholder="Senha" secureTextEntry></TextInput>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{textAlign: "center", color: "#FFF", fontWeight: "bold", fontSize: 18}}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.handleLogin}
                    >
                        <Text style={{
                            textAlign: "center", 
                            color: "#55F", 
                            fontWeight: "bold", 
                            fontSize: 16, 
                        }}>Registre-se</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2ecc71"
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        borderWidth: 1,
        alignSelf: "stretch",
        margin: 16,
        borderColor: "#000"
    },
    button: {
        backgroundColor: "#27ae60",
        borderColor: "#278e60",
        borderWidth: 2,
        alignSelf: "stretch",
        textAlign: "center",
        margin: 16,
        padding: 16
    }
})
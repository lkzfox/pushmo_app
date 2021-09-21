import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Overlay, Text } from "react-native-elements";
import { placeholderColor, fontColor, buttonColor } from "../styles/colors";
import { messageTitle, marginMd, font, marginLg, buttonFont, message, padding, paddingMd, paddingLg } from '../styles/sizes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';

export default (props) => {
    return (
        <Overlay           
            windowBackgroundColor="#dedede69"
            overlayStyle={{ borderRadius: 5, backgroundColor: "#58b1cb", height: '60%' }}
            {...props}
        >
            <View style={{display: 'flex', flexDirection: 'column', flex: 1, paddingBottom: paddingMd}}>
                <View style={styles.container}>
                    <Text style={styles.title}>{props.title}</Text>
                        {props.message && (
                            <View style={!props.messageList && styles.center}>
                                {props.loading && <ActivityIndicator size="large" color={fontColor} />}
                                <Text style={styles.message}>{props.message}</Text>
                            </View>
                        )}
                </View>
                <View style={{ 
                    flex: 1,
                    flexDirection: 'row', 
                    justifyContent: 'space-around', 
                    padding: paddingMd
                }}>   
                    <Button title="Sim" onPress={props.yesFunction} buttonStyle={{backgroundColor: '#178a17', ...styles.button}} />
                    <Button title="Não" onPress={props.noFunction} buttonStyle={{backgroundColor: '#cd1020', ...styles.button}} />
                </View>
            </View>
    </Overlay>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 2,
        marginLeft: marginLg,
        marginRight: marginLg
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: messageTitle,
        textAlign: "center",
        borderBottomColor: placeholderColor,
        borderBottomWidth: 1,
        textTransform: "uppercase",
        marginBottom: marginMd,
        paddingBottom: 4,
    },
    list: {
        marginTop: marginMd
    },
    message: {
        fontSize: message,
        fontWeight: "bold"
    },
    button: {
        paddingHorizontal: 20,
        elevation: 2,
        borderColor: '#aeaeae',
        borderBottomWidth: 2,
        borderRightWidth: 2
    },
});
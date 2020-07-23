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
            overlayBackgroundColor="transparent"
            {...props}
        >
            <View style={{display: 'flex', flexDirection: 'column', backgroundColor: '#0071bd', borderRadius: 5, paddingBottom: paddingMd}}>
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
                    flexBasis: '15%', 
                    flexDirection: 'row', 
                    justifyContent: 'space-around', 
                    padding: paddingMd
                }}>   
                    <Button title="Sim" onPress={props.yesFunction} buttonStyle={{backgroundColor: buttonColor, ...styles.button}} />
                    <Button title="Não" onPress={props.noFunction} buttonStyle={{backgroundColor: '#d10d1a', ...styles.button}} />
                </View>
            </View>
    </Overlay>
    )
}


const styles = StyleSheet.create({
    container: {
        flexBasis: '50%',
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
    },
});
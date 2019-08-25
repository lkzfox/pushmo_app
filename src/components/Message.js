import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Overlay, Text } from "react-native-elements";
import { placeholderColor, fontColor } from "../styles/colors";
import { messageTitle, marginMd, font, marginLg, buttonFont, message } from '../styles/sizes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Footer from './Footer';

export default (props) => {
    return (
        <Overlay           
            windowBackgroundColor="#dedede69"
            overlayBackgroundColor="#f39c12"
            {...props}
        >
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <Text style={styles.title}>{props.title}</Text>
                        {props.message && (
                            <View style={!props.messageList && styles.center}>
                                {props.loading && <ActivityIndicator size="large" color={fontColor} />}
                                <Text style={styles.message}>{props.message}</Text>
                            </View>
                        )}
                        {props.messageList && (
                            <View style={styles.list}>
                                {
                                    props.messageList.map((item, i) => <Text key={i} style={styles.message}>
                                        <Icon name="fiber-manual-record" size={10} color="#000" /> {item}
                                    </Text>)
                                }
                            </View>
                        )}
                </View>
                {
                    !!props.showButton && <Footer title="OK" onPress={props.onButtonPress} buttonStyle={{backgroundColor: "#000"}} />
                }
            </View>
    </Overlay>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginLeft: marginLg,
        marginRight: marginLg,
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
    }
});
import React from 'react';
import { buttonIcon, marginMd, buttonFont } from '../styles/sizes';
import { buttonIconColor, buttonColor } from '../styles/colors';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFA from 'react-native-vector-icons/FontAwesome5';

export default (props) => <Button  
    icon={props.iconName ? (
        !props.FA ? 
        <Icon name={props.iconName} 
            size={buttonIcon} 
            color={buttonIconColor}
            style={{marginRight: marginMd}} 
        /> :
        <IconFA name={props.iconName} 
            size={buttonIcon} 
            color={buttonIconColor}
            style={{marginRight: marginMd}} 
        />
    ) : props.icon}
    buttonStyle={{
        borderRadius: 10,
        elevation: 2,
        backgroundColor: buttonColor,
        ...props.buttonstyle
    }}
    titleStyle={{
        fontWeight: "bold",
        fontSize: buttonFont
    }}
    loadingProps={{
        size: buttonIcon
    }}
    containerStyle={{
        alignSelf: 'stretch',
        ...props.containerstyle
    }}
    {...props}
/>
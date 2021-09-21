import React from 'react';
import { primaryButtonStartColor, primaryButtonEndColor } from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import Button from './Button';

export default (props) => <Button
    ViewComponent={LinearGradient}
    linearGradientProps={{
        colors: [ !props.disabled ? primaryButtonStartColor : '#cecece', !props.disabled ? primaryButtonEndColor : '#cecece'],
        start: { x: 0, y: 1 },
        end: { x: 1, y: 0.5 },
    }}
    {...props}
/>
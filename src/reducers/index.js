import { combineReducers } from 'redux';
import selectedPacient from './selectedPacient';
import saveImage from './saveImage';
import pacientPressureUlcers from './pacientPressureUlcers';

export default combineReducers({
    selectedPacient,
    saveImage,
    pacientPressureUlcers
});
import { combineReducers } from 'redux';
import selectedPacient from './selectedPacient';
import saveImage from './saveImage';
import pacientPressureUlcers from './pacientPressureUlcers';
import pressureUlcer from './pressureUlcer';
import pushEntries from './pushEntries';

export default combineReducers({
    selectedPacient,
    saveImage,
    pacientPressureUlcers,
    pressureUlcer,
    pushEntries,
});
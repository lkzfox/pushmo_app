import { combineReducers } from 'redux';
import selectedPacient from './selectedPacient';
import saveImage from './saveImage';
import pacientPressureUlcers from './pacientPressureUlcers';
import pressureUlcer from './pressureUlcer';
import pushEntries from './pushEntries';
import pushAdditionalInfo from './pushAdditionalInfo';
import pushOptions from './pushOptions';
import pushEntry from './pushEntry';

export default combineReducers({
    selectedPacient,
    saveImage,
    pacientPressureUlcers,
    pressureUlcer,
    pushEntries,
    pushAdditionalInfo,
    pushOptions,
    pushEntry,
});
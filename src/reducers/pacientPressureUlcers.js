import { PACIENT_PRESSURE_ULCERS, ADD_PACIENT_PRESSURE_ULCER } from '../actions/constants';

export default (state = [], action) => {
    
    if (action.type === PACIENT_PRESSURE_ULCERS) {
        return action.payload;
    }

    if (action.type === ADD_PACIENT_PRESSURE_ULCER) {
        return [].concat(state, action.payload);
    }

    return state;
}
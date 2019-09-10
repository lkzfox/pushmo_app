import { SELECT_PRESSURE_ULCER } from '../actions/constants';

export default (state = {}, action) => {
    
    if (action.type === SELECT_PRESSURE_ULCER) {
        return action.payload;
    }

    return state;
}
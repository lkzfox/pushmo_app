import { SELECT_PACIENT } from '../actions/constants';

export default (state = {}, action) => {
    
    if (action.type === SELECT_PACIENT) {
        return action.payload;
    }

    return state;
}
import { SELECT_USER } from '../actions/constants';

export default (state = {}, action) => {
    
    if (action.type === SELECT_USER) {
        return action.payload;
    }

    return state;
}
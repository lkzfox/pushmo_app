import { SET_PUSH_ENTRY } from '../actions/constants';

export default (state = {}, action) => {
    
    if (action.type === SET_PUSH_ENTRY) {
        
        return action.payload;
    }

    return state;
}
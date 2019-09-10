import { PUSH_ENTRIES, ADD_PUSH_ENTRY } from '../actions/constants';

export default (state = [], action) => {
    
    if (action.type === PUSH_ENTRIES) {
        return action.payload;
    }

    if (action.type === ADD_PUSH_ENTRY) {
        return [].concat(state, action.payload);
    }

    return state;
}
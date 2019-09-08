import { SAVE_IMAGE } from '../actions/constants';

export default (state = '', action) => {
    
    if (action.type === SAVE_IMAGE) {
        return action.payload;
    }

    return state;
}
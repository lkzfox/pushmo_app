import { ADD_SELECTIONS_PUSH_ADDITIONAL_INFO, ADD_OTHERS_PUSH_ADDITIONAL_INFO } from "../actions/constants";

export default (state = { selections: [], others: {} }, action) => {
    const newState = Object.assign({}, state);
    if (action.type === ADD_SELECTIONS_PUSH_ADDITIONAL_INFO) {
        newState.selections = action.payload;
        return newState;
    }

    if (action.type === ADD_OTHERS_PUSH_ADDITIONAL_INFO) {
        newState.others = action.payload;
        return newState;
    }

    return state;
}
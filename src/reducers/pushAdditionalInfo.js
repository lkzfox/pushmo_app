import { SELECT_PUSH_ADDITIONAL_INFO } from "../actions/constants";

export default (state = {}, action) => {
    if (action.type === SELECT_PUSH_ADDITIONAL_INFO) {
        return action.payload;
    }

    return state;
}
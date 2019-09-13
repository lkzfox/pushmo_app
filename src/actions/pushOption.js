import { ADD_SELECTIONS_PUSH_ADDITIONAL_INFO, ADD_OTHERS_PUSH_ADDITIONAL_INFO } from "./constants";

export const addSelectionsPushAdditionalInfo = (selections) => ({
    type: ADD_SELECTIONS_PUSH_ADDITIONAL_INFO,
    payload: selections
})

export const addOthersPushAdditionalInfo = (others) => ({
    type: ADD_OTHERS_PUSH_ADDITIONAL_INFO,
    payload: others
})
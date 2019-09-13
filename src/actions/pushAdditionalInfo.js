import { SELECT_PUSH_ADDITIONAL_INFO } from './constants';

export const selectPushAdditionalInfo = (additionalInfo) => ({
    type: SELECT_PUSH_ADDITIONAL_INFO,
    payload: additionalInfo
})

import { SELECT_PRESSURE_ULCER } from './constants';

export const selectPressureUlcer = (pressure_ulcer) => ({
    type: SELECT_PRESSURE_ULCER,
    payload: pressure_ulcer
});
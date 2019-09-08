import { PACIENT_PRESSURE_ULCERS, ADD_PACIENT_PRESSURE_ULCER } from './constants';

export const setPacientPressureUlcers = (pacientPressureUlcers) => ({
    type: PACIENT_PRESSURE_ULCERS,
    payload: pacientPressureUlcers
});

export const addPacientPressureUlcer = (PressureUlcer) => ({
    type: ADD_PACIENT_PRESSURE_ULCER,
    payload: PressureUlcer
});
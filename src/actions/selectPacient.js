import { SELECT_PACIENT } from './constants';

export const selectPacient = (pacient) => ({
    type: SELECT_PACIENT,
    payload: pacient
});
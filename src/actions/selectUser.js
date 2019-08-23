import { SELECT_USER } from './constants';

export const selectUser = (user) => ({
    type: SELECT_USER,
    payload: user
});
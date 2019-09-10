import { PUSH_ENTRIES, ADD_PUSH_ENTRY } from './constants';

export const setPushEntries = (pushEntries) => ({
    type: PUSH_ENTRIES,
    payload: pushEntries
});

export const addPushEntry = (pushEntry) => ({
    type: ADD_PUSH_ENTRY,
    payload: pushEntry
});
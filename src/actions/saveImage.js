import { SAVE_IMAGE } from './constants';

export const saveImage = (image) => ({
    type: SAVE_IMAGE,
    payload: image
});
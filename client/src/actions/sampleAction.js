import * as types from './actionTypes';

export function sampleAction(data) {
    return {
        type: types.SAMPLE_ACTION,
        data: data
    };
}
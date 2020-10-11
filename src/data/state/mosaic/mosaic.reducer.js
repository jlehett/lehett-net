import * as types from '../action-types';

const initialState = {
    numImages: 50,
    tilingImageScale: 30,
    outputImageScale: 1.0,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case types.MOSAIC_SET_NUM_IMAGES:
            return {
                ...state,
                numImages: action.numImages
            };
        case types.MOSAIC_SET_TILING_IMAGE_SCALE:
            return {
                ...state,
                tilingImageScale: action.tilingImageScale
            };
        case types.MOSAIC_SET_OUTPUT_IMAGE_SCALE:
            return {
                ...state,
                outputImageScale: action.outputImageScale
            };
        default:
            return state;
    }
}
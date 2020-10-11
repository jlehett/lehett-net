import * as types from '../action-types';
import axios from 'axios';
import {
    mosaicNumImagesSelector,
    mosaicTilingImageScaleSelector,
    mosaicOutputImageScaleSelector,
} from './mosaic.selectors';

export function generateImage(img, bingSearch) {
    return async (dispatch, getState) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const formData = new FormData();
        formData.append('img', img);
        formData.append('bingSearch', bingSearch);
        formData.append('numImages', mosaicNumImagesSelector(getState()));
        formData.append('tilingImageScale', mosaicTilingImageScaleSelector(getState()));
        formData.append('outputImageScale', mosaicOutputImageScaleSelector(getState()));
        const response = await axios.post(
            '/api/mosaic/generate-mosaic/',
            formData,
            config
        );
        return response;
    }
}

export function setNumImages(numImages) {
    return async (dispatch) => {
        dispatch({ type: types.MOSAIC_SET_NUM_IMAGES, numImages });
    }
}

export function setTilingImageScale(tilingImageScale) {
    return async (dispatch) => {
        dispatch({ type: types.MOSAIC_SET_TILING_IMAGE_SCALE, tilingImageScale });
    }
}

export function setOutputImageScale(outputImageScale) {
    return async (dispatch) => {
        dispatch({ type: types.MOSAIC_SET_OUTPUT_IMAGE_SCALE, outputImageScale });
    }
}
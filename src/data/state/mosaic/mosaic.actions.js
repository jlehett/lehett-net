import * as types from '../action-types';
import axios from 'axios';

export function generateImage(img, bingSearch) {
    return async (dispatch) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const formData = new FormData();
        formData.append('img', img);
        formData.append('bingSearch', bingSearch);
        const response = await axios.post(
            '/api/mosaic/generate-mosaic/',
            formData,
            config
        );
        return response;
    }
}
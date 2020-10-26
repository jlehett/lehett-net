import * as types from '../action-types';

const initialState = {
    numImages: 50,
    tilingImageScale: 30,
    outputImageScale: 1.0,
    sendEmail: false,
    emailTo: '',
    uploadedImageFile: null,
    uploadedImageContent: null,
    generatedImage: null,
    searchQuery: '',
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
        case types.MOSAIC_SET_SEND_EMAIL:
            return {
                ...state,
                sendEmail: action.sendEmail
            };
        case types.MOSAIC_SET_EMAIL_TO:
            return {
                ...state,
                emailTo: action.emailTo
            };
        case types.MOSAIC_SET_UPLOADED_IMAGE:
            return {
                ...state,
                uploadedImageFile: action.uploadedImageFile,
                uploadedImageContent: action.uploadedImageContent,
            };
        case types.MOSAIC_SET_GENERATED_IMAGE:
            return {
                ...state,
                generatedImage: action.generatedImage
            };
        case types.MOSAIC_SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.searchQuery
            };
        default:
            return state;
    }
}
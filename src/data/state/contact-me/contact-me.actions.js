import * as types from '../action-types';
import axios from 'axios';

export function contactMe(
    fromName,
    fromEmail,
    message
) {
    return async (dispatch) => {
        if (fromName && fromEmail && message) {
            const response = await axios.post('/api/home/contact-me/', {
                fromName,
                fromEmail,
                message
            });
            return response.data;
        } else {
            return {
                'error': true,
                'message': 'One or more body parameters were empty.'
            }
        }
    }
}
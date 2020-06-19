import axios from 'axios';

export const request = async (method, url, data = {}) => {
    let params = {
        method: method,
        url: url,
        data: data
    };

    if (method === 'get') {
        params = {
            method: method,
            url: url,
            params: data
        };
    }

    let response = await axios(params);
    return response.data;
};

const axios = require('axios');
const rp = require('request-promise');

class Http {

    constructor() {}

    async post(url, data, headers) {
        try {
            const response = await axios.post(url, data, headers);
            return response.data;
        } catch (error) {
            console.log('error', error);
            throw error.response ? { ...error.response.data, status: error.response.status } : { ...error.data };
        }
    }
    async put(url, data, config) {
        try {
            const response = await axios.put(url, data, config);
            if(response.length) {
                response;
            }
            return response.data;
        } catch (error) {
            // console.log(error);
            throw error.response ? { ...error.response.data, status: error.response.status } : error.data;
        }
    }
    async postFormData(url, data, headers, type) {
        // eslint-disable-next-line no-useless-catch
        try {

            const { file, ...otherAttributes } = data;

            const fileData = type === 'pdf' ? {
                file: {
                    value: file.buffer,
                    options: {
                        filename: file.originalname,
                        contentType: file.mimetype,
                        mimeType: file.mimetype
                    },
                    mimeType: file.mimetype
                }
            } : {
                image: {
                    value: file.buffer,
                    options: {
                        filename: file.originalname,
                        contentType: file.mimetype,
                        mimeType: file.mimetype
                    },
                    mimeType: file.mimetype
                }
            };

            const options = {
                method: 'POST',
                uri: url,
                formData: {
                    ...otherAttributes,
                    ...fileData
                },
                headers: {
                    ...headers
                }
            };

            const response = await rp(options);
            
            return response;

        } catch (error) {
            throw error;
        }
    }
    async get(url, headers) {
        try {
            const response = await axios.get(url, headers);
            return response.data;
        } catch (error) {
            throw error.response ? { ...error.response.data, status: error.response.status } : { ...error.data };
        }
    }
    async webhook (url, data, headers) {
        try {
            const response = await axios.post(url, data, headers);
            return response.data;
        } catch (error) {
            console.log('error', error);
            throw error.response ? error.response.data : { ...error.data };
        }
    }

    logger (url, data, headers) {
        try {
            const response = axios.post(url, data, headers);
            return null;
        } catch (error) {
            console.log('error', error);
            throw error.response ? error.response.data : { ...error.data };
        }
    }
}

module.exports = Http;

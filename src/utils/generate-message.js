import dotenv from 'dotenv';
import responses from '../config/codes.json';

dotenv.config({ path: '../.env' });

/**
 * 
 * @param {string} code 
 * @param {boolean} validator 
 * @returns {string}
 */
export const generateMessages = (code, validator) => {
    return responses[`${process.env.NODE_ENV}`][`${process.env.ENV_LANG}`][`${code}`];
};

import dotenv from 'dotenv';
// import { loggerService } from './aws-logger';

dotenv.config({ path: '../.env' });

export const errorHandler = (error, req, res, next) => {


    const { body, query, headers } = req;

    const additionalInfo = {
        body,
        headers,
        query,
        response: {
            message: error.errors || error.message || error.name || error,
            errors: error,
            status: 406,
        }
    };

    if (process.env.NODE_ENV !== 'production') {
        console.log('error', error);
    }

    if (error.errors && Array.isArray(error.errors)) {
        
        // loggerService.logToCloudWatch(req, 'validation-error', additionalInfo);
        
        return res.status(406).json({
            message: error.errors[0],
            errors: process.env.NODE_ENV === 'production' ? null : error.errors
        });
    }

    // loggerService.logToCloudWatch(req, 'error', additionalInfo);

    // logger.log('error', `Error response while requesting ${method} ${originalUrl}`, { tags: 'http', additionalInfo: { body, query, headers, response: { status: error.status || 500, message: error.message || error.name || error } }});
    return res.status(error.status || 406).json({
        message: error.message || error.name || error,
        errors: process.env.NODE_ENV === 'production' ? null : error
    });
};

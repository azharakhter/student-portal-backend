import { generateMessages } from '../../utils/generate-message';
// import { loggerService } from '../aws-logger';
class RequestLoggerMiddleWare {

    constructor() {
    }

    async logger(req, res, next) {
        try {

            const { locals: { data: { message_code: messageCode, result: resultData, message, status } } } = res;

            const { body, query, headers } = req;
            
            const resObjMessage = messageCode ? {
                ...generateMessages(messageCode)
            } : {
                message
            };

            const size = Buffer.byteLength(JSON.stringify(resultData));

            const kiloBytes = size / 1024;

            const formatedResultData = kiloBytes <= 200 ? resultData : 'Data is to large to store';

            const additionalInfo = {
                body,
                headers,
                query,
                response: {
                    ...resObjMessage,
                    result: formatedResultData,
                    status: 200,
                }
            };

            // loggerService.logToCloudWatch(req, 'info', additionalInfo, resObjMessage, formatedResultData, resultData);

            // logger.log('info', `Requesting ${method} ${originalUrl}`, { tags: 'http', additionalInfo: { body, query, headers, response: { ...resObjMessage, status: 200, result: formatedResultData } }});

            res.status(200).json({
                ...resObjMessage,
                status: status ? status : 200,
                result: { ...resultData }
            });

        } catch (err) {
            next(err);
        }
    }

}

module.exports = new RequestLoggerMiddleWare();

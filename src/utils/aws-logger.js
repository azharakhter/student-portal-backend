// import * as AWS from 'aws-sdk';
// import { Http } from '../shared';

// const cloudwatchlogs = new AWS.CloudWatchLogs();

// export class LoggerService {

//     async logData (request, response_type, additionalInfo, resObjMessage, formatedResultData, resultData) {

//         try {

//             const { method, originalUrl } = request;

//             const postGroupName = process.env.NODE_ENV === 'production' ? 'prod' : process.env.NODE_ENV;

//             const logGroup = `${process.env.AWS_CLOUDWATCH_GROUP_NAME}_${postGroupName}`;
//             const reqTag = 'http';
//             const requestMethod = method;
//             const requestUrl = originalUrl;
//             const responseMessage = 'Requesting';
//             const responseType = response_type ?? 'info';

//             const requestToGetToken = {
//                 descending: true,
//                 limit: 1,
//                 logGroupName: logGroup,
//             };

//             const params = {
//                 logEvents: [
//                     {
//                         message: `[${responseType}], ${responseMessage} ${requestMethod} ${requestUrl}, ${JSON.stringify({ tags: reqTag, additionalInfo })} `,
//                         timestamp: new Date().getTime()
//                     },
//                 ],
//                 logGroupName: logGroup,
//                 logStreamName: logGroup,
//                 sequenceToken: (await cloudwatchlogs.describeLogStreams(requestToGetToken).promise()).logStreams[0].uploadSequenceToken
//             };

//             await cloudwatchlogs.putLogEvents(params).promise();
//             return null;

//         } catch (error) {
//             await this.logToCloudWatch(request, response_type, additionalInfo, resObjMessage, formatedResultData, resultData);
//             return null;
//         }

//     }

//     async logToCloudWatch (request, response_type, additionalInfo, resObjMessage, formatedResultData, resultData) {

//         try {

//             await this.logData(request, response_type, additionalInfo, resObjMessage, formatedResultData, resultData);
//             return null;

//         } catch (error) {
//             return null;
//         }

//     }

//     sendlogsToOATS (req, resultData){

//         const logRestuest = {
//             datetime: new Date(),
//             name : 'kiosk',
//             reqObj : {
//                 baseUrl: req.baseUrl,
//                 body : req.body,
//                 fullUrl: req.originalUrl,
//                 headers: req.headers,
//                 hostName: req.hostname,
//                 ip: req.ip,
//                 ips: req.ips,
//                 lastUrl: req.url,
//                 method: req.method,
//                 params : req.params,
//                 query : req.query,
//                 userAgent: req.get('user-agent'),
//                 xhr: req.xhr,
//             },
//             resObj : { ...resultData }
//             };

//             Http.logger('http://test.ovadamd.org:5005', { ...logRestuest });

//     }

// }

// export const loggerService = new LoggerService();

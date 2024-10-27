import { Http } from '../../shared';

class WebHookTriggerMiddleWare {

    constructor() {
        this.__http = Http; 
    }

    async changeInAppointments (req, res, next) {
        try {

            const { headers: { authorization } } = req;

            if (!authorization) {
                throw Error('Authorization failed');
            }

            const config = {
                headers: { Authorization: authorization },
            };

            const { locals: { data: { result: { data: resultData } } } } = res;

            const { appointment_ids: ids, action, trigger_socket: triggerSocket, request_from_sch: requestFromSch } = resultData || {};

            if (!requestFromSch) {

                Http.webhook(`${process.env.SOCKET_SERVER_URL}case-patient-session/change-in-waiting-list`, {}, config);
                Http.webhook(`${process.env.SOCKET_SERVER_URL}appointment/change-in-appointments`, {}, config);
            
            }

            if (ids && ids.length && !triggerSocket) {
                Http.webhook(`${process.env.SCHEDULER_URL}appointments/trigger-ios-action`, { id: ids, action }, config);
            }
            
            next();

            return undefined;

        } catch (err) {
            next(err);
        }
    }

}

module.exports = new WebHookTriggerMiddleWare();

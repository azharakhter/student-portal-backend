import { RoomService } from '../services';

import {
    sequelize
} from '../models';

class RoomController {

    constructor() {
        this._service = RoomService;
    }

    /**
     * Create session
     * Post: session/
     * @param {*} req 
     * @param {*} res 
     */
    async addRoomByUser(req, res, next) {
        try {
            const _transactionForCreation = await sequelize.transaction();
            try {
                const { body } = req;
                // const fileBuffer = req.file.buffer;
            
                const response = await this._service.addRoomByUser(req,body,_transactionForCreation);
                res.locals.data = { result: { data: response }, message_code: 'SUCCESS' };
                await _transactionForCreation.commit();
                next();
            } catch (error) {
                console.log("errore", error);
                await _transactionForCreation.rollback();
                throw error;
            }

        } catch (err) {
            console.log("err",err)
            next(err);
        }

    }
    async bookRoomByUser(req, res, next) {
        try {
            const _transactionForCreation = await sequelize.transaction();
            try {
                const { body } = req;            
                const response = await this._service.bookRoomByUser(body,_transactionForCreation);
                res.locals.data = { result: { data: response }, message_code: 'SUCCESS' };
                await _transactionForCreation.commit();
                next();
            } catch (error) {
                await _transactionForCreation.rollback();
                throw error;
            }

        } catch (err) {
            next(err);
        }

    }
    async getRoomByUser(req, res, next) {
        try {
            const { query, headers: { authorization } } = req;
            const response = await this._service.GetRoomByUser(query);
            res.locals.data = { result: { data: response }, message_code: 'SUCCESS' };
            next();
        } catch (err) {

            next(err)

        }


    }

    async updateRoomByUser(req, res, next) {
        try {
            const { body } = req;
            const response = await this._service.UpdateRoomByUser(body);
            res.locals.data = { result: { data: response }, message_code: 'SUCCESS' };
            next();
        } catch (err) {

            next(err)

        }


    }
    async deleteRoomByUser(req, res, next) {
        try {
            const _transactionForUpdation = await sequelize.transaction();
            try {
                const { body } = req;
                const response = await this._service.deleteRoomByUser(body,_transactionForUpdation);
                res.locals.data = { result: { data: response }, message_code: 'SUCCESS' };
                await _transactionForUpdation.commit();
                next();
            } catch (error) {
    
                await _transactionForUpdation.rollback();
                throw error;
    
            }
            
        } catch (err) {
            next(err);

        }
    }

}

module.exports = RoomController;
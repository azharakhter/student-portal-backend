import { UserService } from '../services';


import {
    sequelize
} from '../models';


class UserController {

    constructor() {
        this._service = UserService;

    }

    /**
     * Create session
     * Post: session/
     * @param {*} req 
     * @param {*} res 
     */
    async createUser(req, res, next) {
        try {
            const { body } = req;
                const response = await this._service.createUser(body);
                res.locals.data = { result: { data: response }, message_code: 'SUCCESS' };
                next();
            } catch (err) {
            
               next(err)
        
            }

       
    }

    async LoginUser(req, res, next) {
        try {
            const { body } = req;
                const response = await this._service.LoginUser(body);
                res.locals.data = { result: { data: response }, message_code: 'SUCCESS' };
                next();
            } catch (err) {
            
               next(err)
        
            }

       
    }
    async getUser(req, res, next) {
        try {
            const { query, headers: { authorization } } = req;
                const response = await this._service.getUser(query);
                res.locals.data = { result: { data: response }, message_code: 'SUCCESS' };
                next();
            } catch (err) {
            
               next(err)
        
            }

       
    }
    async updateUser(req, res, next) {
        try {
            const { body } = req;
                const response = await this._service.updateUser(body);
                res.locals.data = { result: { data: response }, message_code: 'SUCCESS' };
                next();
            } catch (err) {
            
               next(err)
        
            }

       
    }

}

module.exports = UserController;
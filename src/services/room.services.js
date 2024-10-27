
/**
 * import all the dependices for the user serives 
 * 
 * In the services file we write the login and interact with the model thorugh repositer using sigelton pattern structure
 * all the service with repo is on the contructor in index file 
 * 
 * service => repo => model => database table 
 */
import {
    Helper
} from '../shared';
require('dotenv').config({ path: '../../env' });
const path = require('path');
const jwt = require('jsonwebtoken');
import bcrypt from 'bcrypt';
import {
    generateMessages
} from '../utils';

import {
    room_images,
    room_features,
    booking_room
} from '../models';
import { Op } from 'sequelize';


class RoomService extends Helper {

    constructor(
        UserRepository,
        RoomRepository,
        RoomImageRepository,
        RoomFeatureRepository,
        RoomBookingRepository

    ) {
        super();
        this._userRepo = UserRepository;
        this._repo = RoomRepository;
        this._imageRepo = RoomImageRepository;
        this._featureRepo = RoomFeatureRepository;
        this._bookingRepo = RoomBookingRepository;
    }
    /**
     * create new user by getting value from the signup form 
     * @param {*}  
     */

    async addRoomByUser(data,body, _transactionForCreation) {
        //getting value of the room in different objects
        // const { userId, roomInfo, roomFeature, roomImagesUrls } = body;
        const { user_id, advance_rent, contact_person_number, description, rent_of_room, room_name, ...featureDate } = body;
      
    
        if (!data?.file) {
            throw Error('No file found!');
        }
     
        
        const roomInfo = {
            user_id: user_id,
            room_name,
            contact_person_number,
            rent_of_room,
            advance_rent
        }



        //upload to s3 butkets image 

        if (!roomInfo || Object.keys(roomInfo).length === 0) {
            throw generateMessages('INTERNAL_SERVER_ERROR');
        }

    
        const newRoomPost = this.shallowCopy(await this._repo.create(roomInfo), _transactionForCreation);

        const roomFeature = {         
            room_id: newRoomPost?.id,
            descriptions:description,
            ...featureDate
        }

        if (!roomFeature || Object.keys(roomFeature).length === 0) {
            throw generateMessages('INTERNAL_SERVER_ERROR');
        }
        const featureOfRoom = this.shallowCopy(await this._featureRepo.create({  ...roomFeature }), _transactionForCreation);
        
        const serverAddress = process.env.SERVER; // Replace with your server address
        const imageUrl = `${serverAddress}/${data?.file?.path}`;
        
        const imageInfo = {
            room_id: newRoomPost?.id,
            image_url:imageUrl,
        }
    

        const imageSave = this.shallowCopy(await this._imageRepo.create({  ...imageInfo }), _transactionForCreation);

        return {
            newRoomPost,
            featureOfRoom,
            imageSave
        };
    
    }


    async bookRoomByUser(body, _transactionForCreation) {
        const {bookRoom } = body;
        
        const bookRoomReqest = this.shallowCopy(await this._bookingRepo.create(bookRoom), _transactionForCreation);
    
        return {
            bookRoomReqest,
        };
    }

    /**
    * getting the user date
    * @param {*} body 
    * @returns 
    */
    async GetRoomByUser(query) {
       
        let {
            page, per_page, order, order_by,roomId,rent_of_room,check_in_data,check_out_data
        } = query;

        
        const orderBy = order_by ? order_by : 'ASC';

        order = order ? order : 'id';

        let where = {};

        if (roomId) {
            where = { id: roomId };
        }
        
        if (rent_of_room) {
            where.rent_of_room = { [Op.eq]: rent_of_room };
        }

        
        let whereClauseForFeature = {
            deleted_at: null
        };

        if (check_in_data) {
            // If check_in_data is provided, filter for exact match
            whereClauseForFeature.to_avaible_date = {
                [Op.and]: [
                    { [Op.gt]: new Date(check_in_data) }
            ]  };
            
        }
        
        // Check if check_out_data is provided
        if (check_out_data) {
            if (check_in_data) {
                // If both check_in_data and check_out_data are provided, filter between check_in_data and check_out_data
                whereClauseForFeature.to_avaible_date = { [Op.between]: [new Date(check_in_data), new Date(check_out_data)] };
            } else {
                // If only check_out_data is provided, filter for exact match
                whereClauseForFeature.from_end_date = {
                    [Op.and]: [
                        { [Op.gt]: new Date(check_out_data) }
                ]  };
                
            }
        }

        


        const options = {
            page: page ? parseInt(page) : 1,
            paginate: per_page ? parseInt(per_page) : 10,
            order: [[`${order}`, `${orderBy}`]],
            include: [
                {
                    model: room_images, as: 'roomImages',
                    
                },
                {
                    model: room_features, as: 'roomFeatures',
                    where:whereClauseForFeature
                },
                {
                    model: booking_room, as: 'roombooking',
                },
                
            ],
            where
        };

        const { docs,pages, total } = await this._repo.pagination(options);

        return {
            data: docs,
            pages,
            total
        };
    }

    /**
     * to login user
     * @param {*} body 
     * @returns 
     */

    async UpdateRoomByUser(body,_transactionForUpdation) {
        //getting value of the room in different objects
        const { userId, roomInfo, roomFeature, roomImagesUrls } = body;

        //check if the user does not  exist in our users table
        const userExist = this.shallowCopy(await this._userRepo.findOne({ id: userId,deleted_at:null }));
        const roomPostExist = this.shallowCopy(await this._repo.findOne({ id: roomInfo?.id,deleted_at:null }));
        if (!userExist) {
            //it is a generic funcation to throw a error or generte the message            
            throw generateMessages('USER_NOT_FOUND');
        }
        if (!roomPostExist) {
            //it is a generic funcation to throw a error or generte the message            
            throw generateMessages('ROOM_NOT_FOUND');
        }
        
        
        await Promise.all([
            roomInfo?.id ? this._repo.update(roomInfo.id, roomInfo, _transactionForUpdation) : Promise.resolve(),
            roomFeature?.id ? this._featureRepo.update(roomFeature?.id, roomFeature, _transactionForUpdation) : Promise.resolve(),
        ]);


        

        return {
            userId
        };
    }

    /**
     * update the user information
     * @param {*} body 
     * @returns 
     */
    async deleteRoomByUser(body, _transactionForUpdation) {
    
        const { roomIds } = body;
        
        // Fetch room ids
        const roomPostsIds = (await this._repo.findAll({ id: roomIds })).map(roomPost => roomPost.id);
        
        // Check if any rooms are found
        if (!(roomPostsIds.length > 0)) {
            throw generateMessages('ROOM_NOT_FOUND');
        }
        // Update room, images, features, and bookings with deleted_at timestamp
        await Promise.all([
            this._repo.updateByIds(roomPostsIds, { deleted_at: new Date() }, _transactionForUpdation),
            this._featureRepo.updateByReferenceIds({ room_id: roomPostsIds }, { deleted_at: new Date() }, _transactionForUpdation),
        ]);
    
        return { roomPostsIds };
    }
    
}


//exports single object of the userService s

module.exports = RoomService;
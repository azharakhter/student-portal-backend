
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
const jwt = require('jsonwebtoken');
import bcrypt from 'bcrypt';
import {
    generateMessages
} from '../utils';
import * as models from '../models';
import {
    room_images,
    room_features,
    booking_room,
    room_posts
} from '../models';

class UserService extends Helper {

    constructor(
        UserRepository,
        ContactUsRepository
    ) {
        super();
        this._repo = UserRepository;
    }

    /**
     * create new user by getting value from the signup form 
     * @param {*}  
     */

    async createUser(body) {
        //getting value of the user
        const { username, email, password } = body;
        //check if the user already exist in our users table  
        const existingUser = this.shallowCopy(await this._repo.findOne({ email: email, username: username,deleted_at:null }));
        //it the user already exist  give error the user already exist 
        if (existingUser) {
            //it is a generic funcation to throw a error or generte the message
            throw generateMessages('EXIST_USER');
        }

        // convert the password of user with hash value using library bcrpty
        const hashUserPassword = await bcrypt.hash(password, 10);
        
        //create new user in our users table
        const newUserCreated = this.shallowCopy(await this._repo.create({ email: email, password: hashUserPassword, username: username }));
        
        // return the new user to frontend with message 
        return { userId: newUserCreated.id, username: newUserCreated.username, email: newUserCreated.email };

    }

    /**
     * to login user
     * @param {*} body 
     * @returns 
     */

    async LoginUser(body) {
        //getting value 
        const { email, password } = body;

        //check if the user already exist it is in our table or not 
        const existingUser = this.shallowCopy(await this._repo.findOne({ email: email,deleted_at:null}));
        if (!existingUser) {
            throw generateMessages('USER_NOT_FOUND');
        }

        //compare the password of our user with library bcrypt with given password and old password
        const isValidPassworsd = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassworsd) {
            throw generateMessages('INVALID_PASSWORD');
        }

        //generate the jwt token using jwt and send the user info within token without password
        const token = jwt.sign({ userId: existingUser.id,username:existingUser.username,email:existingUser.email }, process.env.SECRET_KEY, { expiresIn: '5h' });

        return {
            token
        };

    }


    /**
     * getting the user date
     * @param {*} body 
     * @returns 
     */
    async getUser(body) {
        //getting the id from the frotnend
        const { id } = body;
        const includeClause = {
            include: [
                {
                    as: 'userPosts',
                    model: models.room_posts,
                    required: false,
                    where: { deleted_at: null },
                    include: [
                        {
                            model: room_images, as: 'roomImages',
                            
                        },
                        {
                            model: room_features, as: 'roomFeatures',
                        },
                        {
                            model: booking_room, as: 'roombooking',
                        },
                        
                    ],
                },
                {
                    as: 'userBooking',
                    model: models.booking_room,
                    required: false,
                    where: { deleted_at: null },
                    include: [
                        {
                            model: room_posts, as: 'bookRooms',
                            include: [
                                {
                                    model: room_features, as: 'roomFeatures',
                                },
                                {
                                    model: room_images, as: 'roomImages',
                                    
                                },
                            ]
                        },
                    ]
                }
                

            ]
        };

        //if the user found the send the user date otherwise empty object 
            const findUser = this.shallowCopy(await this._repo.findOne({ id,deleted_at:null},{...includeClause}));
        return {
            ...findUser
        }
    }


    /**
     * update the user information
     * @param {*} body 
     * @returns 
     */
    async updateUser(body) {
        //getting the user info
        const { username, userId, password } = body;
        console.log("")

        //check if the user already exist with emial 
        const existingUser = this.shallowCopy(await this._repo.findOne({ id: userId,deleted_at:null }));
        if (!existingUser) {
            throw generateMessages('EMAIL_NOT_FOUND');
        }

        //if user want to update password then hash password
        let hashUserPassword;
        if (password) {
            hashUserPassword = await bcrypt.hash(password, 10);
        }
        
        //update info and create uddate object 
        const updateUser = {
            username: username,
            password: password ? hashUserPassword: existingUser.password
        }
        
        //update the object
        const updateUserInfo = this.shallowCopy(await this._repo.update(existingUser.id,updateUser));
        
        return { userId: updateUserInfo.id, username: updateUserInfo.username, email: updateUserInfo.email };

    }



}


//exports single object of the userService s

module.exports = UserService;
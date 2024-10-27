import * as repositories from '../repositories';

import UserService from './user.services';
import RoomService from './room.services';


module.exports = {
    UserService: new UserService(
        repositories.UserRepository,
        repositories.ContactUsRepository,    
    ),
    RoomService: new RoomService(
        repositories.UserRepository,
        repositories.RoomRepository,
        repositories.RoomImageRepository,
        repositories.RoomFeatureRepository,
        repositories.RoomBookingRepository,
        
    ),
    
};

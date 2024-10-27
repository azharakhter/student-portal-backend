import UserRepository from './user.repository';
import RoomRepository from './room.repository';
import ContactUsRepository from './contact-us.repository';
import RoomBookingRepository from './room-booking.repository';
import RoomFeatureRepository from './room-feature.repository';
import RoomImageRepository from './room-image.repository';

module.exports = {
    UserRepository: new UserRepository(),
    RoomRepository: new RoomRepository(),
    ContactUsRepository: new ContactUsRepository(),
    RoomBookingRepository: new RoomBookingRepository(),
    RoomFeatureRepository: new RoomFeatureRepository(),
    RoomImageRepository: new RoomImageRepository(),
};

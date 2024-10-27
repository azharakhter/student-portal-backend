import BaseRepository from '../shared/base-repository';

import * as models from '../models';

/**
 * Cases Repository Class
 */
class RoomBookingRepository extends BaseRepository {
    /**
     * Constructor
     */
    constructor() {
        super(models.booking_room);
    }
}

module.exports = RoomBookingRepository;
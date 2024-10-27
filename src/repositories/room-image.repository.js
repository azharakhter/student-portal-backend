import BaseRepository from '../shared/base-repository';

import * as models from '../models';

/**
 * Cases Repository Class
 */
class RoomImageRepository extends BaseRepository {
    /**
     * Constructor
     */
    constructor() {
        super(models.room_images);
    }
}

module.exports = RoomImageRepository;
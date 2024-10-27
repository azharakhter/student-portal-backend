import BaseRepository from '../shared/base-repository';

import * as models from '../models';

/**
 * Cases Repository Class
 */
class RoomRepository extends BaseRepository {
    /**
     * Constructor
     */
    constructor() {
        super(models.room_posts);
    }
}

module.exports = RoomRepository;
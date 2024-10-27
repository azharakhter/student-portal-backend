import BaseRepository from '../shared/base-repository';

import * as models from '../models';

/**
 * Cases Repository Class
 */
class RoomFeatureRepository extends BaseRepository {
    /**
     * Constructor
     */
    constructor() {
        super(models.room_features);
    }
}

module.exports = RoomFeatureRepository;
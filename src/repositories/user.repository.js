import BaseRepository from '../shared/base-repository';

import * as models from '../models';

/**
 * Cases Repository Class
 */
class UserRepository extends BaseRepository {
    /**
     * Constructor
     */
    constructor() {
        super(models.users);
    }
}

module.exports = UserRepository;
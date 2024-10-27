import BaseRepository from '../shared/base-repository';

import * as models from '../models';

/**
 * Cases Repository Class
 */
class ContactUsRepository extends BaseRepository {
    /**
     * Constructor
     */
    constructor() {
        super(models.contact_us);
    }
}

module.exports = ContactUsRepository;
import { generateMessages } from './generate-message';
import authenticateJWT from './middleware/authenticate';

module.exports = {
    generateMessages,
    authenticateJWT
};

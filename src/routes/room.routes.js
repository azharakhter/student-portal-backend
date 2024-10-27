import express from 'express';
import RequestLoggerMiddleWare from '../utils/middleware/request-logger';
import authenticateJWT from '../utils/middleware/authenticate';
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the destination directory (relative to the root of your project)
        const uploadDir = './uploads'; // Example: 'uploads'

        // Ensure the destination directory exists
        fs.mkdirSync(uploadDir, { recursive: true });

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Define a custom file name if needed
        cb(null, file.originalname);
    }
});

// Create an instance of multer with the specified configuration
const upload = multer({ storage: storage });




const roomRouter = express.Router();
const { RoomController } = require('../controllers');

roomRouter.post('/add-room',upload.single('images'), (...args) => RoomController.addRoomByUser(...args), RequestLoggerMiddleWare.logger);

roomRouter.post('/book-room', (...args) => RoomController.bookRoomByUser(...args), RequestLoggerMiddleWare.logger);

roomRouter.get('/get-room', (...args) => RoomController.getRoomByUser(...args), RequestLoggerMiddleWare.logger);

roomRouter.put('/update-room', (...args) => RoomController.updateRoomByUser(...args), RequestLoggerMiddleWare.logger);

roomRouter.delete('/delete-rooms',(...args) => RoomController.deleteRoomByUser(...args), RequestLoggerMiddleWare.logger);

module.exports = roomRouter;


import express from "express";

import usersRouter from './users.routes';
import roomRouter from './room.routes';


const router = express.Router()

router.use("/user", usersRouter);
router.use("/room", roomRouter);

module.exports = router;

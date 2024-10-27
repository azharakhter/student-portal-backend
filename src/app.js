/**
 * module dependencies
 * 
 */
import express from "express";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import timeout from 'connect-timeout';
import routes from './routes/routes.js';
import db from "./config/db.js";

import { errorHandler } from './utils/error-handler';

/**
 * 
 * Database connection
 * 
 */

db.authenticate()
  .then(() => console.log('%s Database connected successfully!'))
  .catch((error) => {
    console.log('Database authenticaion error...', error);
    process.exit();
  });




/**
 * Load enviornment variables from .env file where api keys and password are configure
 */
dotenv.config({path:".env"})


/**
 *  Create Express server
 */
const app = express();


//funcation for the time out of the request

function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
}
app.use('/uploads', express.static('uploads'));

//user middle ware to configure the timeout function
app.use(timeout(12000000));
app.use(haltOnTimedout);


//express configuration

app.set('host', '0.0.0.0');
app.set('port',  8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:3000/', '*']
}));


// //midlle ware for the api routes 
app.use("/api", routes);

app.get("/", (request, response) => {
    return response.send(`
        <br />
        <br />
        <center>
            <h1>
                Hello 👋 from AWS EC2
            </h1>
        </center>
    `);
});


//error handler  middler ware
app.use(errorHandler);


//create http server for the fast response the express server
const server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
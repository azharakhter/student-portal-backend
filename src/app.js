import express from "express";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import timeout from 'connect-timeout';
import routes from './routes/routes.js';
import db from "./config/db.js";
import { errorHandler } from './utils/error-handler';

// Load environment variables first
dotenv.config({ path: ".env" });

// Database connection
db.authenticate()
  .then(() => console.log('%s Database connected successfully!'))
  .catch((error) => {
    console.log('Database authentication error...', error);
    process.exit();
  });

const app = express();

// Middleware for request timeout
function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
}
app.use('/uploads', express.static('uploads'));
app.use(timeout(120000));
app.use(haltOnTimedout);

// Express configuration
app.set('host', 'localhost');
app.set('port', 3000);  // Set to 3000 for AWS EC2 access
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({ origin: '*' }));

// API routes
app.use("/api", routes);

app.get("/", (req, res) => {
    return res.send(`
        <center>
            <h1>Hello 👋 from AWS EC2</h1>
        </center>
    `);
});

// Error handler middleware
app.use(errorHandler);

// Create HTTP server for fast response
const server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log('App is running at http://0.0.0.0:%d in %s mode', app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
});

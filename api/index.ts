import express from 'express';
import http from "http";
import { loadRoutes } from './routes';
import { logger, logReq } from './commons/logger';
import { MongoError } from "mongodb";
import { connect } from './libs/db_connection';
import { errorHandler } from './middleware/error';

const app = express();
const port = 3000;
const config = require('config');

app.use(logReq);
app.use(express.json());
app.use(errorHandler); //-> middleware


try {
    connect(config).then(() => logger.info('db connected!'));
} catch (e) {
    logger.error(e);
}

export function startProd(port){
    return http.createServer(app).listen(port, () => {
        //use logger App listen in....
    })
}

function startdev (port){
    return startProd(port);
}

export function start(port = 8080){
    app.get("/ping", (req,res)=>{
        res.send("pong")
    });
    //init middleware authentication
    //init sub routes
    loadRoutes(app);

    startdev(port);
}

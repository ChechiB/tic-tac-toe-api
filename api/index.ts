import express from 'express';
import http from "http";
import { loadRoutes } from './routes';
import { logger, logReq } from './commons/logger';
import { MongoError } from "mongodb";

const app = express();
const port = 3000
const config = require('config');

app.use(logReq);
app.use(express.json());
//app.use(errorHandler); //-> middleware
app.use((err, req, res, next) => {
    //err.isServer
    //res.algo
    /* let result = handleError(err, res) ;
    result.send(result.body)
    next() */
});


import { connect } from './libs/db_connection';

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

export function start(port = 3000){
    app.get("/ping", (req,res)=>{
        res.send("pong")
    });
    //init middleware authentication
    //init sub routes
    //loadRoutes(app);

    startdev(port);
}
//app.use('/', indexRouter);
//app.use('/campaign',campaignRoute);

/* app.use((err, req, res, next) => {
    //err.isServer
    let result = handleError(err, res) ;
    result.send(result.body)
    next()
  });

import redis from "redis";
const client = redis.createClient();
   
client.on("error", function(error) {
    console.error(error);
});
   
client.set("key", "value", redis.print);
client.get("key", redis.print); */
  

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middlewares from './src/middlewares/MiddleWares.js';
import UserRoutes from './src/routes/User.routes.js';
import Config from './config/Config.js';
import dotenv from 'dotenv';

dotenv.config()

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(helmet());
app.use(morgan('common'));


app.get("/exercises", (req, res) =>  {
    res.send("Stretcha bröstmuskel")
})

UserRoutes.routes(app)
app.use(middlewares.notFound)
app.use(middlewares.errorHandler);

Config.connectToDatabase();
Config.connectToPort(app);


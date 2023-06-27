import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import middlewares from './src/middlewares/MiddleWares.js';
import Config from './config/Config.js';

dotenv.config()
const app = express();

app.use(helmet());
app.use(morgan('common'));


app.get("/exercises", (req, res) =>  {
    res.send("Stretcha bröstmuskel")
})


app.use(middlewares.notFound)
app.use(middlewares.errorHandler);

Config.connectToDatabase();
Config.connectToPort(app);


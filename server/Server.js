import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middlewares from './src/middlewares/MiddleWares.js';
import UserRoutes from './src/routes/User.routes.js';
import Config from './config/Config.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { auth } from './src/routes/Auth.routes.js';
import { checkAuth } from './src/middlewares/CheckAuth.middlewares.js';


dotenv.config()

const app = express();

app.use(express.json());
const corsOptions = {
	origin: [
		'http://localhost:3000',
		'http://127.0.0.1',
		'http://104.142.122.231',
	],
	credentials: true,
	exposedHeaders: ['set-cookie'],
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(helmet());
app.use(morgan('common'));

UserRoutes.routes(app)
app.use('/auth', auth);


Config.connectToDatabase();
Config.connectToPort(app);


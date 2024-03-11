import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import UserRoutes from './src/routes/User.routes.js';
import Config from './Config.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { auth } from './src/routes/Auth.routes.js';
import { exercises } from './src/routes/Exercises.routes.js';


dotenv.config()

const app = express();

app.use(express.json());
const corsOptions = {
	origin: (origin, callback) => {
	  if (
		['http://localhost:3000', 'https://deskstretch.vercel.app'].includes(origin)
	  ) {
		callback(null, true);
	  } else {
		callback(new Error('Not allowed by CORS'));
	  }
	},
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE ,OPTIONS',
	credentials: true,
	exposedHeaders: ['set-cookie'],
  };
  
  app.use(cors(corsOptions));
  
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(helmet());
app.use(morgan('common'));

UserRoutes.routes(app)
app.use('/auth', auth);
app.use('/exercises', exercises);


Config.connectToDatabase();
Config.connectToPort(app);
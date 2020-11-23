import * as express from 'express';
import * as http from 'http';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

import CONFIG from './config';
import router from './router';

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', router());

http.createServer(app).listen(CONFIG.SERVER.PORT);
console.log(`Http listening on port ${CONFIG.SERVER.PORT}`);
import express from 'express';
import 'babel-polyfill';
import 'babel-plugin-inline-json-import'

import cookieParser from 'cookie-parser';
import logger from 'morgan';

import routesEndpoints from './endpoints/routes/routes.endpoints';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/routes', routesEndpoints);

export default app;

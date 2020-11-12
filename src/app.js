import express from 'express';
import 'babel-polyfill';
import 'babel-plugin-inline-json-import'

import cookieParser from 'cookie-parser';
import logger from 'morgan';

import mongodb from 'src/constants/mongodb'
import mongoose from 'mongoose'

import messages from './endpoints/messages/messages.routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect(mongodb.CREDENTIALS.host, {
    user: mongodb.CREDENTIALS.user,
    pass: mongodb.CREDENTIALS.password,
    dbName: mongodb.CREDENTIALS.dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set('useFindAndModify', false);

app.use('/messages', messages);

export default app;

import express from 'express';
import 'babel-polyfill';
import 'babel-plugin-inline-json-import'

import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import mongodb from 'src/constants/mongodb'
import mongoose from 'mongoose'

import messages from 'src/api/messages/messages.routes';
import users from 'src/api/users/users.routes';

const app = express();

// noinspection JSCheckFunctionSignatures
app.use(logger('dev'));
// noinspection JSCheckFunctionSignatures
app.use(cors({ credentials: true, origin: false }));
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
mongoose.set('useCreateIndex', true);

app.use('/messages', messages);
app.use('/users', users);

export default app;

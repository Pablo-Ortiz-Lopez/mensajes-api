import { model, Schema } from 'mongoose';
import database from 'src/constants/mongodb';

const UserSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            match: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        collection: 'users',
        timestamps: true,
        useNestedStrict: true,
    }
);

export default model(database.SCHEMAS.USERS.MODEL, UserSchema);

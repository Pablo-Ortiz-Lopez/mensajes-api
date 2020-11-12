import { model, Schema } from 'mongoose';
import database from 'src/constants/mongodb';

const MessageSchema = new Schema(
    {
        userId: { type: String },
        crc: { type: Number },
        encoded: { type: String },
    },
    {
        collection: database.SCHEMAS.MESSAGES.COLLECTION,
        timestamps: true,
        useNestedStrict: true,
    }
);

export default model(database.SCHEMAS.MESSAGES.MODEL, MessageSchema);

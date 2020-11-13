import Message from './messages.model'
import CRC8 from 'src/utils/crc8'
import Caesar from "src/utils/caesar";

const crc8 = new CRC8();
const caesar = new Caesar();

export default class Controller {
    add = async (req, res) => {
        try {
            const {decoded} = req.body;
            const {userId} = req;
            if(!decoded || !userId){
                return req.status(401).send({message: 'Bad request'})
            }

            const allMessages =  await Message.find({userId:userId}).exec()
            let crcSum = 0;
            allMessages.forEach(message => crcSum += message.crc)

            const message = await new Message({
                userId:userId,
                crc: crc8.checksum(decoded),
                encoded: caesar.cypher(decoded,crcSum)
            }).save();
            if (!message) {
                return res.status(404).send(null);
            }
            res.status(201).send(message);
        } catch (err) {
            res.status(500).send({
                message: err.toString(),
            });
        }
    };

    update = async (req, res) => {
        try {
            const {_id, decoded} = req.body;
            const {userId} = req;
            if(!_id || !decoded || !userId){
                return req.status(401).send({message: 'Bad request'})
            }
            const allMessages =  await Message.find({userId:userId}).exec()

            const newCrc = crc8.checksum(decoded)
            let crcDiff = 0;
            let crcSum = 0;
            let nextMessage;
            for(let i = 0; i<allMessages.length; i++){
                const message = allMessages[i]
                if(message._id.toString() === _id){
                    crcDiff = newCrc - message.crc
                    if(allMessages[i+1]){
                        nextMessage = allMessages[i+1]
                    }
                    break;
                }
                crcSum += message.crc
            }

            await Message.findOneAndUpdate(
                {_id},
                {
                    crc: newCrc,
                    encoded: caesar.cypher(decoded,crcSum)
                }).exec();

            if(nextMessage){
                await Message.findOneAndUpdate(
                    {_id: nextMessage._id},
                    {
                        encoded: caesar.cypher(nextMessage.encoded,crcDiff) // Apply updated cypher
                    }).exec();
            }

            res.status(201).send({updated:_id});
        } catch (err) {
            res.status(500).send({
                message: err.toString(),
            });
        }
    };

    delete = async (req, res) => {
        try {
            const {_id} = req.body;
            const {userId} = req;
            if(!_id || !userId){
                return req.status(401).send({message: 'Bad request'})
            }

            const allMessages =  await Message.find({userId:userId}).exec()

            let crcDiff = 0;
            let nextMessage;
            for(let i = 0; i<allMessages.length; i++){
                const message = allMessages[i]
                if(message._id.toString() === _id){
                    crcDiff = -1 * message.crc
                    if(allMessages[i+1]){
                        nextMessage = allMessages[i+1]
                    }
                    break;
                }
            }

            await Message.findOneAndDelete({_id}).exec();

            if(nextMessage){
                await Message.findOneAndUpdate(
                    {_id: nextMessage._id},
                    {
                        encoded: caesar.cypher(nextMessage.encoded,crcDiff) // Apply updated cypher
                    }).exec();
            }
            res.status(201).send({deleted:_id});
        } catch (err) {
            res.status(500).send({
                message: err.toString(),
            });
        }
    };


    findAll = async (req, res) => {
        try {
            const {userId} = req;
            if(!userId){
                return req.status(401).send({message: 'Bad request'})
            }

            const allMessages =  await Message.find({userId:userId}).exec()
            const decodedMessages = []
            let crcSum = 0;
            for(let i = 0; i<allMessages.length; i++){
                const message = allMessages[i].toObject()
                decodedMessages.push({
                    ...message,
                    decoded: caesar.cypher(message.encoded,-1 * crcSum)
                })
                crcSum += message.crc
            }


            res.status(201).send(decodedMessages);
        } catch (err) {
            res.status(500).send({
                message: err.toString(),
            });
        }
    };
}

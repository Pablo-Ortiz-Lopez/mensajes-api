import Message from "./messages.model";
import CRC8 from 'src/utils/crc8'
import Caesar from "src/utils/caesar";

const crc8 = new CRC8();
const caesar = new Caesar();


export const updateAndPropagate = async (allMessages, decoded, _id) => {
    const newCrc = decoded ? crc8.checksum(decoded) : 0
    let crcDiff = 0;
    let crcSum = 0;
    let i = 0;

    //Account previous messages CRC
    while(i<allMessages.length){
        const message = allMessages[i]
        if(message._id.toString() === _id){
            crcDiff = newCrc - message.crc
            break;
        }
        crcSum += message.crc
        i++
    }

    if(decoded){
        // Update selected message
        await Message.findOneAndUpdate(
            {_id},
            {
                crc: newCrc,
                encoded: caesar.cypher(decoded,crcSum)
            }).exec();
    }else{
        // Delete selected message
        await Message.findOneAndDelete({_id}).exec();
    }
    i++;

    //Propagate CRC sum changes in next messages
    while(i<allMessages.length){
        const message = allMessages[i]
        await Message.findOneAndUpdate(
            {_id: message._id},
            {encoded: caesar.cypher(message.encoded, crcDiff)})
            .exec();
        i++;
    }
}
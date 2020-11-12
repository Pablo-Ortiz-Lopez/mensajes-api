import * as jwt from 'jwt-then'
import {SECRET} from 'src/constants/encryption'

export default async (req,res,next) =>{
    if(!req.cookies || !req.cookies['jwtToken']) {
        return res.status(403).send({message: 'No active session.'});
    }

    const token = req.cookies['jwtToken']

    if (!token) {
        return res.status(403).send({message: 'No token provided.'});
    }

    try {
        // verifies secret and checks exp
        console.log("Verify token: ",token)
        const decoded = await jwt.verify(token, SECRET);
        req.userId = decoded.userId
        next();
    } catch (err) {
        return res.status(403).send({message: 'Invalid token provided.'});
    }
}

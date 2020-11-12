import User from './users.model'
import {SALT, JWT, SECRET} from "src/constants/encryption";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jwt-then'

export default class Controller {
    register = async (req, res) => {
        const { name, lastName, email, password } = req.body;
        try {
            const hash = await bcrypt.hash(password, SALT);

            const user = new User({
                name,
                lastName,
                email,
                password: hash,
            });

            let newUser = (await user.save()).toObject()

            res.status(201).send(newUser);
        } catch (err) {
            res.status(500).send({
                message: err.toString(),
            });
        }
    };

    login = async(req,res) => {
        try{
            const {email,password} = req.body
            const user = await User.findOne({email: email})
            if(!user){
                return req.status(404).send({message:'Not found'})
            }

            const matchPasswords = await bcrypt.compare(password, user.password);
            if (!matchPasswords) {
                return res.status(401).send({
                    message: 'Not authorized',
                });
            }

            const jwtToken = await jwt.sign({ userId: user._id.toString() }, SECRET, {
                expiresIn: JWT.tokenExpiration,
            });
            res.cookie('jwtToken',jwtToken)
            return res.status(200).send('OK')

        } catch (err) {
            res.status(500).send({
                message: err.toString(),
            });
        }
    }


    credentials = async(req,res) => {
        try{
            const {userId} = req
            const user = await User.findOne({_id: userId})
            if(!user){
                return req.status(404).send({message:'Not found'})
            }

            return res.status(200).send(user.toObject())

        } catch (err) {
            res.status(500).send({
                message: err.toString(),
            });
        }
    }

    logOut= async(req,res) => {
        res.clearCookie('jwtToken')
        return res.status(200).send('OK')
    }

}

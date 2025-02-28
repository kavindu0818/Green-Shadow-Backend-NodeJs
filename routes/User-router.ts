import express from "express";
import {User} from "../model/User";
import {getAllUsers, getSelectedUser, saveUser, verifyUserCredentials} from "../database/User-data";
import jwt, {Secret} from 'jsonwebtoken';
import dotenv from 'dotenv';
import {LoginUser} from "../model/LoginUser";

dotenv.config();

const router = express.Router();

const secretKey = process.env.SECRET_KEY;
const refreshTokenKey = process.env.REFRESH_TOKEN;

if (!secretKey || !refreshTokenKey) {
    console.error('SECRET_KEY or REFRESH_TOKEN is missing in the environment variables');
    process.exit(1);  // Stop the application if keys are missing
}

router.post("/login", async (req, res) => {
    console.log('Login')
    const phoneNumber = req.body.user.phoneNumber;
    const password = req.body.user.password;

    const login : LoginUser = {phoneNumber, password};

    try{
        const isVerified =  await verifyUserCredentials(login);

        if(isVerified){
            const token = jwt.sign({ phoneNumber }, process.env.SECRET_KEY as Secret, {expiresIn: "1m"});
            const refreshToken = jwt.sign({ phoneNumber }, process.env.REFRESH_TOKEN as Secret, {expiresIn: "7d"});
            console.log(token)
            res.json({accessToken : token, refreshToken : refreshToken});
        }else{
            res.sendStatus(403).send('Invalid credentials')
        }
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }

})

router.post('/add', async (req: express.Request, res: express.Response) => {

    try {
        const phoneNumber = req.body.phoneNumber;
        const userName= req.body.username;
        const password = req.body.password;
        const role = req.body.role;

        const user= new User(phoneNumber,userName,password,role)
        console.log("mama user",user)
        const newUser = await saveUser(user);
        res.send(newUser);
    }catch(err) {
        console.log("error adding User",err);
        res.status(400).send({})
    }
})

router.get('/:id', async (req: express.Request, res: express.Response) => {
    const id = req.params.id;

    try {
        const getUser = await getSelectedUser(id);
        res.send(getUser);
    }catch(err) {
        console.log("error getUser",err);
        res.status(400).send({})
    }
})

router.get('/', async (req: express.Request, res: express.Response) => {

    try {
        const getUsers = await getAllUsers();
        res.json(getUsers);
    }catch(err) {
        console.log("error getUsers",err);
        res.status(400).send({})
    }
})

router.post("/refresh-token", async (req, res) => {
    const authHeader = req.headers.authorization;
    const refresh_token = authHeader?.split(' ')[1];

    if(!refresh_token)res.status(401).send('No token provided');

    try{
        const payload = jwt.verify(refresh_token as string, process.env.REFRESH_TOKEN as Secret) as {username: string, iat: number};
        const token = jwt.sign({ username: payload.username }, process.env.SECRET_KEY as Secret, {expiresIn: "1m"});
        res.json({accessToken : token});
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }
})

export function authenticateToken(req : express.Request, res : express.Response, next : express.NextFunction){
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    console.log(token);
    if(!token)res.status(401).send('No token provided');

    try{
        const payload = jwt.verify(token as string, process.env.SECRET_KEY as Secret) as {username: string, iat: number};
        console.log(payload.username);
        req.body.username = payload.username;
        next();
    }catch(err){
        res.status(401).send(err);
    }
}

export default router;
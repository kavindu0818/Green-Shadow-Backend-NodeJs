import { PrismaClient } from "@prisma/client";
import { User } from "../model/User";
import bcrypt from 'bcrypt';
import {LoginUser} from "../model/LoginUser";

const prisma = new PrismaClient();

export async function saveUser(u: User) {
    const hashedPassword = await bcrypt.hash(u.password, 10);
    try {
        const newUser = await prisma.user.create({
            data: {
                phoneNumber: u.phoneNumber,
                userName: u.userName,
                password: hashedPassword,
                role: u.role
            }
        });

        console.log("User Added:", newUser);
        return newUser;
    } catch (err) {
        console.log("Error adding user:", err);
    }
}


export async function verifyUserCredentials(verifyUser: LoginUser): Promise<boolean> {
    if (!verifyUser.phoneNumber || !verifyUser.password) {
        console.error("Both phoneNumber and password must be provided.");
        return false;
    }

    const login = await prisma.user.findUnique({
        where: { phoneNumber: verifyUser.phoneNumber }, // Only use phoneNumber (unique field)
    });

    if (!login) {
        console.error("User not found.");
        return false;
    }

    const isPasswordValid = await bcrypt.compare(verifyUser.password, login.password);
    if (!isPasswordValid) {
        console.error("Invalid password.");
        return false;
    }

    return true;
}


export async function getSelectedUser(user: string) {

    try {
        return await prisma.user.findUnique({
            where: { phoneNumber: user }, // Ensure "code" is the correct column name
        });
    } catch (err) {
        console.error("Error getting user from database:", err);
        return null;
    }
}

export async function getAllUsers(){
    try {
        return await prisma.user.findMany();

    }catch(err){
        console.error("Error getting users from database:", err);
        return null
    }
}

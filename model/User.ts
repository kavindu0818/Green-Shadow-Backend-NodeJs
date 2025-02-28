export class User {
    phoneNumber: string;
    userName: string;
    password: string;
    role: string;

    constructor(phoneNumber:string, userName: string, password: string, role: string) {
        this.phoneNumber = phoneNumber;
        this.userName = userName;
        this.password = password;
        this.role = role;
    }
}
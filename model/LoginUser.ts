export class LoginUser {
    phoneNumber: string;
    password: string;

    constructor(phoneNumbe: string, password: string) {
        this.phoneNumber = phoneNumbe;
        this.password = password;
    }
}
export class Staff{
    staffCode: string;
    firstName: string;
    lastName: string;
    designation: string;
    gender: string;
    dob: string;
    address_one: string;
    address_two: string;
    address_three: string;
    contact: string;
    email: string;
    role: string;
    join_date: string;
    fieldCode: string;

    constructor(staffCode: string, firstName: string, lastName: string, designation: string, gender: string, dob:string, address_one: string, address_two: string, address_three: string, contact: string, email: string, role: string,join_date:string,fieldCode:string) {

        this.staffCode = staffCode
        this.firstName = firstName
        this.lastName = lastName
        this.designation = designation
        this.gender = gender
        this.dob = dob
        this.address_one = address_one
        this.address_two = address_two
        this.address_three = address_three
        this.contact = contact
        this.email = email
        this.role = role
        this.join_date = join_date
        this.fieldCode = fieldCode
    }
}
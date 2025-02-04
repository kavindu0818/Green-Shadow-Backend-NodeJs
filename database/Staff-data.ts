import {PrismaClient} from "@prisma/client";
import {Staff} from "../model/Staff";


const prisma = new PrismaClient()

export async function saveStaff(staff:Staff) {

    try {
        const newStaff = await prisma.staff.create({
            data: {
                staffCode: staff.staffCode,
                firstName: staff.firstName,
                lastName: staff.lastName,
                designation: staff.designation,
                gender: staff.gender,
                dob: staff.dob,
                address_one: staff.address_one,
                address_two: staff.address_two,
                address_three: staff.address_three,
                contact: staff.contact,
                email: staff.email,
                role: staff.role,
                join_date: staff.join_date,
                fieldCode: staff.fieldCode,
            }
        });
        console.log(newStaff);
        return newStaff;
    } catch (err) {
        console.error("Error saving Staff:", err);
        return {message: "Staff not saved", error: err};
    }
}

export async function getAllStaffs() {

    try {
        return await prisma.staff.findMany();
    } catch (error) {
        console.error("Error get staffs:", error);
        return ("Not Staff")
    }
}
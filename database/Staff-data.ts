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

export async function getSelectedStaff(staffCode:string) {
    try {
        return await prisma.staff.findUnique({
            where:{
                staffCode:staffCode
            }
        })
    }catch(err) {
        console.error("Error getting staff:", err);
        return ("not Selected staff");
    }
}

export async function deleteStaff(staffCode:string) {
    try {
        return await prisma.staff.delete({
            where:{
                staffCode:staffCode
            }
        })
    }catch(err) {
        console.error("Error deleting staff:", err);
        return ("Delete Not Succsfully Staff");
    }
}

export async function updateStaff(staffCode: string, staff: Staff) {
    try {

        const existingStaff = await prisma.staff.findUnique({
            where: { staffCode }
        });

        if (!existingStaff) {
            console.error(`Staff with code ${staffCode} not found`);
            return null;
        }


        return await prisma.staff.update({
            where: { staffCode },
            data: {
                firstName: staff.firstName,
                lastName: staff.lastName,
                designation: staff.designation,
                gender: staff.gender,
                dob: new Date(staff.dob),
                address_one: staff.address_one,
                address_two: staff.address_two || null,
                address_three: staff.address_three || null,
                contact: staff.contact,
                email: staff.email,
                role: staff.role,
                join_date: new Date(staff.join_date),
                fieldCode: staff.fieldCode
            }
        });
    } catch (err) {
        console.error("Error updating staff:", err);
        return null;
    }
}

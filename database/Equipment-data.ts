import {Equipment, PrismaClient} from "@prisma/client";
import {Crop} from "../model/Crop";


const prisma = new PrismaClient();

export async function saveEquipment(equ:Equipment) {

    try {
       const newEqu =  await prisma.equipment.create({
            data:{
                equipCode:equ.equipCode,
                equipName:equ.equipName,
                equipType:equ.equipType,
                equipStatus:equ.equipStatus,
                staffCode:equ.staffCode,
                fieldCode:equ.fieldCode
            }
            });
       console.log(newEqu);
       return newEqu;
    }catch(err){
        console.error("Error saving Equipment:", err);
        return { message: "Equipment not saved", error: err };
    }
}

export async function getAllEquipments() {
    try {
        return await prisma.equipment.findMany();
    }catch (err) {
        return err;
    }
}

export async function updateEquipment(equ:Equipment){
    try {
        return await prisma.equipment.update({
            where:{equipCode:equ.equipCode},
            data:{
                equipCode:equ.equipCode,
                equipName:equ.equipName,
                equipType:equ.equipType,
                equipStatus:equ.equipStatus,
                staffCode:equ.staffCode,
                fieldCode:equ.fieldCode
            }
        })
    }catch (err){
        console.error("Error saving Equipment:", err);
        return { message: "Equipment not saved", error: err };
    }
}

export async function deleteEquipment(equ:string){
    try {
        return await prisma.equipment.delete({
            where:{equipCode:equ}
        })
    }catch (err){
        return {message: "Equipment not deleted", error: err };
    }
}

export async function getSelctedEquipmet(equ: string){
    try {
        return await prisma.equipment.findUnique({
            where:{
                equipCode: equ
            }
        })
    }catch(err){
        console.error("Error saving Equipment:", err);
        return ("not Equipmet");
    }
}


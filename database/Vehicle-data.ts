import {PrismaClient, Vehicle} from "@prisma/client";

const prisma = new PrismaClient();

export async function saveVehicle(vehicle: Vehicle) {
    try {
        const newVehicle = await prisma.vehicle.create({
            data: {
               vehicleCode:vehicle.vehicleCode,
                licensePlateNumber: vehicle.licensePlateNumber,
                vehicleCategory: vehicle.vehicleCategory,
                fuelType: vehicle.fuelType,
                status: vehicle.status,
                staffMemberDetails: vehicle.staffMemberDetails,
                remark: vehicle.remark
            }
        });
        console.log(newVehicle);
        return newVehicle;
    } catch (err) {
        console.error("Error saving Vehicle:", err);
        return { message: "Vehicle not saved", error: err };
    }
}

export async function getAllVehicles() {
    try {
        return await prisma.vehicle.findMany();
    }catch (err) {
        console.error("Error saving Vehicles:", err);
        return ("not Vehicles");
    }
}

export async function getSelctedVehicle(vehicle: string){
    try {
        return await prisma.vehicle.findUnique({
            where:{
               vehicleCode:vehicle
            }
        })
    }catch(err){
        console.error("Error saving Vehicle:", err);
        return ("not Vehicle");
    }
}

export async function updateVehicle(vehicle:Vehicle){
    try {
        return await prisma.vehicle.update({
            where:{vehicleCode:vehicle.vehicleCode},
            data:{
                vehicleCode:vehicle.vehicleCode,
                licensePlateNumber: vehicle.licensePlateNumber,
                vehicleCategory: vehicle.vehicleCategory,
                fuelType: vehicle.fuelType,
                status: vehicle.status,
                staffMemberDetails: vehicle.staffMemberDetails,
                remark: vehicle.remark
            }
        })
    }catch (err){
        console.error("Error saving Vehicle:", err);
        return { message: "Vehicle not saved", error: err };
    }
}

export async function deleteVehicle(vehicle:string){
    try {
        return await prisma.vehicle.delete({
            where:{vehicleCode:vehicle}
        })
    }catch (err){
        return {message: "Vehicle not deleted", error: err };
    }
}

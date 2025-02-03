import { PrismaClient } from "@prisma/client";
import { Crop } from "../model/Crop";

const prisma = new PrismaClient();

export async function saveCrop(crop: Crop) {
    try {
        const newCrop = await prisma.crop.create({
            data: {
                cropCode: crop.cropCode,
                cropCommonName: crop.cropCommonName,
                cropScientificName: crop.cropScientificName,
                cropCategory: crop.cropCategory,
                // cropField: crop.cropField, // ✅ Added missing required field
                cropSeason: crop.cropSeason,
                cropImage: crop.cropImage,
                fieldCode: crop.fieldCode
            }
        });
        console.log(newCrop);
        return newCrop;
    } catch (err) {
        console.error("Error saving crop:", err);
        return { message: "Crop not saved", error: err };
    }
}

export async function getAllCrops() {
    try {
        return await prisma.crop.findMany();
    }catch (err) {
        console.error("Error saving crop:", err);
        return ("not Crops");
    }
}

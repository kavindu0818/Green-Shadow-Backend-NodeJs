export class Vehicle{
    vehicleCode: string;
    licensePlateNumber: string;
    vehicleCategory: string;
    fuelType: string;
    status: string;
    staffMemberDetails: string;
    remark: string;

    constructor(vehicleCode: string, licensePlateNumber: string, vehicleCategory: string, fuelType: string, status: string, staffMemberDetails: string,remark: string) {
        this.vehicleCode = vehicleCode;
        this.licensePlateNumber = licensePlateNumber;
        this.vehicleCategory = vehicleCategory;
        this.fuelType = fuelType;
        this.status = status;
        this.staffMemberDetails = staffMemberDetails;
        this.remark = remark;
    }
}
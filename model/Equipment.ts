export default class Equipment{
    equipCode: string;
    equipName: string;
    equipType: string;
    equipStatus: string;
    staffCode: string;
    fieldCode: string;

    constructor(equipCode: string, equipName: string, equipType: string, equipStatus: string, staffCode: string, fieldCode: string) {
        this.equipCode = equipCode;
        this.equipName = equipName;
        this.equipType = equipType;
        this.equipStatus = equipStatus;
        this.staffCode = staffCode;
        this.fieldCode = fieldCode;
    }
}
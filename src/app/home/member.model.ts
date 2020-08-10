export interface AdultMember {
    id?: string,
    title: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    address: string,
    phoneNumber1: number,
    phoneNumber2: number,
    aboType: string,
    aboLength: string,
    startDate: string,
    endDate: string,
    findings: string,
    observations: string,
}

export interface ChildMember {
    id?: string,
    gender: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,

    nameParent1: string,
    nameParent2?: string,
    phoneNumberParent1: number,
    phoneNumberParent2?: number,
    addressParent: string,
    
    aboType: string,
    aboLength: string,
    startDate: string,
    endDate: string,
    
    findings: string,
    observations: string,
}
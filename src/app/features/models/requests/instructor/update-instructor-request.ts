export interface UpdateInstructorRequest {
    id: string;
    userName: string;
    firstName:string;
    lastName:string;
    companyName:string;
    dateOfBirth: Date;
    nationalIdentity:string;
    email:string;
    password?:string;
    description:string;
}

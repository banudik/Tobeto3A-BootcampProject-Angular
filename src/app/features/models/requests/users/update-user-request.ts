export interface UpdateUserRequest {
    id: string;
    userName: string;
    firstName:string;
    lastName:string;
    dateOfBirth: Date;
    nationalIdentity:string;
    email:string;
    password:string;
    newPassword?:string;
}
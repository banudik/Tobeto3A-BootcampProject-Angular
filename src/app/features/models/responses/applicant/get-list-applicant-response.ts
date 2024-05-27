export interface GetListApplicantResponse {
    id: string; 
    userName: string;
    firstName:string;
    lastName:string;
    about:string;
    dateOfBirth: Date;
    nationalIdentity:string;
    email:string;
    createdDate:Date;
    updatedDate:Date;
    isBlackListed:boolean;
    //password:string;
}

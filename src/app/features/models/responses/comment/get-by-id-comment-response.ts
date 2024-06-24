export interface GetByIdCommentResponse {
    id:number;
    context:string;
    bootcampId:number;
    userId:string;
    userEmail:string;
    status:boolean;
    userFirstName:string;
    userLastName:string;
    bootcampName:string;
    createdDate:Date;
}
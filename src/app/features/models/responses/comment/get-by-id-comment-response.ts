export interface GetByIdCommentResponse {
    id:number;
    context:string;
    chapterId:number;
    userId:string;
    userEmail:string;
    status:boolean;
    userFirstName:string;
    userLastName:string;
    chapterSort:number;
    chapterBootcampName:string;
    createdDate:Date;
}
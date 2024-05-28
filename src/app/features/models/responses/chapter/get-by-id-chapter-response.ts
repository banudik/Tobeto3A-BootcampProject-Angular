export interface GetByIdChapterResponse {
    id:number;
    sort:number;
    title:string;
    description?:string;
    link:string;
    bootcampId:number;
    bootcampName:string;
    time:number;
    createdDate:Date;
}
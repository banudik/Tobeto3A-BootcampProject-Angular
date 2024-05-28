export interface CreateChapterRequest {
    sort:number;
    title:string;
    description?:string;
    link:string;
    bootcampId:number;
    time:number;
}
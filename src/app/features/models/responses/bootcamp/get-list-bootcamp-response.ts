export interface GetListBootcampResponse {
    id: number;
    name: string;
    instructorId: string;
    instructorFirstName:string;
    instructorLastName:string;
    startDate: Date;
    endDate: Date;
    bootcampStateId: number;
    bootcampImageId: number;
    bootcampImageImagePath: string;
}

export interface GetByIdBootcampResponse {
    id: number;
    name: string;
    instructorId: string;
    instructorFirstName: string;
    instructorLastName: string;
    instructorDescription: string;
    description: string;
    startDate: Date;
    endDate: Date;
    bootcampStateId: number;
    bootcampStateName: string;
    bootcampImageId: number;
    bootcampImageImagePath: string;
}

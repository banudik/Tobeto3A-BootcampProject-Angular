export interface CreateBootcampRequest {
    name: string;
    instructorId: string;
    startDate: Date;
    endDate: Date;
    bootcampStateId: number;
    bootcampImageId: number;
}

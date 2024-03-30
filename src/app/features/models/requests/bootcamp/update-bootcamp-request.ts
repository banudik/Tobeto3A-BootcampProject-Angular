export interface UpdateBootcampRequest {
    id: number;
    name: string;
    instructorId: string;
    startDate: Date;
    endDate: Date;
    bootcampStateId: number;
    bootcampImageId: number;
}

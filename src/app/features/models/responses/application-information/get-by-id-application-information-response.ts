export interface GetByIdApplicationInformationResponse {
    id: number;
    applicantId: string;
    applicantFirstName:string;
    applicantLastName:string;
    bootcampId: number;
    bootcampName:string;
    applicationStateInformationId: number;
    applicationStateInformationName:string;
    createdDate:Date;
    updateDate:Date;
}

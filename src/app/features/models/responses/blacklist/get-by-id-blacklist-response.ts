export interface GetByIdBlacklistResponse {
    id: number;
    reason: string;
    date: Date;
    applicantId: string;
    applicantFirstName:string;
    applicantLastName:string;
    applicantEmail:string;
    createdDate:Date;
}

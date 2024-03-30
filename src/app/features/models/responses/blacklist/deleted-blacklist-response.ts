export interface DeletedBlacklistResponse {
    id: number;
    reason: string;
    date: Date;
    applicantId: string;
    deletedDate: Date;
}

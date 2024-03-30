export interface UpdateBlacklistRequest {
    id: number;
    reason: string;
    date: Date;
    applicantId: string;
}

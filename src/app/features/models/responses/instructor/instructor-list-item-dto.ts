import { PageResponse } from "../../../../core/models/page-response";
import { GetListInstructorResponse } from "./get-list-instructor-response";

export interface InstructorListItemDto extends PageResponse{
    items:GetListInstructorResponse[];
}
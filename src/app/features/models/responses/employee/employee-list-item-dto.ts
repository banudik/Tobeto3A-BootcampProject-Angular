import { PageResponse } from "../../../../core/models/page-response";
import { GetListEmployeeResponse } from "./get-list-employee-response";

export interface EmployeeListItemDto extends PageResponse{
    items:GetListEmployeeResponse[];
}
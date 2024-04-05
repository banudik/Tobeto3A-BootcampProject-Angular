import { PageResponse } from '../../../../core/models/page-response';
import { GetListBootcampResponse } from './get-list-bootcamp-response';


export interface BootcampListItemDto extends PageResponse{
    items:GetListBootcampResponse[];

}
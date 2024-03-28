import { GetListBootcampResponse } from "../Bootcamp/get-list-bootcamp-response";
import { responseModel } from "./responseModel";


export interface bootcampResponseModel extends responseModel{
    data:GetListBootcampResponse[]
    
}
import { GetListBootcampResponse } from '../../features/models/responses/bootcamp/get-list-bootcamp-response';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'filterPipe'
})
export class FilterBootcampPipe implements PipeTransform{

    transform(value: GetListBootcampResponse[],filterText:string):GetListBootcampResponse[] {
        filterText=filterText?filterText.toLocaleLowerCase():""
        return filterText?value.filter((m:GetListBootcampResponse)=>m.name.toLocaleLowerCase()
        .indexOf(filterText)!==-1):value;
    }

}
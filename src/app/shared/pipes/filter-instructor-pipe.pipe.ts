import { Pipe, PipeTransform } from "@angular/core";
import { GetListInstructorResponse } from "../../features/models/responses/instructor/get-list-instructor-response";


@Pipe({
    name:'filterInstructorPipe'
})
export class FilterInstructorPipe implements PipeTransform{

    transform(value: GetListInstructorResponse[],filterText:string):GetListInstructorResponse[] {
        filterText=filterText?filterText.toLocaleLowerCase():""
        return filterText?value.filter((m:GetListInstructorResponse)=>(m.firstName +" "+ m.lastName).toLocaleLowerCase()
        .indexOf(filterText)!==-1):value;
    }

}
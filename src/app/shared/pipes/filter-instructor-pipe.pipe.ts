import { Pipe, PipeTransform } from "@angular/core";
import { GetListInstructorResponse } from "../../features/models/responses/instructor/get-list-instructor-response";


@Pipe({
    name:'filterInstructorPipe'
})
export class FilterInstructorPipe implements PipeTransform{
    transform(value: GetListInstructorResponse[], filterText: string): GetListInstructorResponse[] {
        if (!value || !filterText) {
            return value;
        }
        const searchText = filterText.toLowerCase();
        return value.filter(instructor => {
            const fullName = `${instructor.firstName} ${instructor.lastName}`.toLowerCase();
            return fullName.includes(searchText);
        });

}
}
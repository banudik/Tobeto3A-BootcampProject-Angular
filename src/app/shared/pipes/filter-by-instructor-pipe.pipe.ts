import { Pipe, PipeTransform } from '@angular/core';

import { GetListInstructorResponse } from '../../features/models/responses/instructor/get-list-instructor-response';


@Pipe({
  name: 'filterByInstructor'
})
export class FilterByInstructorPipe implements PipeTransform {
  transform(value: GetListInstructorResponse[],filterText:string):GetListInstructorResponse[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((m:GetListInstructorResponse)=>m.firstName.toLocaleLowerCase()
    .indexOf(filterText)!==-1):value;
}

  }
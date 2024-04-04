import { Pipe, PipeTransform } from '@angular/core';
import { BootcampListItemDto } from '../../features/models/responses/bootcamp/bootcamp-list-item-dto';


@Pipe({
  name: 'filterByInstructor'
})
export class FilterByInstructorPipe implements PipeTransform {
    transform(bootcamps: BootcampListItemDto[], instructorFirstName: string, instructorLastName: string): BootcampListItemDto[] {
      if (!bootcamps || !instructorFirstName || !instructorLastName) {
        return bootcamps;
      }
  
      return bootcamps.filter(bootcamp =>
        bootcamp.instructorFirstName === instructorFirstName && bootcamp.instructorLastName === instructorLastName
      );
    }
  }
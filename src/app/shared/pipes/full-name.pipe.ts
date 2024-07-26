import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  transform(student: { firstName: string; lastName: string }): string {
    return `${student.firstName} ${student.lastName}`;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: Date | null): string {
    if (!value) return '';

    // Ejemplo de formato: 'MMM dd, yyyy'
    return value.toLocaleDateString('sp-CR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

}

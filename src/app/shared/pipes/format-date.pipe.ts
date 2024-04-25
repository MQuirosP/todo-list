import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    // Intenta convertir el string a Date si no es una instancia de Date
    const date = value instanceof Date ? value : new Date(value);
    
    // Usa toLocaleDateString con la configuración deseada
    return date.toLocaleDateString('es-CR');  // Ajusta el 'locale' según necesites
  }
}

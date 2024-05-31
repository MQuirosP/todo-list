import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    // Intenta convertir el string a Date si no es una instancia de Date
    const date = value instanceof Date ? value : new Date(value);
    
    // Usa toLocaleDateString con el formato deseado
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
}

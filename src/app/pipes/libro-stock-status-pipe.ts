import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'libroStockStatus'
})
export class LibroStockStatusPipe implements PipeTransform {

  transform(inStock: boolean): string {
    return inStock ? 'Disponible' : 'No disponible';
  }

}

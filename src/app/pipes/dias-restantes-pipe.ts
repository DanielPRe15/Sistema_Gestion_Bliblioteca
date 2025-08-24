import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diasRestantes'
})
export class DiasRestantesPipe implements PipeTransform {

transform(fechaDevolucion: Date | string): string {
    const hoy = new Date();
    const devolucion = new Date(fechaDevolucion);
    const diff = Math.ceil((devolucion.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    if (diff > 0) {
      return `Faltan ${diff} días para la devolución`;
    } else if (diff === 0) {
      return 'La devolución es hoy';
    } else {
      return `Retraso de ${Math.abs(diff)} días`;
    }
  }

}

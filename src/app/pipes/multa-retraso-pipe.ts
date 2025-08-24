import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multaRetraso'
})
export class MultaRetrasoPipe implements PipeTransform {

   transform(fechaDevolucion: Date | string, montoPorDia: number = 2): string {
    const hoy = new Date();
    const devolucion = new Date(fechaDevolucion);
    const diasRetraso = Math.max(0, Math.floor((hoy.getTime() - devolucion.getTime()) / (1000 * 60 * 60 * 24)));
    const multa = diasRetraso * montoPorDia;
    return diasRetraso > 0 ? `Multa: S/ ${multa} (${diasRetraso} días de retraso)` : 'Sin multa';
  }

}

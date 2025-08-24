import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Prestamos } from '../../interfaces/prestamos';
import { CommonModule } from '@angular/common';
import { DiasRestantesPipe } from '../../pipes/dias-restantes-pipe';
import { MultaRetrasoPipe } from '../../pipes/multa-retraso-pipe';

@Component({
  selector: 'app-prestamos-card',
  imports: [CommonModule, DiasRestantesPipe, MultaRetrasoPipe],
  templateUrl: './prestamos-card.html',
  styleUrl: './prestamos-card.css'
})
export class PrestamosCard {
  @Output() renovarPrestamo = new EventEmitter<Prestamos>();

  onRenovarPrestamo() {
    this.renovarPrestamo.emit(this.prestamo);
  }

  today: Date = new Date();

@Input() prestamo: Prestamos & { libroTitulo?: string; usuarioNombre?: string } = {
  id: 0,
  libroId: 0,
  usuarioId: 0,
  fechaPrestamo: new Date(),
  fechaDevolucion: new Date(),
};

  isDevuelto(prestamo: Prestamos): boolean {
  return !!prestamo.fechaDevolucion && new Date(prestamo.fechaDevolucion) < this.today;
}
}

interface PrestamoConLibro extends Prestamos {
  libroTitulo?: string;
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { PrestamosService } from '../../services/prestamos-service';
import { Prestamos } from '../../interfaces/prestamos';
import { Usuarios } from '../../interfaces/usuarios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios-card',
  imports: [CommonModule],
  templateUrl: './usuarios-card.html',
  styleUrl: './usuarios-card.css'
})
export class UsuariosCard {
  prestamos: PrestamoConLibro[] = [];
  constructor(private prestamosService: PrestamosService) {}

  ngOnInit() {
    if (this.usuario) {
      const prestamosRaw = this.prestamosService.getPrestamosPorUsuario(this.usuario.id);
      const libros = this.prestamosService.getLibros();
      this.prestamos = prestamosRaw.map(prestamo => {
        const libro = libros.find(l => l.id === Number(prestamo.libroId));
        return {
          ...prestamo,
          libroTitulo: libro ? libro.titulo : 'Desconocido'
        } as PrestamoConLibro;
      });
    }
  }

  @Input() usuario: Usuarios = {
    id: 0,
    nombre: '',
    email: '',
    foto: '',
    type: 'estudiante',
    status: 'activo',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  @Output() viewDetails = new EventEmitter<Usuarios>();
  @Output() viewHistoryPrestamo = new EventEmitter<void>();

  onViewDetails(): void {
    this.viewDetails.emit(this.usuario);
  }

  onViewHistoryPrestamo(): void {
    if (this.prestamos.length === 0) {
      alert('Este usuario no tiene préstamos registrados.');
      return;
    }
    let mensaje = 'Historial de Préstamos:\n';
    this.prestamos.forEach(p => {
      mensaje += `Libro: ${p['libroTitulo'] || p.libroId} - Fecha de Préstamo: ${new Date(p.fechaPrestamo).toLocaleDateString()}`;
      if (p.fechaDevolucion) mensaje += ` | Fecha de Devolución: ${new Date(p.fechaDevolucion).toLocaleDateString()}`;
      mensaje += '\n';
    });
    alert(mensaje);
  }


}

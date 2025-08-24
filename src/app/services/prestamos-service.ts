import { inject, Injectable } from '@angular/core';
import { Prestamos } from '../interfaces/prestamos';
import { UsuariosService } from './usuarios-service';
import { LibrosService } from './libros-service';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {


  today: Date = new Date();

  private usuarios = inject(UsuariosService);
  private libros = inject(LibrosService);
  private prestamos : Prestamos[] = [
    {
      id: 1,
      libroId: 1,
      usuarioId: 1,
      fechaPrestamo: new Date('2024-06-01'),
      fechaDevolucion: new Date('2024-06-10'),
    },
    {
      id: 2,
      libroId: 2,
      usuarioId: 2,
      fechaPrestamo: new Date('2024-06-05'),
      fechaDevolucion: new Date('2025-09-27'),
    },
    {
      id: 3,
      libroId: 3,
      usuarioId: 1,
      fechaPrestamo: new Date('2024-05-20'),
      fechaDevolucion: new Date('2024-06-01'),
    }
  ];

  private generateId(): number {
    return this.prestamos.length > 0 ? Math.max(...this.prestamos.map(p => p.id)) + 1 : 1;
  }


  getUsuarios() {
    return this.usuarios.getUsuarios();
  }

  getLibros() {
    return this.libros.getLibros();
  }

  getPrestamos(): Prestamos[] {
    return this.prestamos;
  }


  getPrestamosPorUsuario(usuarioId: number): Prestamos[] {
    return this.prestamos.filter(prestamo => prestamo.usuarioId === usuarioId);
  }

  addPrestamo(prestamo: Omit<Prestamos, 'id'>): void {
    const newPrestamo: Prestamos = {
      ...prestamo,
      id: this.generateId()
    }
    this.prestamos.push(newPrestamo);
  }

    actualizarPrestamo(prestamoActualizado: Prestamos) {
    const index = this.prestamos.findIndex(p => p.id === prestamoActualizado.id);
    if (index !== -1) {
      this.prestamos[index] = { ...prestamoActualizado };
    }
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Prestamos } from '../../interfaces/prestamos';
import { PrestamosService } from '../../services/prestamos-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrestamosCard } from '../prestamos-card/prestamos-card';
import { Usuarios } from '../../interfaces/usuarios';
import { Libros } from '../../interfaces/libros';

@Component({
  selector: 'app-prestamos-list',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrestamosCard],
  templateUrl: './prestamos-list.html',
  styleUrl: './prestamos-list.css'
})
export class PrestamosList implements OnInit {

  private prestamosService = inject(PrestamosService);

  prestamoForm!: FormGroup;
  PrestamoNuevo: Prestamos | null = null;
  prestamos: Prestamos[] = [];

  usuarios: Usuarios[] = [];
  libros: Libros[] = [];

  ngOnInit() {
    this.usuarios = this.prestamosService.getUsuarios();
    this.libros = this.prestamosService.getLibros();
      this.loadPrestamos();
  }

    private loadPrestamos() {
      const prestamosRaw = this.prestamosService.getPrestamos();
      this.prestamos = prestamosRaw.map(prestamo => {
        const usuario = this.usuarios.find(u => u.id === Number(prestamo.usuarioId));
        const libro = this.libros.find(l => l.id === Number(prestamo.libroId));
        return {
          ...prestamo,
          usuarioNombre: usuario ? usuario.nombre : 'Desconocido',
          libroTitulo: libro ? libro.titulo : 'Desconocido'
        };
      });
    }

constructor(private fb: FormBuilder) {}
  onAddPrestamo() {
    this.PrestamoNuevo = {
      id: 0,
      libroId: 0,
      usuarioId: 0,
      fechaPrestamo: new Date(),
      fechaDevolucion: new Date()
    };
    this.prestamoForm = this.fb.group({
      libroId: [null, Validators.required],
      usuarioId: [null, Validators.required],
      fechaPrestamo: ['', Validators.required],
      fechaDevolucion: ['', Validators.required]
    });
  }

    hasError(ControlName: string, errorType: string): boolean{
    const control = this.prestamoForm.get(ControlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }

    isFildInvalid(controlName: string): boolean{
    const control = this.prestamoForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

onSubmitPrestamo() {
  if (this.prestamoForm.invalid) {
    this.prestamoForm.markAllAsTouched();
    return;
  }
  const nuevoPrestamo: Prestamos = {
    ...this.PrestamoNuevo!,
    ...this.prestamoForm.value
  };
  this.prestamosService.addPrestamo(nuevoPrestamo);
  this.PrestamoNuevo = null;
  this.prestamoForm.reset();
  this.loadPrestamos();
}

  guardarNuevoPrestamo(prestamo: Prestamos) {
    this.prestamosService.addPrestamo(prestamo);
    this.PrestamoNuevo = null;
    this.loadPrestamos();
  }

  cancelarNuevoPrestamo() {
    this.PrestamoNuevo = null;
  }

    onRenovarPrestamo(prestamo: Prestamos) {
  const dias = Number(prompt('¿Cuántos días quieres renovar el préstamo?', '7'));
  if (!dias || dias < 1) return;
  if (!confirm(`¿Seguro que quieres renovar el préstamo por ${dias} días más?`)) return;
  const nuevaFecha = new Date(prestamo.fechaDevolucion || new Date());
  nuevaFecha.setDate(nuevaFecha.getDate() + dias);
  prestamo.fechaDevolucion = nuevaFecha;
  this.prestamosService.actualizarPrestamo(prestamo);
  this.loadPrestamos();
  // Depuración: mostrar array actualizado
  console.log('Préstamos tras renovar:', this.prestamosService.getPrestamos());
  }

  getPrestamosConDatos() {
    return this.prestamosService.getPrestamos().map(prestamo => {
      const usuario = this.usuarios.find(u => u.id === prestamo.usuarioId);
      const libro = this.libros.find(l => l.id === prestamo.libroId);
      return {
        ...prestamo,
        usuarioNombre: usuario?.nombre,
        libroTitulo: libro?.titulo
      };
    });
  }
}

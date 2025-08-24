import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Libros } from '../../interfaces/libros';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-libro-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './libro-form.html',
  styleUrl: './libro-form.css'
})
export class LibroForm implements OnInit {
  @Input() libro!: Libros;
  @Output() guardar = new EventEmitter<Libros>();
  @Output() cancelar = new EventEmitter<void>();

  libroForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.libroForm = this.fb.group({
      titulo: [this.libro?.titulo || '', Validators.required],
      autor: [this.libro?.autor || '', Validators.required],
      ISBN: [this.libro?.ISBN || '', Validators.required],
      anio: [this.libro?.anio || '', [Validators.required, Validators.min(0)]],
      genero: [this.libro?.genero || '', Validators.required],
      inStock: [this.libro?.inStock || false]
    });
  }

onSubmit() {
  if (this.libroForm.invalid) {
    this.libroForm.markAllAsTouched();
    return;
  }
  this.guardar.emit({
    ...this.libro,
    ...this.libroForm.value
  });
}

  onCancel() {
    this.cancelar.emit();
  }

  // Métodos para mostrar errores
  isFieldInvalid(field: string): boolean {
    const control = this.libroForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
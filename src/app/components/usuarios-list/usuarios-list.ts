import { Component, inject, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios-service';
import { Usuarios } from '../../interfaces/usuarios';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosCard } from '../usuarios-card/usuarios-card';

@Component({
  selector: 'app-usuarios-list',
  imports: [CommonModule, FormsModule, UsuariosCard, ReactiveFormsModule],
  templateUrl: './usuarios-list.html',
  styleUrl: './usuarios-list.css'
})
export class UsuariosList implements OnInit {
  

  private usuariosService = inject(UsuariosService);

  usuarioForm!: FormGroup;
  UsuarioNuevo: Usuarios | null = null;

  usuarios: Usuarios[] = [];
  searchTerm: string = '';

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarios = this.usuariosService.getUsuarios();
  }

  searchUsuarios() {
    if (this.searchTerm) {
      this.usuarios = this.usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.usuarios = this.usuariosService.getUsuarios();
    }
  }

  onViewDetails(usuario: Usuarios) {
    alert(`Detalles del usuario: ${usuario.nombre}\n
      Email: ${usuario.email}\n
      Status: ${usuario.status}\n
      Tipo: ${usuario.type}`);
  }

constructor(private fb: FormBuilder) {}
onAddUsuario() {
  this.UsuarioNuevo = {
    id: 0,
    nombre: '',
    foto: '',
    email: '',
    status: 'activo',
    type: 'estudiante',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  this.usuarioForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    foto: [''],
    type: ['estudiante', Validators.required],
    status: ['activo', Validators.required]
  });
}


  hasError(ControlName: string, errorType: string): boolean{
    const control = this.usuarioForm.get(ControlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }

    isFildInvalid(controlName: string): boolean{
    const control = this.usuarioForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

onSubmitUsuario() {
  if (this.usuarioForm.invalid) {
    this.usuarioForm.markAllAsTouched();
    return;
  }
  const nuevoUsuario: Usuarios = {
    ...this.UsuarioNuevo!,
    ...this.usuarioForm.value
  };
  this.usuariosService.addUsuario(nuevoUsuario);
  this.UsuarioNuevo = null;
  this.usuarioForm.reset();
  this.loadUsuarios();
}

  guardarNuevoUsuario(usuario: Usuarios) {
    this.usuariosService.addUsuario(usuario);
    this.UsuarioNuevo = null;
    this.loadUsuarios();
  }

  cancelarNuevoUsuario() {
    this.UsuarioNuevo = null;
  }

}

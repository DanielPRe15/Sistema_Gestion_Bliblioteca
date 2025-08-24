import { Injectable } from '@angular/core';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private usuarios: Usuarios[] = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com',
      foto: 'https://tse4.mm.bing.net/th/id/OIP.4vZ2x-GGaYuXq5b6y_WalgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
      type: 'estudiante',
      status: 'activo',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      nombre: 'María Gómez',
      email: 'maria.gomez@example.com',
      foto: 'https://media.istockphoto.com/id/954700060/id/foto/senang-wanita-dalam-jaket-berjalan-di-jalan.jpg?s=612x612&w=0&k=20&c=7CDpy0DlajLZC77E9z0cDmwya_uiSThCg6sZNm3NnZw=',
      type: 'profesor',
      status: 'activo',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  private generateId(): number {
    return this.usuarios.length > 0 ? Math.max(...this.usuarios.map(u => u.id)) + 1 : 1;
  }

  getUsuarios(): Usuarios[] {
    return this.usuarios;
  }

  addUsuario(usuarios: Omit<Usuarios, 'id'>): void {
    const newUsuario: Usuarios = {
      ...usuarios,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.usuarios.push(newUsuario);
  }
}

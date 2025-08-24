export interface Usuarios {
    id: number;
    nombre: string;
    foto: string;
    email: string;
    type: 'estudiante' | 'profesor';
    status: 'activo' | 'suspendido' | 'egresado';
    createdAt: Date;
    updatedAt: Date;
}

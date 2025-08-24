export interface Prestamos {
    id: number;
    libroId: number;
    usuarioId: number;
    fechaPrestamo: Date;
    fechaDevolucion?: Date;
}
export interface Libros {
    id: number;
    titulo: string;
    autor: string;
    ISBN: string;
    anio: number;
    genero: string;
    inStock: boolean;
    createdAt: Date;
    updatedAt: Date;
}

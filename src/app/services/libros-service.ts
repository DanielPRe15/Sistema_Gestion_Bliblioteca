import { Injectable } from '@angular/core';
import { Libros } from '../interfaces/libros';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private libros: Libros[] = [

    {
      id: 1,
      titulo: 'Cien años de soledad',
      autor: 'Gabriel García Márquez',
      ISBN: '978-3-16-148410-0',
      anio: 1967,
      genero: 'Ficción',
      inStock: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      titulo: 'Breve historia del tiempo',
      autor: 'Stephen Hawking',
      ISBN: '978-0-553-17698-8',
      anio: 1988,
      genero: 'Ciencia',
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      titulo: 'El arte de la guerra',
      autor: 'Sun Tzu',
      ISBN: '978-84-206-8190-6',
      anio: 1900,
      genero: 'Historia',
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      titulo: 'Orgullo y prejuicio',
      autor: 'Jane Austen',
      ISBN: '978-84-376-0494-7',
      anio: 1813,
      genero: 'Romance',
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      titulo: 'El código Da Vinci',
      autor: 'Dan Brown',
      ISBN: '978-84-9793-043-6',
      anio: 2003,
      genero: 'Misterio',
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 6,
      titulo: 'Los juegos del hambre',
      autor: 'Suzanne Collins',
      ISBN: '978-84-9838-236-4',
      anio: 2008,
      genero: 'Aventura',
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  private generateId(): number {
    return this.libros.length > 0 ? Math.max(...this.libros.map(l => l.id)) + 1 : 1;
  }

  getLibros(): Libros[] {
    return [...this.libros];
  }

  getLibrobyGenero(genero: string): Libros[] {
    if(genero == "all"){
      return this.getLibros();
    }
    return this.getLibros().filter(libro => libro.genero === genero);
  }

  addLibro(libro: Omit<Libros, 'id'>): void {
    const newLibro: Libros = {
      ...libro,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.libros.push(newLibro);
  }

  updateLibro(libro: Libros): void {
    const index = this.libros.findIndex(l => l.id === libro.id);
    if (index !== -1) {
      this.libros[index] = { ...libro, updatedAt: new Date() };
    }
  }

  deleteLibro(id: number): void {
    this.libros = this.libros.filter(libro => libro.id !== id);
  }
  
  getLibroById(id: number): Libros | undefined {
    return this.libros.find(libro => libro.id === id);
  }

  getGeneros(): string[]{
    const generos = this.libros.map(libro => libro.genero);
    return ['all', ...new Set(generos)];
  }

  getInStockCount(): number{
    return this.libros.filter(libro => libro.inStock).length;
  }


  

}

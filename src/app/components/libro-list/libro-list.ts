import { Component, inject, OnInit } from '@angular/core';
import { Libros } from '../../interfaces/libros';
import { LibrosService } from '../../services/libros-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroForm } from '../libro-form/libro-form';
import { LibroCard } from '../libro-card/libro-card';

@Component({
  selector: 'app-libro-list',
  imports: [CommonModule, FormsModule,LibroForm, LibroCard],
  templateUrl: './libro-list.html',
  styleUrl: './libro-list.css'
})
export class LibroList implements OnInit {

  private LibrosService = inject(LibrosService);

  libroNuevo: Libros | null = null;
  libroEditando: Libros | null = null;

  libros: Libros[] = [];
  filteredLibros: Libros[] = [];
  searchTerm: string = '';
  generos: string[] = [];
  selectedGenero: string = 'all';

  ngOnInit() {
    this.loadLibros();
    this.loadGeneros();
  }

  loadLibros() {
    this.libros = this.LibrosService.getLibros();
    this.applyFilters();
  }

  loadGeneros() {
    this.generos = this.LibrosService.getGeneros();
  }

  onGeneroChange() {
    this.applyFilters();
  }

  onSearchTermChange() {
    this.applyFilters();
  }

  applyFilters(){
    let filtered = this.libros;

    if (this.selectedGenero !== 'all') {
      filtered = filtered.filter(libro => libro.genero === this.selectedGenero);
    }

    if (this.searchTerm.trim()) {
      const search = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(libro => 
        libro.titulo.toLowerCase().includes(search) || 
        libro.autor.toLowerCase().includes(search)
      );
    }

    this.filteredLibros = filtered;
  }

  onDeleteLibro(libroID: number) {
    this.LibrosService.deleteLibro(libroID);
    this.loadLibros();
  }

  onViewDetails(libro: Libros) {
   alert(`Detalles del libro: ${libro.titulo}\nAutor: 
    ${libro.autor}\nGénero: ${libro.genero}\nAño: ${libro.anio}
    \nISBN: ${libro.ISBN}\nStock: ${libro.inStock ? 'Disponible' : 'Agotado'}`);
  }

  onAddLibro() {
  this.libroNuevo = {
    id: 0,
    titulo: '',
    autor: '',
    ISBN: '',
    anio: new Date().getFullYear(),
    genero: '',
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

  mostrarFormularioNuevo() {
  this.libroNuevo = {
    id: 0,
    titulo: '',
    autor: '',
    ISBN: '',
    anio: new Date().getFullYear(),
    genero: '',
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

guardarNuevoLibro(libro: Libros) {
  this.LibrosService.addLibro(libro);
  this.libroNuevo = null;
  this.loadLibros();
}

onEditLibro(libro: Libros) {
  this.libroEditando = { ...libro };
}

guardarEdicion(libro: Libros) {
  this.LibrosService.updateLibro(libro);
  this.libroEditando = null;
  this.loadLibros();
}

cancelarNuevoLibro() {
  this.libroNuevo = null;
}

cancelarEdicion() {
  this.libroEditando = null;
}
  

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LibroStockStatusPipe } from "../../pipes/libro-stock-status-pipe";
import { Libros } from '../../interfaces/libros';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-libro-card',
  imports: [LibroStockStatusPipe, CommonModule],
  templateUrl: './libro-card.html',
  styleUrl: './libro-card.css'
})
export class LibroCard {

  @Input() libro: Libros ={
    id: 0,
    titulo: '',
    autor: '',
    ISBN: '',
    anio: 0,
    genero: '',
    inStock: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  @Output() deleteLibro = new EventEmitter<number>();
  @Output() viewDetails = new EventEmitter<Libros>();
  @Output() editLibro = new EventEmitter<Libros>();

  onDeleteLibro(){
    if(confirm(`¿Estás seguro de eliminar el libro ${this.libro.titulo}?`)){
      this.deleteLibro.emit(this.libro.id);
    }
  }

  onViewDetails(){
    this.viewDetails.emit(this.libro);
  }

  onEditLibro(){
    this.editLibro.emit(this.libro);
  }

}

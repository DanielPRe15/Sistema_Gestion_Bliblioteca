import { Routes } from '@angular/router';
import { LibroList } from './components/libro-list/libro-list';
import { UsuariosList } from './components/usuarios-list/usuarios-list';
import { PrestamosList } from './components/prestamos-list/prestamos-list';

export const routes: Routes = [
    {path: '', redirectTo: 'listaLibros', pathMatch: 'full'},
    {path: 'listaLibros', component: LibroList},
    {path: 'listaUsuarios', component: UsuariosList},
    {path: 'listaPrestamos', component: PrestamosList}
];

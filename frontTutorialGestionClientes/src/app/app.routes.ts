import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'games', loadComponent: () => import('../app/game/game-list/game-list.component').then(m => m.GameListComponent)},
    { path: 'category', loadComponent: () => import('../app/category/category-list/category-list.component').then(m => m.CategoryListComponent)},
    { path: 'clients', loadComponent: () => import('../app/Client/client-list/client-list.component').then(m => m.ClientListComponent)},
    { path: 'author', loadComponent: () => import('../app/author/author-list/author-list.component').then(m => m.AuthorListComponent)},
    { path: 'loans', loadComponent: () => import('../app/loans/loans-list/loans-list.component').then(m => m.LoansListComponent)},
];
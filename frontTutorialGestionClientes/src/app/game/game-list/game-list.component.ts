import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameEditComponent } from '../game-edit/game-edit.component';
import { GameService } from '../game.service';
import { Game } from '../model/Game';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/model/Category';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GameItemComponent } from './game-item/game-item.component';

@Component({
    selector: 'app-game-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        GameItemComponent
    ],
    templateUrl: './game-list.component.html',
    styleUrl: './game-list.component.scss',
})
export class GameListComponent implements OnInit {
    // Lista de categorías disponibles
    categories: Category[];
    // Lista de juegos disponibles
    games: Game[];
    // Filtros para la búsqueda de juegos
    filterCategory: Category;
    filterTitle: string;

    // Inyección de dependencias
    constructor(
        private gameService: GameService,
        private categoryService: CategoryService,
        public dialog: MatDialog
    ) {}

    // Método que se ejecuta al inicializar el componente
    ngOnInit(): void {
        // Cargar la lista de juegos al inicializar el componente
        this.gameService.getGames().subscribe((games) => (this.games = games));

        // Cargar la lista de categorías al inicializar el componente
        this.categoryService
            .getCategories()
            .subscribe((categories) => (this.categories = categories));
    }

    // Método para limpiar los filtros de búsqueda
    onCleanFilter(): void {
        this.filterTitle = null;
        this.filterCategory = null;
        this.onSearch();
    }

    // Método para buscar juegos según los filtros aplicados
    onSearch(): void {
        const title = this.filterTitle;
        const categoryId =
            this.filterCategory != null ? this.filterCategory.id : null;

        // Llamada al servicio para obtener los juegos filtrados
        this.gameService
            .getGames(title, categoryId)
            .subscribe((games) => (this.games = games));
    }

    // Método para crear un nuevo juego
    createGame() {
        const dialogRef = this.dialog.open(GameEditComponent, {
            data: {},
        });

        // Recargar la lista de juegos después de cerrar el diálogo
        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    // Método para editar un juego existente
    editGame(game: Game) {
        const dialogRef = this.dialog.open(GameEditComponent, {
            data: { game: game },
        });

        // Recargar la lista de juegos después de cerrar el diálogo
        dialogRef.afterClosed().subscribe((result) => {
            this.onSearch();
        });
    }
}
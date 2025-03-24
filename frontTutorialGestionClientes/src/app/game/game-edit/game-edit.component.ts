import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from '../game.service';
import { Game } from '../model/Game';
import { AuthorService } from '../../author/author.service';
import { Author } from '../../author/model/Author';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/model/Category';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Pageable } from '../../core/model/page/Pageable';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-game-edit',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule
    ],
    templateUrl: './game-edit.component.html',
    styleUrls: ['./game-edit.component.scss'],
})
export class GameEditComponent implements OnInit {
    // Variable para almacenar los datos del juego
    game: Game;
    // Listas de autores y categorías
    authors: Author[] = [];
    categories: Category[] = [];

    // Inyección de dependencias
    constructor(
        public dialogRef: MatDialogRef<GameEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private gameService: GameService,
        private categoryService: CategoryService,
        private authorService: AuthorService
    ) {}

    // Método que se ejecuta al inicializar el componente
    ngOnInit(): void {
        // Si hay datos del juego, se clonan; si no, se crea un nuevo objeto Game
        this.game = this.data.game ? Object.assign({}, this.data.game) : new Game();
        
        // Configurar la paginación para la carga de autores
        const pageable: Pageable = {
            pageNumber: 0,
            pageSize: 20,
            sort: [{ property: 'name', direction: 'ASC' }]
        };

        // Cargar las categorías y autores en paralelo
        forkJoin([
            this.categoryService.getCategories(),
            this.authorService.getAuthors(pageable)
        ]).subscribe({
            next: ([categories, authorPage]) => {
                this.categories = Array.isArray(categories) ? categories : [];
                this.authors = Array.isArray(authorPage.content) ? authorPage.content : [];

                // Asignar la categoría del juego si existe
                if (this.game.category) {
                    const category = this.categories.find(cat => cat.id === this.game.category.id);
                    if (category) {
                        this.game.category = category;
                    }
                }

                // Asignar el autor del juego si existe
                if (this.game.author) {
                    const author = this.authors.find(auth => auth.id === this.game.author.id);
                    if (author) {
                        this.game.author = author;
                    }
                }
            },
            error: (error) => {
                console.error('Error fetching data:', error);
            }
        });
    }

    // Método para guardar los datos del juego
    onSave() {
        this.gameService.saveGame(this.game).subscribe(() => {
            // Cerrar el diálogo después de guardar
            this.dialogRef.close();
        });
    }

    // Método para cerrar el diálogo sin guardar
    onClose() {
        this.dialogRef.close();
    }
}
